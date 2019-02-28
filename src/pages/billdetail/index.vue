<template>
  <!--<web-view src="{{src}}" @message="bindmessage"></web-view>-->
  <div class="p-24-16 bg-f9f9fb">


    <div v-if="productType == 1">

    <div class="fs-18-fc-000000-m">查看订单</div>
    <div class="m-t-16 fs-14-fc-484848 f-f-r">服务时间:2019-02-28</div>

    <div  class="m-t-24" style="overflow: hidden;position: relative;margin-bottom: 16px;padding-left: 84px;box-sizing: border-box">


      <div style="position: absolute;width: 120px;height: 120px;border-radius: 4px;top:18px;left: 0;z-index: 99;overflow: hidden;">
        <image class="slide-image" style="width: 100%;height: 100%;"/>
      </div>


      <div class="info-panel">
        <div class="fs-18-fc-000000-m" style="line-height: 25px;"></div>
        <div class="fs-14-fc-7E7E7E-r" style="margin-top: 10px;line-height: 16px;"></div>
      </div>
      <!--<div style="position: absolute;top:0;left: 0;right: 0;z-index: 99;" class="fs-24-fc-ffffff-b">{{item.product_name}}</div>-->
      <!--<div style="position: absolute;bottom: 0;left: 0;right: 0;z-index: 99;" class="fs-16-fc-ffffff">{{item.sub_desc}}</div>-->
    </div>


    <div class="common-panel m-t-24 p-16-24">
      <div class="fs-18-fc-000000-m">服务地址</div>
      <div class="fs-14-fc-7E7E7E-r m-t-20" style="margin-top: 10px;line-height: 16px;"></div>
    </div>

    <div class="common-panel m-t-24 p-16-24">
      <div class="fs-18-fc-000000-m">服务时长</div>
      <div class="fs-14-fc-7E7E7E-r m-t-20" style="margin-top: 10px;line-height: 16px;"></div>
    </div>

    <div class="common-panel m-t-24 p-16-24">
      <div class="fs-18-fc-000000-m">服务备注</div>
      <div class="fs-14-fc-7E7E7E-r m-t-20" style="margin-top: 10px;line-height: 16px;"></div>
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
                src:'',
                productType:0
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
            },
            bindmessage(e){
                console.log(e.target.data)
                globalStore.commit("setAddressShare",e.target.data[0]);
            }
        },
        mounted() {
            this.src = globalStore.state.host + 'user/clean-or-food-order-detail?id='+param.getParamValue('id')+'&openid=' +wx.getStorageSync('openid');
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