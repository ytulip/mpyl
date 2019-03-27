<template>
    <div>
        <div>
            <img src="http://graphis.zhuyan.me/header1.jpg" class="header-img1"/>
            <div class="in-bl v-a-m">
                <span class="fs-14-fc-212229">李老头</span><br/>
                <span class="fs-12-fc-95909e">您当前尚未开通家庭会员</span>
            </div>`
        </div>

        <div class="fs-16-fc-212229 t-al-c">选择会员方案</div>

        <div v-bind:class="{'current-item': (tabIndex == 1)}" v-on:click="setTab(1)">
            <div class="cus-row">
                <div class="cus-row-col-6">
                    <div class="fs-16-fc-212229">6个月</div>
                    <div class="fs-12-fc-95909e">半年制会员折扣或者特惠描述</div>
                </div>
                <div class="cus-row-col-6">
                    <span class="fs-12-fc-fa3f26">￥600</span>
                </div>
            </div>
        </div>

        <div v-bind:class="{'current-item': (tabIndex ==2)}" v-on:click="setTab(2)">
            <div class="cus-row">
                <div class="cus-row-col-6">
                    <div class="fs-16-fc-212229">12个月</div>
                    <div class="fs-12-fc-95909e">一年制会员折扣或者特惠描述</div>
                </div>
                <div class="cus-row-col-6">
                    <span class="fs-12-fc-fa3f26">￥1000</span>
                </div>
            </div>
        </div>

        <div class="btn4" v-on:click="pay">立即开通</div>
    </div>
</template>

<script>
    import globalStore from '../../stores/global-store'
    export default {
        data () {
            return {
                msg: 'Hello',
                banners:{},
                tabIndex:1
            }
        },
        created:function()
        {
        },
        methods: {
            setTab:function(index){
                this.tabIndex = index;
            },
            goClean() {
                wx.navigateTo(
                    {
                        url:'/pages/clean/main'
                    }
                );
            },
            goCommunity() {
                wx.navigateTo(
                    {
                        url:'/pages/clean/main?type=community'
                    }
                );
            },
            goBannerDetail(id) {
                console.log('go banner detail' + id);
                wx.navigateTo(
                    {
                        url:'/pages/webview/main?id=' + id
                    }
                );
            },
            buyNow(){
                wx.navigateTo(
                    {
                        url:'/pages/vipbuy/main'
                    }
                );
            },
            pay(){
                let url = globalStore.state.host + 'user/buy-vip';
                this.$http.get(url,{openid:wx.getStorageSync('openid'),type:this.tabIndex}).then((res)=>{
                    // console.log(res.data.data.arr);
                    // a.attrArr = res.data.data.arr;
                    // a.timeService = res.data.data.timeArr;

                    //支付成功关掉当前页面，返回家庭会员页面
                    wx.navigateBack({
                        delta:1
                    });

                }).catch(err=>{console.log('网络异常')})
            }
        },
        mounted(){
            let url = globalStore.state.host + 'user/vip-page-info';
            let a = this;
            this.$http.get(url,{openid:wx.getStorageSync('openid')}).then((res)=>{
                console.log(res.data.data.arr);
                // a.attrArr = res.data.data.arr;
                // a.timeService = res.data.data.timeArr;

            }).catch(err=>{console.log('网络异常')})
        }
    }
</script>

<style scoped>
    .message {
        color: red;
        padding: 10px;
        text-align: center;
    }

    .active-div{display: block !important;}

    .current-item
    {
        border: 1px solid #fa3f26;
    }
</style>