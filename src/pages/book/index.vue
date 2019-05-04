<template>
  <div class="p16 bg-f9f9fb">
    <div class="bill-panel m-b-16" v-for="(item,index) in list" v-on:click="goDetail(item.id)" v-if="list.length">
      <div class="row">
        <div class="cus-row-col-6">
          <img src="/static/images/food_icon@3x.png" class="in-bl v-a-m" style="width: 24px;height: 24px" v-if="item.type != 1"/>
          <img src="/static/images/clean_icon@3x.png" class="in-bl v-a-m" style="width: 24px;height: 24px" v-else/>
          <div class="cus-row-col-6 fs-14-fc-484848 f-f-r v-a-m" style="margin-left:8px; " ><span v-if="item.type != 1">订餐服务</span><span v-else>家庭清洁</span></div>
        </div>
        <div class="cus-row-col-6 t-al-r v-a-m">
          <div class="l-btn-red2" v-if="item.is_vip">花甲会员</div>
        </div>
      </div>

      <div class="m-t-20">
        <div class="in-bl fs-18-fc-000000-m v-a-m">{{item.product_name}}</div>
        <div class="in-bl fs-14-fc-484848 f-f-r v-a-m" style="margin-left: 16px;" v-if="item.type != 1">剩余天数 {{item.days_count}}/{{item.days}}天</div>
      </div>

      <div class="fs-14-fc-7E7E7E-r m-t-10" v-if="item.type == 1">服务时间：{{item.service_start_time_format}}</div>
      <div class="fs-14-fc-7E7E7E-r m-t-10" v-else>服务时间：{{item.service_start_time_format}}</div>

    </div>

    <div v-if="!list.length" style="margin-top: 56px;">
      <div class="t-al-c">
        <image src="/static/images/home_icon_home_nor@3x.png" style="width: 52px;height: 52px;opacity: 0.33;"/>
        <div class="fs-14-fc-7e7e7e-r m-t-24">暂无订单，赶紧下单吧！</div>
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
                list:[]
            }
        },
        created:function()
        {

        },
        methods: {
           pageInit(){
               let url = globalStore.state.host + '/user/user-order';
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
            if( !param.getOpenid() )
            {
                wx.navigateTo({
                    url:"/pages/login/main"
                })
                return;
            }
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