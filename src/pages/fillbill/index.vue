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
                <div class="cus-row-col-9 fs-16-fc-030303"><input placeholder="请备注您的特殊需求" id="remark"/></div>
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
            <div class="fs-16-fc-030303">{{pct}} {{address}}</div>
        </div>



        <div class="white-bg-card" id="service_time">


            <div class="cus-row">
                <div class="cus-row-col-3 fs-16-fc-030303">服务面积</div>
                <div class="cus-row-col-8 fs-16-fc-030303">
                    <input v-model="size"/>
                </div>
                <div class="cus-row-col-1 fs-16-fc-030303"><i class="next-icon"></i></div>
            </div>


            <div class="cus-row">
                <div class="cus-row-col-3 fs-16-fc-030303">服务时间</div>
                <div class="cus-row-col-8 fs-16-fc-030303">
                </div>
                <div class="cus-row-col-1 fs-16-fc-030303"><i class="next-icon"></i></div>
            </div>
        </div>

    </div>



    <div class="fix-bottom" style="background-color: #ffffff;padding: 14px;border-top:1px solid #EBE9E9 ;">
        <div class="cus-row cus-row-v-m">
            <div class="cus-row-col-6" id="total_price">
                <span class="fs-24-fc-212229">￥</span><span class="fs-24-fc-212229" id="price_label"></span>
            </div>
            <div class="cus-row-col-6">
                <a class="btn-block1 m-t-20" href="javascript:void(0)" id="next_step" style="margin-top: 0;">立即付款</a>
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
                address:''

            }
        },
        created:function()
        {

        },
        onShow:function(){
//            console.log('show again');
//            console.log('');
//            id,name,phone,pct,address
//            console.log(globalStore.state.addressShare);
            if( globalStore.state.addressShare )
            {
                //设置默认地址
                let jsonData = JSON.parse(globalStore.state.addressShare);
                this.name = jsonData.name;
                this.phone = jsonData.phone;
                this.pct = jsonData.pct;
                this.address = jsonData.address;
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
            }
        },
        mounted() {
//            this.src = globalStore.state.host + 'user/report-bill?product_id=' + param.getParamValue('product_id') + '&openid=' +wx.getStorageSync('openid');
        },
    }
</script>

<style scoped>
  .message {
    color: red;
    padding: 10px;
    text-align: center;
  }
</style>