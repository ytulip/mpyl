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
                        <img src="/static/images/icon_close_nor@3x.png" style="width: 24px;height: 24px;" v-on:click="closeCalderSwitch">
                    </div>


                    <div style="padding: 26px 16px 6px; background-color: #ffffff">

                        <div style="">
                            <span class="fs-18-fc-212229-m">选择会员方案</span>
                        </div>

                        <div class="t-al-c" style="font-size: 0;margin-top: 26px;margin-bottom: 22px;">
                            <div class="in-bl" style="background: #F9F9FB;border: 1px solid #E1E1E1;border-radius: 17px 0px 0px 17px;" v-bind:class="{ 'active-type': (tabIndex == 1) }" v-on:click="setTab(1)"><span class="fs-16-fc-080808-r" style="line-height: 36px;padding: 0 24px;">会员A</span></div>
                            <div class="in-bl" style="background: #F9F9FB;border: 1px solid #E1E1E1;border-radius: 0px 17px 17px 0px;" v-bind:class="{ 'active-type': (tabIndex == 2) }" v-on:click="setTab(2)"><span class="fs-16-fc-080808-r" style="line-height: 36px;padding: 0 24px;">会员B</span></div>
                        </div>

                        <div style="background: #FFFFFF;border: 1px solid #E1E1E1;border-radius: 4px;padding: 24px;margin-top: 24px;position: relative;" v-for="(item,index) in vip[tabIndex - 1]" v-on:click="changeSubTabIndex(index)" v-bind:class="{'chosen-item':(subTabIndex == index)}">
                            <div class="cus-row">
                                <div class="cus-row-col-6 v-a-m fs-18-fc-000000-m">
                                    {{item.title}}个月
                                </div>
                                <div class="cus-row-col-6 v-a-m fs-20-fc-000033-m t-al-r">
                                    ￥{{item.price}}
                                </div>
                            </div>

                            <div class="fs-14-fc-7e7e7e-r" style="line-height: 21px;margin-top: 12px;">
                                {{item.desc}}
                            </div>


                            <div style="width: 0;height: 0;border-style: solid;border-width: 24px 24px 0 0;border-color: #CE388E transparent transparent transparent;position: absolute;top:0;left: 0;"  v-if="subTabIndex == index"></div>


                        </div>

                        <!--<div style="">-->
                            <!--<span class="fs-18-fc-212229-m">预定时间</span><span style="margin-left: 16px;" class="fs-14-fc-7E7E7E-r">单次预定限五天内 节假日暂不供应</span>-->
                        <!--</div>-->

                        <div style="margin-top: 26px;">
                            <a class="yl_btn1 m-t-20" style="margin-top: 0;display: block;" @click="doBuy">￥60 微信支付</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>



        <div v-if="isVip">
            <div style="position: relative">
                <img src="/static/images/home_banner_nor@3x.png" mode="widthFix" style="width: 100%;"/>

                <div class="all-center" style="padding-left: 32px;width: 100%;box-sizing: border-box;">
                    <div class="fs-21-fc-ffffff-m t-al-l"><span class="vip-user v-a-m"></span><span class="v-a-m" style="margin-left: 8px;">已开通花甲会员({{vipTypeText}})</span></div>
                    <div class="m-t-24 t-al-l"><a class="fs-14-fc-ffffff f-f-r">{{expireDay}}到期（到期后可续费）</a></div>
                </div>
            </div>

            <div class="fs-18-fc-000000-m m-t-24">会员特权</div>

            <div class="cus-row m-t-16">
                <div class="cus-row-col-6" style="padding-right: 9px;box-sizing: border-box;"  v-on:click="goFood">
                    <div class="common-panel p-16-16-24-16">
                        <div class="fs-16-fc-000000-m"><span class="short-line" style="border-right-color: #C50081;"></span>订餐服务</div>
                        <div class="m-t-20"><span class="fs-14-fc-000000-m">剩余</span><span class="fs-16-fc-000000-m">{{foodActive}}</span><span class="fs-14-fc-7e7e7e-r">/{{foodTotal}}天</span></div>
                    </div>
                </div>
                <div class="cus-row-col-6" style="padding-left: 9px;box-sizing: border-box;"  v-on:click="goClean">
                    <div class="common-panel p-16-16-24-16">
                        <div class="fs-16-fc-000000-m"><span class="short-line" style="border-right-color: #FFB11B;"></span>家庭清洁</div>
                        <div class="m-t-20"><span class="fs-14-fc-000000-m">剩余</span><span class="fs-16-fc-000000-m">{{cleanActive}}</span><span class="fs-14-fc-7e7e7e-r">/{{cleanTotal}}次</span></div>
                    </div>
                </div>
            </div>

            <div class="cus-row m-t-16">
                <div class="cus-row-col-6" style="padding-right: 9px;box-sizing: border-box;" v-on:click="goFinance">
                    <div class="common-panel p-16-16-24-16">
                        <div class="fs-16-fc-000000-m"><span class="short-line" style="border-right-color: #2E82FF;"></span>理财咨询</div>
                        <div class="m-t-20"><span class="fs-14-fc-000000-m">下次预约:08月23日</span></div>
                    </div>
                </div>
                <div class="cus-row-col-6" style="padding-left: 9px;box-sizing: border-box;" v-on:click="goHealth">
                    <div class="common-panel p-16-16-24-16">
                        <div class="fs-16-fc-000000-m"><span class="short-line" style="border-right-color: #0AD87B;"></span>健康体检</div>
                        <div class="m-t-20"><span class="fs-14-fc-000000-m">剩余</span><span class="fs-16-fc-000000-m">{{healthActive}}</span><span class="fs-14-fc-7e7e7e-r">/{{healthTotal}}次</span></div>
                    </div>
                </div>
            </div>



            <div class="common-panel fs-18-fc-000000-m m-t-24" style="padding:20px 16px;line-height: 22px;" v-on:click="makeCall">
                <div class="cus-row">
                    <div class="cus-row-col-6 v-a-m fs-16-fc-000000-m"><span class="short-line" style="border-right-color: #966FEE;"></span>24小时 小花帮忙</div>
                    <div class="cus-row-col-6 v-a-m fs-14-fc-7e7e7e-r t-al-r">点击拨打</div>
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
                banners:{},
                tabIndex:1,
                isVip:false,
                expireDay:'',
                speRight:[
                    {title:'特权1  服务更省钱',desc:'这里是一段套餐介绍的，午餐晚餐，每餐标准为2荤2素搭配堂主食为米饭，进了比这里是描述，目前还没有文况来定，之后文字补充上'},
                    {title:'特权2 您的专属理财专家',desc:'这里是一段套餐介绍的，午餐晚餐，每餐标准为2荤2素搭配堂主食为米饭，进了比这里是描述，目前还没有文况来定，之后文字补充上'},
                    {title:'特权3 免费健康体检',desc:'这里是一段套餐介绍的，午餐晚餐，每餐标准为2荤2素搭配堂主食为米饭，进了比这里是描述，目前还没有文况来定，之后文字补充上'},
                    {title:'特权4 社区管家24小时',desc:'这里是一段套餐介绍的，午餐晚餐，每餐标准为2荤2素搭配堂主食为米饭，进了比这里是描述，目前还没有文况来定，之后文字补充上'}],
                calderSwitch:false,
                vip: [
                        [{price:'110',title:'3',desc:'三个月(90次 )B餐；每月二次的日常保洁和每月一次的深度保洁(共18次)；1次日常体检；参加花甲全部会员活动'},{price:'300',title:'6',desc:'三个月(90次 )B餐；每月二次的日常保洁和每月一次的深度保洁(共18次)；1次日常体检；参加花甲全部会员活动'}],
                        [{price:'500',title:'3',desc:'三个月(90次 )B餐；每月二次的日常保洁和每月一次的深度保洁(共18次)；1次日常体检；参加花甲全部会员活动'},{price:'900',title:'6',desc:'三个月(90次 )B餐；每月二次的日常保洁和每月一次的深度保洁(共18次)；1次日常体检；参加花甲全部会员活动'}]
                    ],
                openid:'',
                foodTotal:'',
                foodActive:'',
                cleanTotal:'',
                cleanActive:'',
                subTabIndex:0,
                healthTotal:0,
                healthActive:0,
                vipTypeText:''
            }
        },
        created:function()
        {
        },
        methods: {
            setTab:function(index){
                this.tabIndex = index;
            },
            closeCalderSwitch:function()
            {
                this.calderSwitch = false;
            },
            goServer()
            {
                wx.switchTab({
                    url: '/pages/book/main'
                });
            },
            changeSubTabIndex(ind){
                this.subTabIndex = ind;
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
            goFood() {
                wx.navigateTo(
                    {
                        url:'/pages/clean/main?type=2'
                    }
                );
            },
            goClean() {
                wx.navigateTo(
                    {
                        url:'/pages/clean/main'
                    }
                );
            },
            goFinance()
            {
                let url = Base64.encode('/index/attend-finance?user_id=' + param.getOpenid());
                wx.navigateTo(
                    {
                        url:'/pages/commonweb/main?url=' + url,
                    }
                );
            },
            goHealth()
            {
                let url = Base64.encode('/index/health?user_id=' + param.getOpenid());
                wx.navigateTo(
                    {
                        url:'/pages/commonweb/main?url=' + url,
                    }
                );
            },
            makeCall(){
                wx.makePhoneCall({
                    phoneNumber: '02861526472'
            })
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
            doBuy(){

                if( !this.openid )
                {
                    this.$mptoast('页面获取用户信息失败');
                    return;
                }


                let a = this;
                let requestData = {user_openid:this.openid,openid:param.getOpenid(),type: (this.tabIndex - 1) * 2 + this.subTabIndex + 1};
                let url = globalStore.state.host + 'user/report-vip';
                this.$http.post(url,requestData).then((res)=>{

                    //下单成功跳转呀
                    if(res.data.status) {
                        var jsonData = JSON.parse(res.data.data);
                        console.log(jsonData);
                        wx.requestPayment({
                            'timeStamp': jsonData.timeStamp,
                            'nonceStr': jsonData.nonceStr,
                            'package': jsonData.package,
                            'signType': jsonData.signType,
                            'paySign': jsonData.paySign,
                            'success':function(res){
                                // a.$mptoast('支付成功');
                                // a.init();
                                let url = Base64.encode('/passport/pay-success-vip');
                                wx.redirectTo(
                                    {
                                        url:'/pages/commonweb/main?url=' + url,
                                    }
                                )
                            },
                            'fail':function(res){
                                a.$mptoast('支付失败');
                            }
                        });
                    }

                }).catch(err=>{console.log('网络异常')})
                return;
            },
            buyNow(){




                this.calderSwitch = true;
                // wx.navigateTo(
                //     {
                //         url:'/pages/vipbuy/main'
                //     }
                // );
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
                    a.foodTotal = res.data.data.foodTotal;
                    a.foodActive = res.data.data.foodActive;
                    a.cleanTotal = res.data.data.cleanTotal;
                    a.cleanActive = res.data.data.cleanActive;
                    a.healthTotal = res.data.data.healthTotal;
                    a.healthActive = res.data.data.healthActive;
                    a.vipTypeText = res.data.data.vip_type_text;

                }).catch(err=>{console.log('网络异常')})
            },
            userOpenid(){
                let a = this;
                wx.login({
                    success: function (res) {
                        if (res.code) {
                            //发起网络请求
                            console.log(res.code);
                            wx.request({
                                url: globalStore.state.host + 'activity/common-info2',
                                data: {
                                    code: res.code
                                },
                                success: function (requestRes) {
                                    console.log(requestRes);
                                    if (requestRes.data.status) {
                                        a.openid = requestRes.data.data.openid;
                                    }

                                }
                            })
                        } else {
                            console.log('登录失败！' + res.errMsg)
                        }
                    }
                });
            }
        },
        mounted(){
            this.userOpenid();
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


    .vip-user
    {
        display: inline-block;
        width: 19px;
        height: 19px;
        background:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADkAAAA5CAYAAACMGIOFAAAAAXNSR0IArs4c6QAAA/5JREFUaAXlm79PFEEUxzmUhEQrY0GgoTPEWEAhxkRJoDZUJlhZoZXRRhPvT7ATQ9RObI5EKezFBGzEQipD7Ejk0AJpRGMEf3w/587KLtwdezvzDo6XfG9238y+9747u7Mzb/cKfyRtjcmmDlsXysKC8Ep4USgU0OcShdQhA6PCsDAo9AgnBPTZBZIeZUW2igIBZRaOE+4K2PEmbd4sJQ190u5QFpa0FzjOu7RnCSRD2y61nVW0d4RCreOopx3tBY7zL3IQWiZqRS3nE6ED4Cw2OvDUij1dd0UD0nRaKddj0pXSet/7ViQ3FPhZEV1yBESwT9tvheNOF6oMdU+m44XIw5TykfaDE8SnVU86fgPqzUX1Yr8U75wydGnVk47HrWjDlU4ftLTuyW9ic1JYE44FZbbNuHVPQuyqJUG4WpPE52V+LKUZJE9ZEsQX9ySrhqOGjpl81JzqeY5lk5784tloPXOWBIllHZKr9aI64PVlSL454CTqhb8ASZY41vJDDoGFzDLwMOgsC6QYrMTdIt2BHZKa6W3XXHJLG5OBnaXNsxqJVyTpSo/7k/DjckUeC58rWzY/r+UGhBT4wOv/80qX7UXtk3E7QkVA4bncG9lfVtlYBi4yUKX4Jf2wenGeeteTbZGiWOUgn+qSfK0CGQ2VFSg6gjsCV28yEIXMuWzIfjytY1tA51OIv/6EQ43GhK8+PcvWd+FS+syii+pU5BLiJWe0d9EBfcJcLrf/Dl5T8Vw4U807dVEb2jYixEnOaFeJ78l0ra7pJYEE8YDwVGDBu5+EeIiLlMoQ8eYOTmeqU7gmvBQ+Cr+FLJL3csUffvFPHJ25STkDMtYvPBF8DBA+Bx5sTRGfizVzqYN93ZMylZApF4y0BOlDat6Tzl+ilNcQo6sj81Mb3RHY9iVVR9dERkDeeL7cF24kWPvdYYYzHpn0OdshUV0Sh/Mqb2ogil9/JEiq8rYQkqDMV+SC2whQEv+KcM/ZjmcGOgNWc1d8h15qJeauFZIiyJvh90IXERiIWzD7ewzsDJpVyGldtpUcD9XXBSuC+INcSIL4gA+8KinJZmQG8G0hZTnpZVrHVxaWqQ8Lcs4HvEYhOeI0LVqOQPJci5JztAYhGTpj5pw1q+wp6PFBti50Xmc7waa8C7EkCFlGPEvp4HK1lg/WDptB8pk1Se7JeLZu4JyURct/MzCjuSTz1hmDExq7sO7Jlv+OZ069uMjpjcr5+FQH3rDqyUPxbd24ei+RF432XRokaF9aPEImRGh6NxaR/sFudV51PEICyZbs7vnLZbWlfRA5FN+g+ya5L/9NkGd05Y3x9v+F8BUJ/wthVZNLdM2SkiFjwYJ+UGCFT7KtoTztX2epki1hh5tBAAAAAElFTkSuQmCC');
        background-size: 19px 19px;
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


    .chosen-item{
        border: 1px solid #C50081 !important;
        background-color: #F9F9FB !important;
    }
</style>