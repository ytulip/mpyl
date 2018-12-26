<template>
    <!--<web-view src="{{src}}"></web-view>-->
    <div class="padding-container">
        <div><i class="back-icon"></i><span class="fs-26-fc-black">填写订单</span></div>

        <div class="white-bg-card">
            <div class="cus-row">
                <div class="cus-row-col-6">
                    <div class="in-bl-v-m"><i class="agree-icon"></i></div>
                    <div class="in-bl-v-m fs-16-fc-030303">订购服务</div>
                </div>
            </div>

            <div class="cus-row">
                <div class="cus-row-col-3 fs-16-fc-030303">备注</div>
                <div class="cus-row-col-9 fs-16-fc-030303"><input placeholder="请备注您的特殊需求" v-model="remark"/></div>
            </div>
        </div>


        <div class="white-bg-card">
            <div class="cus-row">
                <div class="cus-row-col-6">
                    <div class="in-bl-v-m"><i class="agree-icon"></i></div>
                    <div class="in-bl-v-m fs-16-fc-030303">服务地址</div>
                </div>
                <div class="cus-row-col-6 fs-16-fc-030303" v-on:click="goAddressList()">
                    修改
                </div>
            </div>
            <div class="fs-16-fc-030303">{{name}}  {{phone}}</div>
            <div class="fs-16-fc-030303">{{pct_code_name}} {{address}}</div>
        </div>



        <div class="white-bg-card" id="service_time">

            <div>
                <div class="cus-row">
                    <div class="cus-row-col-3 fs-16-fc-030303">配送时间</div>
                    <div class="cus-row-col-9 fs-16-fc-030303 t-al-r">修改</div>
                </div>

                <div>
                    <picker @change="lunchTimeChange" :value="lunchIndex" :range="lunchService" style="line-height: 44px;">
                        <view class="picker fs-16-fc-484848">
                            {{lunchService[lunchIndex]}}
                        </view>
                    </picker>
                </div>

                <div>
                    <picker @change="dinnerTimeChange" :value="dinnerIndex" :range="dinnerService" style="line-height: 44px;">
                        <view class="picker fs-16-fc-484848">
                            {{dinnerService[dinnerIndex]}}
                        </view>
                    </picker>
                </div>


            </div>
        </div>


        <div class="white-bg-card">
            <div>
                <div class="cus-row">
                    <div class="cus-row-col-3 fs-16-fc-030303">起送时间</div>
                    <div class="cus-row-col-9 fs-16-fc-030303 t-al-r">修改</div>
                </div>
                <div>
                    <picker @change="deliverStartChange" :value="deliverStartIndex" :range="deliverStartList" style="line-height: 44px;">
                        <view class="picker fs-16-fc-484848">
                            {{deliverStartList[deliverStartIndex]}}
                        </view>
                    </picker>
                </div>
            </div>
        </div>

        <div class="fix-bottom3" style="background-color: #ffffff;padding: 14px;border-top:1px solid #EBE9E9 ;">
            <div class="cus-row cus-row-v-m">
                <div class="cus-row-col-6" id="total_price">
                    <span class="fs-24-fc-212229">￥{{price}}</span><span class="fs-24-fc-212229" id="price_label"></span>
                </div>
                <div class="cus-row-col-6">
                    <a class="btn-block1 m-t-20"  v-on:click="nextStep()" style="margin-top: 0;">立即付款</a>
                </div>
            </div>
        </div>

    </div>

</template>

