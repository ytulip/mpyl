<template>
  <div class="p16 bg-f9f9fb">
      <div class="address-panel p16" v-for="(item,index) in currentList" style="margin-bottom: 16px;position: relative;" v-on:click="chosenCoupon(index)" :data-id="item.id">


          <div style="width: 0;height: 0;border-style: solid;border-width: 24px 24px 0 0;border-color: #CE388E transparent transparent transparent;position: absolute;top:0;left: 0;" v-if="item.chosen"></div>

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


      <div style="margin-bottom: 100px;"></div>

      <div class="fix-bottom3" style="background-color: #ffffff;padding: 14px;border-top:1px solid #EBE9E9 ;">
          <a class="yl_btn1"  v-on:click="nextStep()" style="margin-top: 0;">确认使用</a>
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
                couponId:'',
                couponType:''
            }
        },
        created:function()
        {
        },
        methods: {
            initPage:function()
            {
                let url = globalStore.state.host + 'user/coupon-list';
                let requestData = {}
                Object.assign(requestData,{openid:param.getOpenid()});
                this.$http.get(url,requestData).then((res)=>{
                    this.list = res.data.data;
                }).catch(err=>{console.log(3)})
            },
            nextStep()
            {
                // this.layerFlag = 1;
                let activeCouponId = [];
                for( let i = 0; i < this.currentList.length; i++ )
                {
                    if( this.currentList[i].chosen )
                    {
                        activeCouponId.push(this.currentList[i].id);
                    }
                }
                console.log(activeCouponId);
                globalStore.commit("setChosenCoupon",activeCouponId);

                wx.navigateBack({
                    delta: 1
                })

            },
            cancelLayer()
            {
                this.layerFlag = 0;
            },
            chosenCoupon(id)
            {
                this.currentList[id].chosen = this.currentList[id].chosen?0:1;
                this.$forceUpdate();
                // globalStore.commit("setAddressShare",data);
                // wx.navigateBack({
                //     delta: 1
                // })
            }
        },
        onShow(){
          this.initPage();
        },
        mounted:function()
        {
            this.couponId = param.getParamValue('ids');
            this.couponType = param.getParamValue('product_id');
            this.initPage();
        },
        computed:{
            currentList()
            {

                let ids = this.couponId.split(',');
                console.log('选中');
                console.log(JSON.stringify(ids));

                var tmpList = [];
                for( var i=0; i < this.list.length; i++)
                {
                    if( this.list[i].coupon_type == this.couponType )
                    {
                        if( ids.indexOf(this.list[i].id.toString()) !== -1  )
                        {
                            this.list[i].chosen = 1;
                        }
                        tmpList.push(this.list[i]);
                    }
                }
                return tmpList;
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