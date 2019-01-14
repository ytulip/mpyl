<template>
    <div>

    </div>
</template>

<script>
    import globalStore from '../../stores/global-store'
    import param from '../../utils/param'

    export default {
        data () {
            return {
            }
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
                    // console.log(res.data.data);
                    // this.banners = res.data.data.banners;
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