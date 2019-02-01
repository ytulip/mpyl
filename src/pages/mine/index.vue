<template>
  <div>



    <div class="" style="background-color: #ffffff;padding: 25px 24px;border-bottom: 1px solid #F3F3F3;">
      <navigator  class="cus-row" open-type="navigate" url="/pages/info/main"  hover-class="none">
        <div class="cus-row-col-6 fs-18-fc-2E3133 f-f-m v-a-m" style="">用户登录</div>
        <div class="cus-row-col-6 v-a-m t-al-r">
          <image class="v-a-m in-bl" src="/static/images/user_pic_nor@3x.png" mode="widthFix" style="width:60px;height: 60px"></image>
          <image class="v-a-m in-bl" src="/static/images/icon_bnext_nor@3x.png" mode="widthFix" style="width:8px;height: 13px;margin-left: 8px;"></image>
        </div>
      </navigator>
    </div>


    <div style="padding: 0 16px;">
    <div class="flower-bg m-t-10">
        <div class="cus-row">
          <div class="cus-row-col-6 fs-16-fc-ffffff f-f-m v-a-m" style="line-height: 24px;">花甲会员· ¥60/月</div>
          <div class="cus-row-col-6 v-a-m t-al-r">
            <span class="fs-12-fc-ffffff f-f-r in-bl v-a-m">更多优惠，服务更多！</span>
            <image class="v-a-m in-bl" src="/static/images/user_icon_next_nor@3x.png" mode="widthFix" style="width:8px;height: 13px;margin-left: 8px;"></image>
          </div>
        </div>
    </div>

    <view  class="mine-list m-t-16">
      <navigator open-type="navigate" url="/pages/mine/invited_code_list"  hover-class="none" style="padding: 19px 16px;">
        <view class="cus-row">
          <view class="cus-row-col-10 fs-16-fc-000000-m v-a-m">我的订单</view>
          <view class="cus-row-col-2 t-al-r v-a-m">
            <image src="/static/images/icon_bnext_nor@3x.png" mode="widthFix" style="width:8px;height: 13px;"></image>
          </view>
        </view>
      </navigator>

      <navigator open-type="navigate" url="/pages/address/main" hover-class="none"   style="padding: 19px 16px;">
        <view class="cus-row">
          <view class="cus-row-col-10 fs-16-fc-000000-m v-a-m">我的地址</view>
          <view class="cus-row-col-2 t-al-r v-a-m">
            <image src="/static/images/icon_bnext_nor@3x.png" mode="widthFix" style="width:8px;height: 13px;"></image>
          </view>
        </view>
      </navigator>

      <navigator open-type="navigate" url="/pages/bonus/main"  hover-class="none"  style="padding: 19px 16px;">
        <view class="cus-row">
          <view class="cus-row-col-10 fs-16-fc-000000-m v-a-m">我的红包</view>
          <view class="cus-row-col-2 t-al-r v-a-m">
            <image src="/static/images/icon_bnext_nor@3x.png" mode="widthFix" style="width:8px;height: 13px;"></image>
          </view>
        </view>
      </navigator>


      <navigator open-type="navigate" url="/pages/coupon/main" hover-class="none" style="padding: 19px 16px;">
        <view class="cus-row">
          <view class="cus-row-col-10 fs-16-fc-000000-m v-a-m">优惠券</view>
          <view class="cus-row-col-2 t-al-r v-a-m">
            <image src="/static/images/icon_bnext_nor@3x.png" mode="widthFix" style="width:8px;height: 13px;"></image>
          </view>
        </view>
      </navigator>

    </view>
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
            this.src = globalStore.state.host + 'user/my-services?&openid=' +wx.getStorageSync('openid');
        }
    }
</script>

<style scoped>
  .message {
    color: red;
    padding: 10px;
    text-align: center;
  }

  .flower-bg{
    background-image: linear-gradient(-153deg, #CE388E 9%, #A30182 100%);
    box-shadow: 0 2px 8px 0 rgba(191,25,132,0.34);
    border-radius: 5px;
    padding: 19px 16px;
  }
</style>