<template>

    <div style="margin-top: 81px;">
        <div class="t-al-c">
            <img src="/static/images/Login_logo_nor@3x.png" style="width: 125px;" mode="widthFix"/>
        </div>

        <div style="margin-top: 74px;" class="p-lr-48">
            <!--<div class="">-->
                <!--<a class="yl_btn1 btn-green" v-on:click="getPhone">微信一键登录</a>-->
            <!--</div>-->

            <div class="">
            <button class="yl_btn1 btn-green" open-type="getPhoneNumber"  @getphonenumber="getUserInfo1">微信一键登录</button>
            </div>

            <div class="m-t-24">
                <a class="yl_btn1 btn-red" v-on:click="cusNavigate('bind')">手机验证登录</a>
            </div>
        </div>


        <!--<div class="m-t-40"><a class="yl_btn1" v-on:click="submit" v-bind:class="{ 'btn-gray': (btnGray) }">确定</a></div>-->

        <!--<div class="m-t-24">-->
            <!--<div class=""><span class="fs-12-fc-4a4a4a f-f-r l-h-17">点击确定，即表示已阅读并同意</span><span class="fs-12-fc-c50081 f-f-r l-h-17">《用户服务条款》</span></div>-->
        <!--</div>-->

        <mptoast />

    </div>

    <!--<div>-->
        <!--<div style="border-top:1px solid #EBEAEA;background-color: #ffffff">-->
            <!--<div class="cus-row cus-row-bborder" style="padding-left: 16px;">-->
                <!--<div class="cus-row-col-3 t-al-l"><span class="fs-16-fc-212229" style="line-height: 46px;">手机号</span></div>-->
                <!--<div class="cus-row-col-9">-->
                    <!--<input class="fs-16-fc-212229" type="text" style="line-height: 46px;margin-bottom: 0;border: none;height: 46px;" placeholder="请输入手机号" name="phone" v-model="phone"/>-->
                <!--</div>-->
            <!--</div>-->

            <!--<div class="cus-row cus-row-bborder" style="padding-left: 16px;">-->
                <!--<div class="cus-row-col-3 t-al-l"><span class="fs-16-fc-212229" style="line-height: 46px;">验证码</span></div>-->
                <!--<div class="cus-row-col-6"><input name="register_sms_code" class="fs-16-fc-212229" type="text" style="line-height: 46px;margin-bottom: 0;border: none;height: 46px;" placeholder="请输入验证码" v-model="smsCode"/></div>-->
                <!--<div class="cus-row-col-3"><a class="get-code-btn" v-on:click="sendSms"><span class="lms-link-1" style="display: inline-block;line-height: 44px;">{{smsText}}</span></a></div>-->
            <!--</div>-->
        <!--</div>-->

        <!--<div style="border-top:1px solid #EBEAEA;padding: 24px 28px;">-->
            <!--<a class="btn-block1" v-on:click="submit" id="next_step">提交申请</a>-->
        <!--</div>-->

        <!--<mptoast />-->
    <!--</div>-->
</template>

