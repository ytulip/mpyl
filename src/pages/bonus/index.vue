<template>
  <div class="p16 bg-f9f9fb">
      <div class="address-panel p16" v-for="(item,index) in list" style="margin-bottom: 16px;">
          <div class="cus-row">
              <div class="cus-row-col-6 fs-16-fc-000000-m">
                    健康餐红包
              </div>
              <div class="cus-row-col-6 t-al-r ">
                 <span class="fs-14-fc-000033-m">￥</span><span class="fs-18-fc-000033-m" style="font-size: 28px;">18.5</span></div>
          </div>
          <div class="cus-row" style="margin-top: 10px;">
              <div class="cus-row-col-6 fs-14-fc-7E7E7E-r">有效期至：2019.08.01</div>
              <div class="cus-row-col-6 fs-14-fc-7E7E7E-r t-al-r">满40可用</div>
          </div>
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
                list:[{},{}]
            }
        },
        created:function()
        {
        },
        methods: {
            initPage:function()
            {

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