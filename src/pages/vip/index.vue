<template>
    <div class="p16 bg-f9f9fb">

        <div v-if="!isVip" style="margin-bottom: 100px;">

            <div style="position: relative">
                <img src="/static/images/home_banner_nor@3x.png" mode="widthFix" style="width: 100%;"/>

                <div class="all-center" style="width: 100%;">
                    <div class="fs-21-fc-ffffff-m t-al-c">开通花甲会员，最省钱！</div>
                    <div class="m-t-24 t-al-c"><a class="txt-tag-f">更多优惠  服务更多！</a></div>
                </div>
            </div>

            <div class="m-t-16 p24-block" v-for="(item,index) in speRight">
                <div><img src="/static/images/tarbar/home_icon_sel@3x.png" style="width: 16px;height: 16px;" class="in-bl v-a-m"/><span class="in-bl v-a-m  fs-18-fc-000000-m" style="margin-left: 8px;">{{item.title}}</span></div>
                <div class="fs-14-fc-7E7E7E-r" style="line-height: 20px;margin-top: 16px;">{{item.desc}}</div>
            </div>


            <div class="fix-bottom3" style="background-color: #ffffff;padding: 14px;border-top:1px solid #EBE9E9 ;">
                <a class="yl_btn1"  v-on:click="buyNow" style="margin-top: 0;">¥60 立即开通</a>
            </div>


            <div style="position: fixed;top:0;bottom: 0;left: 0;right: 0;background-color: rgba(28,36,75,0.80);z-index:9999" id="calder" v-if="calderSwitch">
                <div style="position: absolute;left:0;bottom: 0;right: 0;">


                    <div style="padding-left: 16px;margin-bottom: 16px;">
                        <img src="/static/images/icon_unsuess_nor@3x.png" style="width: 24px;height: 24px;" v-on:click="closeCalderSwitch">
                    </div>


                    <div style="padding: 26px 16px 6px; background-color: #ffffff">

                        <div style="">
                            <span class="fs-18-fc-212229-m">预定时间</span><span style="margin-left: 16px;" class="fs-14-fc-7E7E7E-r">单次预定限五天内 节假日暂不供应</span>
                        </div>

                        <div style="margin-top: 26px;">
                            <a class="yl_btn1 m-t-20" style="margin-top: 0;display: block;">￥60 微信支付</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>



        <div v-if="isVip">

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



        <!--<div class="btn4" v-on:click="buyNow">立即开通</div>-->
        <!--<div class="fix-bottom3" style="background-color: #ffffff;padding: 14px;border-top:1px solid #EBE9E9 ;">-->
            <!--<a class="yl_btn1"  v-on:click="buyNow" style="margin-top: 0;">¥60 立即开通</a>-->
        <!--</div>-->
        </div>


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
                expireDay:'',
                speRight:[
                    {title:'特权1  服务更省钱',desc:'这里是一段套餐介绍的，午餐晚餐，每餐标准为2荤2素搭配堂主食为米饭，进了比这里是描述，目前还没有文况来定，之后文字补充上'},
                    {title:'特权2 您的专属理财专家',desc:'这里是一段套餐介绍的，午餐晚餐，每餐标准为2荤2素搭配堂主食为米饭，进了比这里是描述，目前还没有文况来定，之后文字补充上'},
                    {title:'特权3 免费健康体检',desc:'这里是一段套餐介绍的，午餐晚餐，每餐标准为2荤2素搭配堂主食为米饭，进了比这里是描述，目前还没有文况来定，之后文字补充上'},
                    {title:'特权4 社区管家24小时',desc:'这里是一段套餐介绍的，午餐晚餐，每餐标准为2荤2素搭配堂主食为米饭，进了比这里是描述，目前还没有文况来定，之后文字补充上'}],
                calderSwitch:true
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


    .fs-16-fc-212229-m{
        font-family: PingFangSC-Medium;
        font-size: 16px;
        color: #212229;
        line-height: 16px;
    }


    .fs-18-fc-212229-m{
        font-family: PingFangSC-Medium;
        font-size: 18px;
        color: #212229;
        line-height: 18px;
    }

    .op3{opacity: 0.3;}



    .next-icon{
        display: inline-block;
        width: 8px;
        height: 13px;
        background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAA/CAYAAABjJtHDAAAAAXNSR0IArs4c6QAAAYdJREFUaAXN2t1tgzAQB/C6L4yRbpIMwAMjdLSOwAZJNknGQEKiXFUsCDbxx/3vzi9gY+GfzrqHw7iPSOu67msYhp+mab77vn9EpkGHP0Nv/4fdpmk6z8Ab9UPz0GPudYEV7LQ8c8495whepCO4wYVgmkCPO4JpAf9wKTANYDAhFkjoOifJSSpJsrZ1jZVIEo+jhXO2l+ajgRucNeAOZwkYxFkBRnEWgIc4beBbnCYwCacFTMZpALNw0sBsnCSwCCcFLMZJAKtwaGA1DglkwaGAbDgEkBXHDWTHcQIhOC4gDMcBhOJqgXBcDVAER8C2bS/jOF7pPqXNZeddBFdaD8NxpTD63AbF1cBo62G4WhgMxwGD4Lhg7DhOGCuOG8aGQ8BYcChYNQ4Jq8KhYcU4CVgRTgqWjZOEZeGkYck4DVgSTgv2FqcJO8Rpw6I4C7Agzgpsh7ME2+CswTzOIoxw2cfo6ANgQi3Nl4Yp0ZOEEdDjqHMElIbtcDGgBiyIewVqwaK4FVD1L7BfS2TUzqpVOAIAAAAASUVORK5CYII=');
        background-size: 8px 13px;
    }


    .prev-icon
    {
        display: inline-block;
        width: 8px;
        height: 13px;
        background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAA/CAYAAABjJtHDAAAAAXNSR0IArs4c6QAAAYdJREFUaAXN2t1tgzAQB/C6L4yRbpIMwAMjdLSOwAZJNknGQEKiXFUsCDbxx/3vzi9gY+GfzrqHw7iPSOu67msYhp+mab77vn9EpkGHP0Nv/4fdpmk6z8Ab9UPz0GPudYEV7LQ8c8495whepCO4wYVgmkCPO4JpAf9wKTANYDAhFkjoOifJSSpJsrZ1jZVIEo+jhXO2l+ajgRucNeAOZwkYxFkBRnEWgIc4beBbnCYwCacFTMZpALNw0sBsnCSwCCcFLMZJAKtwaGA1DglkwaGAbDgEkBXHDWTHcQIhOC4gDMcBhOJqgXBcDVAER8C2bS/jOF7pPqXNZeddBFdaD8NxpTD63AbF1cBo62G4WhgMxwGD4Lhg7DhOGCuOG8aGQ8BYcChYNQ4Jq8KhYcU4CVgRTgqWjZOEZeGkYck4DVgSTgv2FqcJO8Rpw6I4C7Agzgpsh7ME2+CswTzOIoxw2cfo6ANgQi3Nl4Yp0ZOEEdDjqHMElIbtcDGgBiyIewVqwaK4FVD1L7BfS2TUzqpVOAIAAAAASUVORK5CYII=');
        background-size: 8px 13px;
        transform: rotate(180deg);
    }


    .barr-line{
        background: #FFFFFF;
        border: 1px solid #E1E1E1;
    }

    .active-type{
        border: 1px solid #C50081 !important;
        background-color: #ffffff !important;
    }

    .chosen{
        background: #C50081;
        border-radius: 14px;
        height: 28px;
        width: 28px;
        display: inline-block;
        color: #ffffff !important;
        line-height: 28px !important;
        opacity: 1;
    }

    .cus-row-col-1-7 span{line-height: 22px;}


    .fs-16-fc-080808-r {
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: #080808;
        letter-spacing: -0.39px;
        text-align: center;
        line-height: 16px;
    }
</style>