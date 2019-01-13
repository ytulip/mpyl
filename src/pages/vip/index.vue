<template>
    <div>
        <div>
            <img src="http://graphis.zhuyan.me/header1.jpg" class="header-img1"/>
            <div class="in-bl v-a-m">
                <span class="fs-14-fc-212229">李老头</span><br/>
                <span class="fs-12-fc-95909e">{{isVip?'家庭会员':'您当前尚未开通家庭会员'}}</span>
            </div>
        </div>

        <div v-if="isVip" class="fs-14-fc-A6A6A6">
            会员到期日:{{expireDay}}
        </div>

        <div class="fs-16-fc-212229 t-al-c">会员介绍</div>
        <div class="fs-16-fc-212229 t-al-c">会员特权</div>

        <div class="cus-row">
            <div class="cus-row-col-3 t-al-c"><span class="fs-14-fc-212229 " v-bind:class="{ 'active-tab': (tabIndex == 1) }" v-on:click="setTab(1)">助餐服务</span></div>
            <div class="cus-row-col-3 t-al-c"><span class="fs-14-fc-212229" v-bind:class="{ 'active-tab': (tabIndex == 2) }" v-on:click="setTab(2)">保洁服务</span></div>
            <div class="cus-row-col-3 t-al-c"><span class="fs-14-fc-212229" v-bind:class="{ 'active-tab': (tabIndex == 3) }" v-on:click="setTab(3)">金融服务</span></div>
            <div class="cus-row-col-3 t-al-c"><span class="fs-14-fc-212229" v-bind:class="{ 'active-tab': (tabIndex == 4) }" v-on:click="setTab(4)">体检服务</span></div>
        </div>



        <div>


            <div class="dp-n" v-bind:class="{ 'active-div': (tabIndex == 1) }">aaaa</div>
            <div class="dp-n" v-bind:class="{ 'active-div': (tabIndex == 2) }">bbbb</div>
            <div class="dp-n" v-bind:class="{ 'active-div': (tabIndex == 3) }">cccc</div>
            <div class="dp-n" v-bind:class="{ 'active-div': (tabIndex == 4) }">dddd</div>

        </div>



        <div class="btn4" v-on:click="buyNow">立即开通</div>
    </div>
</template>

<script>
    import globalStore from '../../stores/global-store'
    export default {
        data () {
            return {
                msg: 'Hello',
                banners:{},
                tabIndex:1,
                isVip:false,
                expireDay:''
            }
        },
        created:function()
        {
            console.log('index' + wx.getStorageSync('openid'));
            //定时等待10s
            (function(a,timer){
                let countDownHandler = setInterval(function(){
                    timer = timer - 1;
                    console.log(timer);
                    //判断是否拥有openid
                    if( wx.getStorageSync('openid'))
                    {
                        a.openid = wx.getStorageSync('openid');
                        if( a.hasOwnProperty('userInit') )
                        {
                            console.log('has userInit');
                            a.userInit();
                        } else {
                            console.log('donot has userInit');
                        }
                        clearInterval(countDownHandler);
                        return;
                    }
                    a.userInit();
                    if( timer < 1) {
                        clearInterval(countDownHandler);
                        return;
                    }
                },1000);
            })(this,7);
        },
        methods: {
            setTab:function(index){
                this.tabIndex = index;
            },
            clickHandle () {
                let url = 'http://yl.zhuyan.me/activity/user-info'
                let param = {code:1}
                //网络请求
                this.$http.get(url,param).then((res)=>{}).catch(err=>{console.log(3)});
                this.msg = 'Clicked!!!!!!'
            },
            userInit () {
                let url = globalStore.state.host + 'index/home-main';
                let param = {code:1}
                Object.assign(param,{openid:this.openid});
                this.$http.get(url,param).then((res)=>{
                    console.log(res.data.data);
                    this.banners = res.data.data.banners;
                }).catch(err=>{console.log(3)})
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
            init(){
                let url = globalStore.state.host + 'user/vip-page-info';
                let a = this;
                this.$http.get(url,{openid:wx.getStorageSync('openid')}).then((res)=>{
                    console.log(res.data.data.arr);
                    // a.attrArr = res.data.data.arr;
                    // a.timeService = res.data.data.timeArr;
                    a.isVip = res.data.data.isVip;
                    a.expireDay = res.data.data.expireDay;

                }).catch(err=>{console.log('网络异常')})
            }
        },
        mounted(){
            this.init();
        },
        onShow(){
            this.init();
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
</style>