<script>
    import globalStore from '../../stores/global-store'
    import param from '../../utils/param'
    import mptoast from 'mptoast'

    export default {
        data () {
            return {
                phone:'',
                smsText:'',
                second:0,
                n1:'',
                n2:'',
                n3:'',
                n4:'',
                sessionKey:''
            }
        },
        components: {
            mptoast
        },
        created:function()
        {
        },
        watch:{
          n1:function(val){
              if(val)
              {
                  let strArray = val.split("");
                  if( strArray.length > 1)
                  {

                      //处理n2
                      if(strArray.length == 2) {
                          if (this.n2 == '') {
                              this.n2 = strArray[1];
                          } else if (this.n3 == '') {
                              this.n3 = strArray[1];
                          } else if (this.n4 == '') {
                              this.n4 = strArray[1];
                          }
                      }

                      //处理n3
//                      if(strArray.length == 2) {
//                          if (this.n2 == '') {
//                              this.n2 = strArray[1];
//                          } else if (this.n3 == '') {
//                              this.n3 = strArray[1];
//                          } else if (this.n4 == '') {
//                              this.n4 = strArray[1];
//                          }
//                      }

                      //处理n4
                      if(strArray.length == 4) {
                              this.n2 = strArray[1];
                              this.n3 = strArray[2];
                              this.n4 = strArray[3];
                          }
                      }

                      this.n1 = strArray[0];
                  }

//                  console.log(val);
                  // console.log('失去焦點');
                  // if(val.)
              }
        },
        methods: {

            getUserInfo1(e){
                console.log(e.mp.detail.errMsg);
                if (e.mp.detail.errMsg == 'getPhoneNumber:ok') {
                    this.getPhone(e.mp.detail.iv,e.mp.detail.encryptedData);
                } else {
                    return '';
                }
            },
            bindGetUserInfo(e) {
                // console.log(e.mp.detail.rawData)
                if (e.mp.detail.rawData){
                    //用户按了允许授权按钮
                    console.log('用户按了允许授权按钮')
                } else {
                    //用户按了拒绝按钮
                    console.log('用户按了拒绝按钮')
                }
            },


            pageInit(){
                //判断用户是否绑定了手机号
                this.$http.get(globalStore.state.host + 'user/vip-page-info',{
                    openid:param.getOpenid()
                }).then((res)=>{
                    if(res.data.status)
                    {
                        if( res.data.data.user.phone )
                        {
                            wx.switchTab({
                                url:'/pages/index/main'
                            })
                        } else
                        {
                            //显示当前页面
                        }
                    } else {

                    }

                }).catch(err=>{console.log(3)})
            },
            submit(){
                if(this.btnGray)
                {
                    return;
                }
                var a = this;
                this.$http.post(globalStore.state.host + 'passport/register',{
                    phone:this.phone,
                    register_sms_code:this.smsCode
                }).then((res)=>{
                    if(res.data.status)
                    {
                        //设置用户登录
                        wx.setStorageSync('openid', requestRes.data.data.userId);
                        let url = encodeURI('/user/bindmore');
                        wx.redirectTo(
                            {
                                url:'/pages/status/main?url=' + url,
                            }
                        );
                    } else {
                        console.log(res.data.desc);
                        a.$mptoast(res.data.desc)
                    }
                }).catch(err=>{console.log(4)})
            },
            sendSms(){
                if(!(/^1[3|4|5|8|7][0-9]\d{8}$/.test(this.phone))) {
                    this.$mptoast('请输入正确的手机号');
                    return;
                }

                if ( this.second ) {
                    return;
                }


                this.second = 60;
                this.smsText = this.second + '秒';

                (function(a){
                    var countDownHandler = setInterval(function(){
                        a.second = a.second - 1;
                        if( a.second < 1) {
                            clearInterval(countDownHandler);
                            a.second = 0;
                            a.smsText = '获取验证码';
                            return;
                        }
                        a.smsText = a.second + '秒';
                    },1000);
                })(this);

                //TODO:请求验证码
                this.$http.post(globalStore.state.host + '/passport/register-sms',{
                    phone:this.phone,
                    storage_type:'cache'
                }).then((res)=>{
                    if(res.data.status)
                    {
                        a.$mptoast('发送成功')
                    } else {
                        console.log(res.data.desc);
                        a.$mptoast(res.data.desc)
                    }
                }).catch(err=>{console.log(4)})
            },
            cusNavigate(url){
                wx.navigateTo(
                    {
                        url: "/pages/"+url+"/main"
                    });
            },
            getPhone:function(iv,encryptedData)
            {
                let a = this;
                a.$http.post(globalStore.state.host + '/passport/decode-info',{
                    iv:iv,
                    encryptedData:encryptedData,
                    sessionKey:this.sessionKey
                }).then((res)=>{
                    if(res.data.status)
                    {
                        let jsonData = JSON.parse(res.data.data);
                        let phone = jsonData.phoneNumber;
                        wx.navigateTo(
                            {
                                url: '/pages/sms/main?phone=' + phone
                            }
                        );
//                                                a.$mptoast('发送成功')
                    } else {
                        console.log(res.data.desc);
                        a.$mptoast(res.data.desc)
                    }
                }).catch(err=>{console.log(4)})
//                 wx.login({
//                     success: function (res) {
//                         if (res.code) {
//                             //发起网络请求
//                             console.log(res.code);
//                             wx.request({
//                                 url: globalStore.state.host + 'activity/common-info2',
//                                 data: {
//                                     code: res.code
//                                 },
//                                 success: function (requestRes) {
//                                     console.log(requestRes);
//                                     if (requestRes.data.status) {
//                                         let sessionKey = requestRes.data.data.session_key;
//                                         console.log('iv:' + iv);
//                                         a.$http.post(globalStore.state.host + '/passport/decode-info',{
//                                             iv:iv,
//                                             encryptedData:encryptedData,
//                                             sessionKey:sessionKey
//                                         }).then((res)=>{
//                                             if(res.data.status)
//                                             {
//                                                 let jsonData = JSON.parse(res.data.data);
//                                                 let phone = jsonData.phoneNumber;
//                                                 wx.navigateTo(
//                                                     {
//                                                         url: '/pages/sms/main?phone=' + phone
//                                                     }
//                                                 );
// //                                                a.$mptoast('发送成功')
//                                             } else {
//                                                 console.log(res.data.desc);
//                                                 a.$mptoast(res.data.desc)
//                                             }
//                                         }).catch(err=>{console.log(4)})
//                                     }
//
//                                 }
//                             })
//                         } else {
//                             console.log('登录失败！' + res.errMsg)
//                         }
//                     }
//                 });
            },
        },
        mounted() {
//            this.phone = param.getParamValue('phone');
//            this.sendSms();

            //如果用户登录了，那么直接跳转到home页
            if( wx.getStorageSync("openid") )
            {
                wx.switchTab({
                    url:'/pages/index/main'
                })
            }


            let a = this;

            //获得用户的sessionKey
            wx.login({
                success: function (res) {
                    if (res.code) {
                        wx.request({
                            url: globalStore.state.host + 'activity/common-info2',
                            data: {
                                code: res.code
                            },
                            success: function (requestRes) {
                                console.log(requestRes);
                                if (requestRes.data.status) {
                                    a.sessionKey = requestRes.data.data.session_key;
                                }

                            }
                        })
                    } else {
                        console.log('登录失败！' + res.errMsg)
                    }
                }
            });
        },
        computed:{
            btnGray:function()
            {
                if(this.n1.length && this.n2.length && this.n3.length && this.n4.length) {
                    return false;
                } else
                {
                    return true;
                }
            },
            smsCode:function () {
                let arr = [this.n1,this.n2,this.n3,this.n4];
                return arr.join("");
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

  .divi-4-p{padding: 0 6px;box-sizing:border-box;}

  .single-input-wrap
  {
      border-bottom: 1px solid #BFBFBF;padding-bottom: 8px;
  }
</style>