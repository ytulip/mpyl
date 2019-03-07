<template>
  <div class="p16 bg-f9f9fb">

    <div class="common-panel p-16-24">
      <div class="cus-row">
        <div class="cus-row-col-6 v-a-m fs-18-fc-000000-m">订购服务</div>
        <div class="cus-row-col-6 v-a-m fs-14-fc-c50081-m">订单进行中</div>
      </div>

      <div class="cus-row m-t-24">
        <div class="in-bl v-a-t food-icon-img">
          <image :src="visitCoverImage" class="slide-image" style="width: 100%;height: 100%;"/>
        </div>
        <div class="v-a-t in-bl m-l-24">
          <div class="fs-16-fc-000000-m">{{product.product_name}}</div>
          <div class="m-t-10"><span class="fs-14-fc-c50081-m">￥{{product.price}}</span><span class="fs-14-fc-7e7e7e-r"> ×{{quantity}}份 ×{{days}}天</span></div>
        </div>
      </div>


      <div class="barr-line"></div>
      <div class="cus-row">
        <div class="cus-row-col-6 v-a-m">
          <div class="fs-16-fc-000000-m">订餐份数</div>
          <div class="fs-14-fc-7e7e7e-r m-t-6">1份餐仅供一人</div>
        </div>
        <div class="cus-row-col-6 v-a-m t-al-r">
          <div class="in-bl v-a-m quantity-plus-icon" v-on:click="deQuantity"><image src="/static/images/tarbar/icon_out_nor@3x.png" class="quantity-plus-icon"/></div>
          <div class="in-bl v-a-m" style="margin: 0 30px;"><div class="quantity-plus">    {{quantity}}    </div></div>
          <div class="in-bl v-a-m quantity-plus-icon" v-on:click="addQuantity"><image src="/static/images/tarbar/icon_add_nor@3x.png" class="quantity-plus-icon"/></div>
        </div>
      </div>

      <div class="barr-line"></div>


      <div class="cus-row">
        <div class="cus-row-col-6 v-a-m">
          <div class="fs-16-fc-000000-m">订餐份数</div>
          <div class="fs-14-fc-7e7e7e-r m-t-6">1份餐仅供一人</div>
        </div>
        <div class="cus-row-col-6 v-a-m t-al-r">
          <div class="in-bl v-a-m quantity-plus-icon" v-on:click="deQuantity"><image src="/static/images/tarbar/icon_out_nor@3x.png" class="quantity-plus-icon"/></div>
          <div class="in-bl v-a-m" style="margin: 0 30px;"><div class="quantity-plus">    {{quantity}}    </div></div>
          <div class="in-bl v-a-m quantity-plus-icon" v-on:click="addQuantity"><image src="/static/images/tarbar/icon_add_nor@3x.png" class="quantity-plus-icon"/></div>
        </div>
      </div>

    </div>

    <!--配送地址-->
    <div class="common-panel p-16-24 m-t-16">
      <div class="cus-row">
        <div class="cus-row-col-6 v-a-m">
          <span class="fs-18-fc-000000-m in-bl" style="line-height: 25px;">配送地址</span>
        </div>
        <div class="cus-row-col-6 v-a-m t-al-r">
        </div>
      </div>

      <div class="m-t-16">
        <div class="fs-16-fc-000000-m in-bl" style="line-height: 22px;">{{order.address_name}}  {{order.address_phone}}</div>

        <div class="fs-14-fc-7e7e7e-r" style="margin-top: 8px;">{{order.address}}</div>
      </div>
    </div>



    <div class="common-panel m-t-16 p-16-24">

      <div class="cus-row">
        <div class="cus-row-col-6 fs-16-fc-7E7E7E-r">代金券</div>
        <div class="cus-row-col-6 fs-16-fc-000000-m">{{order.id}}</div>
      </div>

      <div class="barr-line"></div>

      <div class="cus-row">
        <div class="cus-row-col-6 fs-16-fc-7E7E7E-r">花甲会员优惠</div>
        <div class="cus-row-col-6 fs-16-fc-000000-m">{{order.created_at}}</div>
      </div>

      <div class="barr-line"></div>

      <div class="cus-row">
        <div class="cus-row-col-6 fs-16-fc-000000-m">合计￥165元</div>
      </div>

    </div>



    <div class="fs-18-fc-000000-m m-t-16">订单信息</div>

    <div class="common-panel m-t-16 p-16-24">

      <div class="cus-row">
        <div class="cus-row-col-6 fs-16-fc-7E7E7E-r">订单号码</div>
        <div class="cus-row-col-6 fs-16-fc-000000-m">{{order.id}}</div>
      </div>

      <div class="barr-line"></div>

      <div class="cus-row">
        <div class="cus-row-col-6 fs-16-fc-7E7E7E-r">下单时间</div>
        <div class="cus-row-col-6 fs-16-fc-000000-m">{{order.created_at}}</div>
      </div>

      <div class="barr-line"></div>

      <div class="cus-row">
        <div class="cus-row-col-6 fs-16-fc-7E7E7E-r">支付方式</div>
        <div class="cus-row-col-6 fs-16-fc-000000-m">微信支付</div>
      </div>

    </div>


  </div>
</template>

<script>
    import globalStore from '../../stores/global-store'
    import param from "../../utils/param";


    export default {
        data () {
            return {
                msg: 'Hello',
                banners:{},
                src:'',
                list:[],
                id:'',
                productType:0,
                product:{},
                res:[],
                host:globalStore.state.host,
                layerFlag:0,
                order:{}
            }
        },
        created:function()
        {

        },
        methods: {
           pageInit(){
               let url = globalStore.state.host + '/user/order-detail-data';
               this.$http.get(url,{openid:param.getOpenid(),order_id:this.id}).then((res)=>{
                   // console.log(res);
                   // this.list = res.data.data;
                   this.order = res.data.data.order;
                   this.product = res.data.data.product;
                   this.productType = this.product.type;


               }).catch(err=>{console.log(3)});
           },
            goDetail(id){
               console.log(id);
               wx.navigateTo(
                   {
                       url:'/pages/billdetail/main?id=' + id
                   }
               );
            }
        },
        onShow(){
            this.pageInit();
        },
        mounted() {
            // this.src = globalStore.state.host + 'user/my-services?&openid=' +wx.getStorageSync('openid');
            this.id = param.getParamValue('id');
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

  .bill-panel{background: #FFFFFF;
    box-shadow: 0 2px 6px 0 #E7E9F0;
    border-radius: 5px;padding: 16px;}
</style>