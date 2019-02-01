<template>
    <div class="p16">


        <div v-for="(item,index) in list" style="margin-bottom: 16px;" class="address-panel p16">
            <div class="fs-16-fc-000000-m">
               <span class="l-btn-red2 in-bl" v-if="item.is_default">
                   默认
               </span> <span class="in-bl" style="margin-left: 8px;">{{item.pct_code_name}} {{item.address}}</span>
            </div>

            <div class="fs-14-fc-7E7E7E-r m-t-10">
                <span>{{item.address_name}}</span><span style="margin-left: 8px">{{item.mobile}}</span>
            </div>
        </div>

        <div class="fix-bottom3" style="background-color: #ffffff;padding: 14px;border-top:1px solid #EBE9E9 ;">
            <a class="yl_btn1"  v-on:click="nextStep()" style="margin-top: 0;">新增地址</a>
        </div>
    </div>
</template>

<script>
    import globalStore from '../../stores/global-store'



    export default {
        data () {
            return {
                msg: 'Hello',
                list:{},
                src:''
            }
        },
        created:function()
        {

        },
        methods: {
            clickHandle () {
                let url = 'http://yl.zhuyan.me/activity/user-info'
                let param = {code:1}
                //网络请求
                this.$http.get(url,param).then((res)=>{}).catch(err=>{console.log(3)});
                this.msg = 'Clicked!!!!!!'
            },
            bindmessage(e){
                console.log(e.target.data)
                globalStore.commit("setAddressShare",e.target.data[0]);
            },
            pageInit()
            {
                let url = globalStore.state.host + 'user/address-data';
                let param = {};
                Object.assign(param,{openid:wx.getStorageSync('openid')});
                this.$http.get(url,param).then((res)=>{
                    console.log(res);
                    this.list = res.data.data;
                }).catch(err=>{console.log(3)})
            },
            nextStep:function()
            {
                wx.navigateTo(
                    {
                        url:'/pages/editaddress/main'
                    }
                )
            }
        },
        mounted() {
            // this.src = globalStore.state.host + 'user/addresses?&openid=' +wx.getStorageSync('openid');
            this.pageInit();
        }
    }
</script>

<style scoped>
  .message {
    color: red;
    padding: 10px;
    text-align: center;
  }

  .address-panel
  {
      background: #FFFFFF;
      box-shadow: 0 2px 6px 0 #E7E9F0;
      border-radius: 5px;
      position: relative;
  }


  .l-btn-red2{
      border: 1px solid #C50081;
      border-radius: 17px;
      line-height: 20px;
      box-sizing: border-box;
      padding: 0 8px;
      font-family: PingFangSC-Medium;
      font-size: 14px;
      color: #C50081;
      letter-spacing: -0.27px;
      display: inline-block;
  }
</style>