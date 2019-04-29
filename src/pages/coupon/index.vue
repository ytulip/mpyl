<template>
  <div class="p16 bg-f9f9fb">
      <div class="address-panel p16" v-for="(item,index) in list" style="margin-bottom: 16px;">
          <div class="cus-row">
              <div class="cus-row-col-6 fs-16-fc-000000-m">
                  {{item.type_text}}
              </div>
              <div class="cus-row-col-6 t-al-r "></div>
          </div>
          <div class="cus-row" style="margin-top: 10px;">
              <div class="cus-row-col-6 fs-14-fc-7E7E7E-r">有效期至：{{item.expire_at}}</div>
          </div>
      </div>

      <div class="fix-bottom3" v-bind:class="{isIpx:isIpx}" style="background-color: #ffffff;padding: 14px;border-top:1px solid #EBE9E9 ;">
          <a class="yl_btn1"  v-on:click="nextStep()" style="margin-top: 0;">兑换代金券</a>
      </div>


      <div class="layer-shadow" v-if="layerFlag">
          <div class="layer-center" style="padding: 24px;">
              <div class="f-f-m t-al-c" style="border-bottom:  1px solid #E1E1E1;">
                    <input class="fs-18-fc-2E3133" style="padding: 20px 0;" />
              </div>

              <div class="cus-row" style="margin-top: 34px;">
                  <div class="cus-row-col-6">
                      <a class="yl_btn1 btn-none" v-on:click="cancelLayer">取消</a>
                  </div>
                  <div class="cus-row-col-6">
                      <a class="yl_btn1">确定</a>
                  </div>
              </div>
          </div>
      </div>

      <div style="margin-bottom: 100px;"></div>

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
                list:[],
                layerFlag:0,
                isIpx:''
            }
        },
        created:function()
        {
        },
        methods: {
            initPage:function()
            {

                this.isIpx = globalStore.state.isIpx;

                let url = globalStore.state.host + 'user/coupon-list';
                let requestData = {}
                Object.assign(requestData,{openid:param.getOpenid()});
                this.$http.get(url,requestData).then((res)=>{
                    this.list = res.data.data;
                }).catch(err=>{console.log(3)})
            },
            nextStep()
            {
                this.layerFlag = 1;
            },
            cancelLayer()
            {
                this.layerFlag = 0;
            }
        },
        mounted:function()
        {
            this.initPage();
        }
    }
</script>

<style scoped>
  .message {
    color: red;
    padding: 10px;
    text-align: center;
  }

  .slide-image
  {
    width: 100%;
    border-radius: 4px;
  }

  .food-panel{
    background-image: linear-gradient(-153deg, #CE388E 9%, #A30182 100%);
    box-shadow: 0 2px 8px 0 rgba(191,25,132,0.34);
    border-radius: 5px;
    height: 166px;
    position: relative;
  }

  .clean-panel
  {
    background-image: linear-gradient(-135deg, #FC9F23 0%, #F76B1C 100%);
    box-shadow: 0 2px 8px 0 rgba(248,125,39,0.36);
    border-radius: 5px;
    height: 75px;
    position: relative;
  }
  .hood-panel
  {
    background-image: linear-gradient(29deg, #267EFF 3%, #34A0FA 100%);
    box-shadow: 0 2px 8px 0 rgba(51,158,251,0.35);
    border-radius: 5px;
    height: 75px;
    position: relative;
  }

  .vip-panel
  {
      background: #FFFFFF;
      border: 1px solid #F3F3F3;
      border-radius: 4px;
      padding: 26px 24px;
      position: relative;
  }

  .item-fc
  {
    font-family: PingFangSC-Medium;
    font-size: 18px;
    color: #FFFFFF;
    line-height: 25px;
    padding-left: 25px;
    padding-top: 25px;
  }
</style>