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
            <div class="cus-row-col-12 divi-4-p">
                <div class="single-input-wrap">
                    <input  class="cus-input fs-32-fc-2E3133 t-al-c" style="line-height: 49px !important;height: 32px;" v-model="n1" type="number" maxlength="4"/>
                </div>
            </div>
        </div>


        <div class="m-t-40"><a class="yl_btn1" v-on:click="submit" v-bind:class="{ 'btn-gray': (btnGray) }">确定</a></div>

        <mptoast />

    </div>
</template>

<script>
    import globalStore from '../../stores/global-store'
    import param from '../../utils/param'
    import mptoast from 'mptoast'
    import { Base64 } from 'js-base64'

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
            n1ss:function(val){
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

                let requestData =  {type:3,phone:this.phone,register_sms_code:this.smsCode};
                let a = this;

                param.commonRequest(
                    {
                        url:globalStore.state.host + '/user/edit-user',
                        page:this,
                        data:requestData,
                        success:function(res)
                        {
                            if(res.status)
                            {
                                wx.navigateBack({
                                    delta: 2
                                })

                            }else{
                                a.$mptoast(res.desc);
                            }
                        },
                        error:function () {

                        }
                    }
                );
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
            goProtocol(){
                let url = Base64.encode('/passport/show-essay?id=4');
                wx.navigateTo(
                    {
                        url:'/pages/commonweb/main?url=' + url,
                    }
                );
            }
        },
        mounted() {
            this.phone = param.getParamValue('phone');
            this.sendSms();
        },
        computed:{
            btnGray:function()
            {
                if( this.n1.length == 4)
                {
                    return false;
                } else {
                    return true;
                }
                // if(this.n1.length && this.n2.length && this.n3.length && this.n4.length) {
                //     return false;
                // } else
                // {
                //     return true;
                // }
            },
            smsCode:function () {
                return this.n1;
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