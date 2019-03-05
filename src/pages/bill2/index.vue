<template>
  <div class="p16 bg-f9f9fb">
    <div class="bill-panel m-b-16" v-for="(item,index) in list" v-on:click="goDetail(item.id)">
      <div class="row">
        <div class="cus-row-col-6 v-a-m">
          <img src="/static/images/food_icon@3x.png" class="in-bl v-a-m" style="width: 24px;height: 24px" v-if="item.type != 1"/>
          <img src="/static/images/clean_icon@3x.png" class="in-bl v-a-m" style="width: 24px;height: 24px" v-else/>
          <div class="cus-row-col-6 fs-14-fc-484848 f-f-r v-a-m" style="margin-left:8px; " ><span v-if="item.type != 1">订餐服务</span><span v-else>家庭清洁</span></div>
        </div>
        <div class="cus-row-col-6 fs-14-fc-c50081-m t-al-r v-a-m f-f-r" v-if="item.days_count">
          订单进行中
        </div>
      <div class="cus-row-col-6 t-al-r v-a-m fs-14-fc-7E7E7E-r" v-else>
        已完成
      </div>
      </div>

      <div class="m-t-20">
        <div class="in-bl fs-18-fc-000000-m v-a-m">{{item.product_name}}</div>
      </div>

      <div class="cus-row m-t-10">
        <div class="cus-row-col-6 v-a-m fs-14-fc-7E7E7E-r">购买</div>
        <div class="cus-row-col-6 v-a-m fs-16-fc-000000-m">￥</div>
      </div>

      <!--<div class="fs-14-fc-7E7E7E-r m-t-10">服务时间：2018年12月30日（明天）</div>-->

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
                list:[]
            }
        },
        created:function()
        {

        },
        methods: {
           pageInit(){
               let url = globalStore.state.host + '/user/user-order2';
               this.$http.get(url,{openid:param.getOpenid()}).then((res)=>{
                   console.log(res);
                   this.list = res.data.data;
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