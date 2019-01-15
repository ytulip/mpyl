<template>
    <div>
        <div style="border-top:1px solid #EBEAEA;background-color: #ffffff">
            <div class="cus-row cus-row-bborder" style="padding-left: 16px;">
                <div class="cus-row-col-3 t-al-l"><span class="fs-16-fc-212229" style="line-height: 46px;">手机号</span></div>
                <div class="cus-row-col-9">
                    <input class="fs-16-fc-212229" type="text" style="line-height: 46px;margin-bottom: 0;border: none;height: 46px;" placeholder="请输入手机号" name="phone"/>
                </div>
            </div>

            <div class="cus-row cus-row-bborder" style="padding-left: 16px;">
                <div class="cus-row-col-3 t-al-l"><span class="fs-16-fc-212229" style="line-height: 46px;">验证码</span></div>
                <div class="cus-row-col-6"><input name="register_sms_code" class="fs-16-fc-212229" type="text" style="line-height: 46px;margin-bottom: 0;border: none;height: 46px;" placeholder="请输入验证码" name="register_sms_code"/></div>
                <div class="cus-row-col-3"><a class="get-code-btn" href="javascript:void(0)"><span class="lms-link-1" style="display: inline-block;line-height: 44px;">获取验证码</span></a></div>
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
                    openid:param.getOpenid()
                }).then((res)=>{
                    if(res.data.status)
                    {
                        wx.redirectTo(
                            {
                                url:''
                            }
                        );
                    } else {
                        console.log(res.data.desc);
                        a.$mptoast(res.data.desc)
                    }
                }).catch(err=>{console.log(4)})
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