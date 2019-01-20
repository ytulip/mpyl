<template>
    <div class="p16 bg-f9f9fb">

        <div class="white-panel">
            <div class="cus-row">
                <div class="cus-row-col-6 v-a-m">
                    <span class="fs-18-fc-000000-m in-bl" style="line-height: 25px;">配送地址</span>
                </div>
                <div class="cus-row-col-6 v-a-m t-al-r">
                    <span class="fs-16-fc-c50081-m" v-on:click="goAddressList()">修改</span>
                </div>
            </div>

            <div class="m-t-16">
                <div class="fs-16-fc-000000-m in-bl" style="line-height: 22px;">{{name}}  {{phone}}</div>

                <div class="fs-14-fc-7e7e7e-r" style="margin-top: 8px;">
                    {{pct_code_name}} {{address}}
                </div>
            </div>
        </div>



        <div class="white-panel m-t-16">
            <div class="cus-row">
                <div class="cus-row-col-6 v-a-m">
                    <span class="fs-18-fc-000000-m in-bl" style="line-height: 25px;">订购服务</span>
                </div>
            </div>

            <div class="cus-row m-t-24">
                <div class="in-bl v-a-t food-icon-img">
                    <image :src="visitCoverImage" class="slide-image" style="width: 100%;height: 100%;"/>
                </div>
                <div class="v-a-t in-bl m-l-24">
                    <div class="fs-16-fc-000000-m">{{product.product_name}}</div>
                    <div class="m-t-10"><span class="fs-14-fc-c50081-m">￥{{product.price}}</span><span class="fs-14-fc-7e7e7e-r"> ×{{quantity}}份 ×{{days}}天</span></div>
                </div>
            </div>

            <div class="barr-line"></div>
            <div class="cus-row">
                <div class="cus-row-col-6 v-a-m">
                    <div class="fs-16-fc-000000-m">订餐份数</div>
                    <div class="fs-14-fc-7e7e7e-r m-t-6">1份餐仅供一人</div>
                </div>
                <div class="cus-row-col-6 v-a-m t-al-r">
                    <div class="in-bl v-a-m quantity-plus-icon" v-on:click="deQuantity"><image src="/static/images/tarbar/icon_out_nor@3x.png" class="quantity-plus-icon"/></div>
                    <div class="in-bl v-a-m" style="margin: 0 30px;"><span class="quantity-plus">    {{quantity}}    </span></div>
                    <div class="in-bl v-a-m quantity-plus-icon" v-on:click="addQuantity"><image src="/static/images/tarbar/icon_add_nor@3x.png" class="quantity-plus-icon"/></div>
                </div>
            </div>

            <div class="barr-line"></div>
            <div class="cus-row">
                <div class="cus-row-col-6 v-a-m">
                    <span class="fs-16-fc-000000-m in-bl" style="line-height: 25px;">预定时间</span>
                </div>
                <div class="cus-row-col-6 v-a-m t-al-r">
                    <span class="fs-16-fc-c50081-m" v-on:click="goAddressList()">修改</span>
                </div>
            </div>

            <div class="in-bl fs-16-fc-000000-m m-t-16">共计:{{days}}天</div>
            <div class="fs-14-fc-7e7e7e-r m-t-6">明天</div>

            <div class="fs-14-fc-7e7e7e-r m-t-16">午餐配送时间：11:30 - 12:30</div>
            <div class="fs-14-fc-7e7e7e-r m-t-6">晚餐配送时间：18:30 - 19:30</div>

            <div class="m-t-24">
                <img src="" style="width: 80px;height: 80px;"/>
            </div>
        </div>


        <div class="white-panel m-t-16">

            <div class="fs-16-fc-000000-m">优惠</div><br/>

            <div class="cus-row">
                <div class="cus-row-col-6 v-a-m">
                    <div class="fs-16-fc-000000-m">花甲红包</div>
                    <div class="fs-14-fc-7e7e7e-r m-t-10">暂无备注</div>
                </div>
                <div class="cus-row-col-5 v-a-m">

                </div>
                <div class="cus-row-col-1 v-a-m t-al-r">
                    <img src="/static/images/icon_next_nor@3x.png" style="width: 13px;" mode="widthFix"/>
                </div>
            </div>



            <div class="barr-line"></div>

            <div class="cus-row">
                <div class="cus-row-col-6 v-a-m">
                    <span class="fs-16-fc-000000-m">订购优惠</span><br/>
                    <span class="fs-14-fc-7e7e7e-r">5日以上优惠20元</span>
                </div>
                <div class="cus-row-col-6 v-a-m fs-14-fc-7e7e7e-r t-al-r">
                    暂无优惠
                </div>
            </div>

        </div>

        <div class="white-panel m-t-16">
            <div class="cus-row">
                <div class="cus-row-col-6 v-a-m">
                    <div class="fs-18-fc-000000-m">忌口备注</div>
                    <div class="fs-14-fc-7e7e7e-r m-t-10">暂无备注</div>
                </div>
                <div class="cus-row-col-5 v-a-m">

                </div>
                <div class="cus-row-col-1 v-a-m t-al-r">
                    <img src="/static/images/icon_next_nor@3x.png" style="width: 13px;" mode="widthFix"/>
                </div>
            </div>
        </div>

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


                <div class="cus-row">
                    <div class="cus-row-col-3 fs-16-fc-030303">时长</div>
                </div>
                <div>
                    <picker @change="periodServiceChange" :value="periodIndex" :range="periodService" style="line-height: 44px;">
                        <view class="picker fs-16-fc-484848">
                            {{periodService[periodIndex]}}
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
                <div class="cus-row-col-4">
                    <a class="yl_btn m-t-20"  v-on:click="nextStep()" style="margin-top: 0;">微信支付</a>
                </div>
            </div>
        </div>

    </div>

</template>

<script>
    import globalStore from '../../stores/global-store'
    import param from '../../utils/param'
    import _ from 'underscore'

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
                periodIndex:0,
                product:{},
                quantity:0,
                days:1
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
            deQuantity:function () {
                if( this.quantity > 1)
                {
                    this.quantity = this.quantity - 1;
                }
            },
            addQuantity:function(){
                this.quantity = this.quantity + 1;
            },
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
            periodServiceChange:function(e)
            {
                this.periodIndex = e.mp.detail.value;
            },
            nextStep: function()
            {
                let id = param.getParamValue('product_id');
                let requestData = {pct_code:this.pct,pct_code_name:this.pct_code_name,phone:this.phone,name:this.name,address:this.address,clean_service_time:this.timeService[this.timeServiceIndex],product_id:id,remark:this.remark,openid:wx.getStorageSync('openid'),size:this.signTypeArray[this.signTypeIndex],attr_id:this.idArray[this.signTypeIndex],lunch_service:this.lunchService[this.lunchIndex],dinner_service:this.dinnerService[this.dinnerIndex],people:2,attr_id:this.periodPrice[this.periodIndex].attr_id,service_start_time:this.deliverStartList[this.deliverStartIndex]};
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
                a.product = res.data.data.product;
            }).catch(err=>{console.log('网络异常')})
        },
        computed:{
            price:function()
            {
                return this.priceArray[this.signTypeIndex]
            },
            periodService:function()
            {
                console.log(this.periodPrice);
                return _.pluck(this.periodPrice,'period_name');
            },
            visitCoverImage:function()
            {
                return globalStore.state.host + this.product.cover_image;
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