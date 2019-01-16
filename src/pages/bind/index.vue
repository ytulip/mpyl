<template>
    <div>
        <div style="border-top:1px solid #EBEAEA;background-color: #ffffff">
            <div class="cus-row cus-row-bborder" style="padding-left: 16px;">
                <div class="cus-row-col-3 t-al-l"><span class="fs-16-fc-212229" style="line-height: 46px;">手机号</span></div>
                <div class="cus-row-col-9">
                    <input class="fs-16-fc-212229" type="text" style="line-height: 46px;margin-bottom: 0;border: none;height: 46px;" placeholder="请输入手机号" name="phone" v-model="phone"/>
                </div>
            </div>

            <div class="cus-row cus-row-bborder" style="padding-left: 16px;">
                <div class="cus-row-col-3 t-al-l"><span class="fs-16-fc-212229" style="line-height: 46px;">验证码</span></div>
                <div class="cus-row-col-6"><input name="register_sms_code" class="fs-16-fc-212229" type="text" style="line-height: 46px;margin-bottom: 0;border: none;height: 46px;" placeholder="请输入验证码" v-model="smsCode"/></div>
                <div class="cus-row-col-3"><a class="get-code-btn" v-on:click="sendSms"><span class="lms-link-1" style="display: inline-block;line-height: 44px;">{{smsText}}</span></a></div>
            </div>
        </div>

        <div style="border-top:1px solid #EBEAEA;padding: 24px 28px;">
            <a class="btn-block1" v-on:click="submit" id="next_step">提交申请</a>
        </div>

        <mptoast />
    </div>
</template>

<script>
    import globalStore from '../../stores/global-store'
    import param from '../../utils/param'
    import mptoast from 'mptoast'

    export default {
        data () {
            return {
                phone:'',
                second:0,
                smsText:'获取验证码',
                smsCode:''
            }
        },
        components: {
            mptoast
        },
        created:function()
        {

        },
        methods: {
            pageInit(){
                //判断用户是否绑定了手机号
                this.$http.get(globalStore.state.host + 'user/vip-page-info',{
                    openid:param.getOpenid()
                }).then((res)=>{
                    if(res.data.status)
                    {
                        if( res.data.data.user.phone )
                        {
                            wx.redirectTo({
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



//                $.post('/passport/register-sms',{phone:$('input[name="phone"]').val()},function(data){
//                    if(data.status) {
//                        mAlert('发送成功');
//                    } else {
//                        mAlert(data.desc);
//                    }
//                },'json').error(function(){
//                    alert('网络异常！');
//                });
            }
        },
        mounted() {
            var a = this;
            if(wx.getStorageSync('openid'))
            {
                this.pageInit();
            } else {
                wx.login({
                    success: function (res) {
                        if (res.code) {
                            //发起网络请求
                            console.log(res.code);
                            wx.request({
                                url: 'http://yl.zhuyan.me/' + 'activity/common-info2',
                                data: {
                                    code: res.code
                                },
                                success: function (requestRes) {
                                    console.log(requestRes);
                                    //存储openid
                                    if (requestRes.data.status) {
                                        wx.setStorageSync('openid', requestRes.data.data.openid);
                                        a.pageInit();
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
        computed:{

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