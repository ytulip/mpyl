<template>
  <!--<web-view src="{{src}}" @message="bindmessage"></web-view>-->
  <div class="p-24-16 bg-f9f9fb">


    <div v-if="productType == 1">

    <div class="fs-18-fc-000000-m">查看订单</div>
    <div class="m-t-16 fs-14-fc-484848 f-f-r">服务时间:2019-02-28</div>

    <div  class="m-t-24" style="overflow: hidden;position: relative;margin-bottom: 16px;padding-left: 84px;box-sizing: border-box">


      <div style="position: absolute;width: 120px;height: 120px;border-radius: 4px;top:18px;left: 0;z-index: 99;overflow: hidden;">
        <image  :src="productImg" class="slide-image" style="width: 100%;height: 100%;"/>
      </div>


      <div class="info-panel">
        <div class="fs-18-fc-000000-m" style="line-height: 25px;">{{product.product_name}}</div>
        <div class="fs-14-fc-7E7E7E-r" style="margin-top: 10px;line-height: 16px;">{{product.sub_desc}}</div>
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


    <div v-if="productType == 2">
      <div class="fs-18-fc-000000-m">订餐服务</div>
      <div class="m-t-16 fs-14-fc-484848 f-f-r">服务时间:2019-02-28</div>


      <div  class="m-t-24" style="overflow: hidden;position: relative;margin-bottom: 16px;padding-left: 84px;box-sizing: border-box">


          <div style="position: absolute;width: 120px;height: 120px;border-radius: 4px;top:18px;left: 0;z-index: 99;overflow: hidden;">
              <image  :src="productImg" class="slide-image" style="width: 100%;height: 100%;"/>
          </div>


          <div class="info-panel" style="position: relative;">
              <div class="fs-18-fc-000000-m" style="line-height: 25px;">{{product.product_name}}</div>
              <div class="fs-14-fc-7E7E7E-r" style="margin-top: 10px;line-height: 16px;">{{product.sub_desc}}</div>

              <div class="" style="position: absolute;bottom: 18px;">
                <div class="fs-14-fc-484848 f-f-r" style="border: 1px solid #E1E1E1;border-radius: 16px;padding: 0 12px;line-height:32px ">历史记录</div>
              </div>
          </div>
      </div>

      <div class="fs-18-fc-000000-m m-t-24">菜单</div>

      <div class="m-t-24 p24-block" >
        <div class="fs-14-fc-2e3133-m">12月2日 周三</div>
        <div class="m-t-24">
          <div class="in-bl v-a-b">
            <img src=""/>
          </div>
          <div class="in-bl v-a-b">

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
                src:'',
                productType:0,
                product:{}
            }
        },
        created:function()
        {

        },
        methods: {
            pageInit()
            {
                let url = globalStore.state.host + '/user/order-detail-data';
                this.$http.get(url,{openid:param.getOpenid(),'order_id':param.getParamValue('id')}).then((res)=>{
                    // console.log(res);
                    // this.list = res.data.data;
                    this.order = res.data.data.order;
                    this.product = res.data.data.product;
                    this.productType = this.product.type;

                    //

                }).catch(err=>{
                    console.log(3)
                });
            }
        },
        mounted() {
            this.pageInit();
        },
        computed:{
            productImg()
            {
                if(this.product)
                {
                    return globalStore.state.host + this.product.cover_image;
                } else
                {
                    return '';
                }
            },
            remarkText()
            {
                let remark = '暂无备注';
                if( this.order )
                {
                    if ( this.order.remark ) return this.order.remark;
                }

                return remark;
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
</style>