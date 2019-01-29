<template>
  <div class="p16">


    <div class="address-panel" style="padding: 0 16px;">

      <div class="input-line">
        <input placeholder="输入收货人姓名" class="fs-16-fc-000000-m">
      </div>


      <div class="input-line">
        <input placeholder="输入收货人手机号码" class="fs-16-fc-000000-m">
      </div>


      <div class="input-line">

      </div>

      <div class="input-line" style="border-bottom: none;">
        <input placeholder="详细地址：如街道、门牌号" class="fs-16-fc-000000-m">
      </div>

    </div>

    <div class="address-panel m-t-16 p16">
      <div class="cus-row">
        <div class="cus-row-col-6 fs-16-fc-000000-m v-a-m">设置为默认地址</div>
        <div class="cus-row-col-6 v-a-m t-al-r">
          <div class="in-bl v-a-m">关</div>
          <div class="in-bl v-a-m"><image src="/static/images/icon_Off@3x.png" style="width:51px;height: 31px;margin-left: 12px;"/></div>
        </div>
      </div>
    </div>


    <div class="fix-bottom3" style="background-color: #ffffff;padding: 14px;border-top:1px solid #EBE9E9 ;">
      <a class="yl_btn1"  v-on:click="nextStep()" style="margin-top: 0;">保存</a>
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
            userInit () {
                let url = globalStore.state.host + 'index/home-main';
                let param = {code:1}
                Object.assign(param,{openid:this.openid});
                this.$http.get(url,param).then((res)=>{
                    console.log(res);
                    this.banners = res.data.banners;
                }).catch(err=>{console.log(3)})
            }
        },
        mounted() {
            this.src = globalStore.state.host + 'user/add-mod-address?&openid=' +wx.getStorageSync('openid');
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

  .input-line{
    padding: 20px 0;
    border-bottom: 1px solid #E1E1E1;
  }
</style>