<script>
    import globalStore from '../../stores/global-store'
    import param from '../../utils/param'

    export default {
        data () {
            return {
                msg: 'Hello',
                src: '',
                name:'',
                phone:'',
                pct:'',
                pct_code_name:'',
                address:'',
                neighborhoodId:0,
                attrArr:[],
                signTypeIndex:0,
                signTypeArray:['请先选择地址'],
                priceArray:[],
                idArray:[],
                timeService:[],
                timeServiceIndex:0,
                remark:'',
                lunchService:[],
                lunchIndex:0,
                dinnerService:[],
                dinnerIndex:0,
                deliverStartList:[],
                deliverStartIndex:0,
                periodPrice:[],
                periodIndex:0
            }
        },
        created:function()
        {

        },
        watch: {
            pct: function (val) {
                console.log('watch:');
                console.log(val);
                //找对应的array
                for( let i of this.attrArr)
                {
                    if( i.neighborhood_id == this.pct ){
                        this.signTypeIndex = 0;
                        // this.signTypeArray = i.kv;
                        let arrTmpSize = [];
                        let arrTmpPrice = [];
                        let arrTmpId = [];

                        for ( let j of i.kv)
                        {
                            arrTmpSize.push(j.size);
                            arrTmpPrice.push(j.price);
                            arrTmpId.push(j.attr_id);
                        }
                        this.signTypeArray = arrTmpSize;
                        this.priceArray = arrTmpPrice;
                        this.idArray = arrTmpId;
                        console.log(i.kv);
                        break;
                    }
                }

            }
        },
        onShow:function(){
            if( globalStore.state.addressShare )
            {
                //设置默认地址
                let jsonData = JSON.parse(globalStore.state.addressShare);
                this.name = jsonData.name;
                this.phone = jsonData.phone;
                this.pct = jsonData.pct;
                this.pct_code_name = jsonData.pct_code_name;
                this.address = jsonData.address;

                //如果地址变了，那么面积也应当相应的变化哟
            }
            globalStore.commit('setAddressShare','');
        },
        methods: {
            goAddressList:function()
            {
                wx.navigateTo(
                    {
                        url: "/pages/address/main?openid=" + wx.getStorageSync('openid')
                    });
            },
            lunchTimeChange:function(e)
            {
                this.lunchIndex = e.mp.detail.value;
            },
            dinnerTimeChange:function(e)
            {
                this.dinnerIndex = e.mp.detail.value;
            },
            bindPickerChange:function(e)
            {
                console.log('picker发送选择改变，携带值为',  e.mp.detail.value)
                this.signTypeIndex = e.mp.detail.value;
            },
            serviceTimeChange: function(e)
            {
                console.log('picker发送选择改变，携带值为',  e.mp.detail.value)
                this.timeServiceIndex = e.mp.detail.value;
            },
            deliverStartChange:function(e)
            {
                this.deliverStartIndex = e.mp.detail.value;
            },
            nextStep: function()
            {
                let id = param.getParamValue('product_id');
                let requestData = {pct_code:this.pct,pct_code_name:this.pct_code_name,phone:this.phone,name:this.name,address:this.address,clean_service_time:this.timeService[this.timeServiceIndex],product_id:id,remark:this.remark,openid:wx.getStorageSync('openid'),size:this.signTypeArray[this.signTypeIndex],attr_id:this.idArray[this.signTypeIndex],lunch_service:this.lunchService[this.lunchIndex],dinner_service:this.dinnerService[this.dinnerIndex],week:2,people:2};
                let url = globalStore.state.host + 'user/report-bill';
                this.$http.post(url,requestData).then((res)=>{
                    console.log(res.data.data.arr);
                    // a.attrArr = res.data.data.arr;
                    // a.timeService = res.data.data.timeArr;

                }).catch(err=>{console.log('网络异常')})
            }
        },
        mounted() {
            let id = param.getParamValue('product_id');
            let url = globalStore.state.host + 'passport/product-info';
            let a = this;
            this.$http.get(url,{id:id,openid:wx.getStorageSync('openid')}).then((res)=>{
                console.log(res.data.data.arr);
                a.attrArr = res.data.data.arr;
                a.timeService = res.data.data.timeArr;
                a.lunchService = res.data.data.lunchArr;
                a.dinnerService = res.data.data.dinnerArr;
                a.deliverStartList = res.data.data.start_deliver_day;
                a.periodPrice = res.data.data.periodPrice;
            }).catch(err=>{console.log('网络异常')})
        },
        computed:{
            price:function()
            {
                return this.priceArray[this.signTypeIndex]
            },
            periodService:function()
            {

            }
        }
    }
</script>

<style scoped>
  .message {
    color: red;
    padding: 10px;
    text-align: center;
  }
</style>