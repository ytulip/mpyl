<template>

    <div class="p-lr-48">
        <div class="m-t-45 fs-24-fc-000000">验证码已发送至</div>
        <div class="m-t-24">
            <div class="cus-row">
                <div class="cus-row-col-8 v-a-m fs-12-fc-4a4a4a f-f-m l-h-24">{{phone}}</div>
                <div class="cus-row-col-4 t-al-r v-a-m fs-16-fc-c50081 f-f-m" v-on:click="sendSms">{{smsText}}</div>
            </div>
        </div>

        <div class="cus-row m-t-40" style="margin-left: -6px;margin-right: -6px;">
            <div class="cus-row-col-3 divi-4-p">
                <div class="single-input-wrap">
                    <input  class="cus-input fs-18-fc-2E3133 t-al-c" v-model="n1" type="number" maxlength="4"/>
                </div>
            </div>
            <div class="cus-row-col-3 divi-4-p">
                <div class="single-input-wrap">
                    <input  class="cus-input fs-18-fc-2E3133 t-al-c" v-model="n2" type="number" maxlength="1"/>
                </div>
            </div>
            <div class="cus-row-col-3 divi-4-p">
                <div class="single-input-wrap">
                    <input  class="cus-input fs-18-fc-2E3133 t-al-c" v-model="n3" type="number" maxlength="1"/>
                </div>
            </div>
            <div class="cus-row-col-3 divi-4-p">
                <div class="single-input-wrap">
                    <input  class="cus-input fs-18-fc-2E3133 t-al-c" v-model="n4" type="number" maxlength="1"/>
                </div>
            </div>
        </div>


        <div class="m-t-40"><a class="yl_btn1" v-on:click="goSms" v-bind:class="{ 'btn-gray': (btnGray) }">确定</a></div>

        <div class="m-t-24">
            <div class=""><span class="fs-12-fc-4a4a4a f-f-r l-h-17">点击确定，即表示已阅读并同意</span><span class="fs-12-fc-c50081 f-f-r l-h-17">《用户服务条款》</span></div>
        </div>
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
                n4:''
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
                  console.log(val);
                  // console.log('失去焦點');
                  // if(val.)
              }
          }
        },
        methods: {
            goSms:function()
            {
                if(!this.btnGray) {
                    wx.navigateTo(
                        {
                            url: '/pages/sms/main?phone' + this.phone
                        }
                    );
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
                var a = this;
                this.$http.post(globalStore.state.host + 'passport/register',{
                    openid:param.getOpenid(),
                    phone:this.phone,
                    register_sms_code:this.smsCode
                }).then((res)=>{
                    if(res.data.status)
                    {
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
            }
        },
        mounted() {
            this.phone = param.getParamValue('phone');
            this.sendSms();
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