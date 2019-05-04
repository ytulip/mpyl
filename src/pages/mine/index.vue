<template>
  <div>



    <div class="" style="background-color: #ffffff;padding: 25px 24px;border-bottom: 1px solid #F3F3F3;">
      <div  class="cus-row" open-type="navigate" url="/pages/info/main"  hover-class="none" @click="authThenGo('/pages/info/main')">

        <div class="cus-row-col-6 fs-18-fc-2E3133 f-f-m v-a-m" style="" v-if="isAuth">
          <div> <span class="v-a-m in-bl">{{user.real_name}}</span> <span class="l-btn-red2 v-a-m in-bl" style="margin-left: 12px;" v-if="isVip">花甲会员</span></div>
          <div class="fs-14-fc-7E7E7E-r m-t-10">{{age}}岁</div>
        </div>

        <div class="cus-row-col-6 fs-18-fc-2E3133 f-f-m v-a-m" style="" v-else>
          请登录
        </div>


        <div class="cus-row-col-6 v-a-m t-al-r" v-if="isAuth">
          <image class="v-a-m in-bl" :src="headImg"  style="width:60px;height: 60px;border-radius: 60px;"></image>
          <image class="v-a-m in-bl" src="/static/images/icon_bnext_nor@3x.png" mode="widthFix" style="width:8px;height: 13px;margin-left: 8px;"></image>
        </div>

        <div class="cus-row-col-6 v-a-m t-al-r" v-else>
          <image class="v-a-m in-bl" src="/static/images/icon_user@3x.png"  style="width:60px;height: 60px;border-radius: 60px;"></image>
          <image class="v-a-m in-bl" src="/static/images/icon_bnext_nor@3x.png" mode="widthFix" style="width:8px;height: 13px;margin-left: 8px;"></image>
        </div>

      </div>
    </div>


    <div style="padding: 0 16px;">
    <div class="m-t-10" style="position: relative;"  @click="authThenGo('/pages/vip/main')">

       <img src="https://huajialife.com/images/icon_bg_nor@3x.png" style="width: 100%;" mode="widthFix" />

      <div style="position: absolute;top:50%;left: 0;right: 0;transform: translateY(-50%)">
        <div class="cus-row" style="padding: 0 4%;">
          <div class="cus-row-col-6 fs-16-fc-ffffff f-f-m v-a-m" style="line-height: 24px;">{{isVip?'会员福利':'花甲会员· ¥60/月'}} </div>
          <div class="cus-row-col-6 v-a-m t-al-r">
            <span class="fs-12-fc-ffffff f-f-r in-bl v-a-m">{{isVip?(user.expire_time + '到期'):'更多优惠，服务更多！'}}</span>
            <image class="v-a-m in-bl" src="/static/images/user_icon_next_nor@3x.png" mode="widthFix" style="width:8px;height: 13px;margin-left: 8px;"></image>
          </div>
        </div>
      </div>
    </div>

    <view  class="mine-list m-t-16">
      <div open-type="navigate" url="/pages/bill2/main"  hover-class="none" style="padding: 19px 16px;" @click="authThenGo('/pages/bill2/main')">
        <view class="cus-row">
          <view class="cus-row-col-10 fs-16-fc-000000-m v-a-m">我的订单</view>
          <view class="cus-row-col-2 t-al-r v-a-m">
            <image src="/static/images/icon_bnext_nor@3x.png" mode="widthFix" style="width:8px;height: 13px;"></image>
          </view>
        </view>
      </div>

      <div open-type="navigate" url="/pages/address/main" hover-class="none"   style="padding: 19px 16px;" @click="authThenGo('/pages/address/main')">
        <view class="cus-row">
          <view class="cus-row-col-10 fs-16-fc-000000-m v-a-m">我的地址</view>
          <view class="cus-row-col-2 t-al-r v-a-m">
            <image src="/static/images/icon_bnext_nor@3x.png" mode="widthFix" style="width:8px;height: 13px;"></image>
          </view>
        </view>
      </div>

      <!--<navigator open-type="navigate" url="/pages/bonus/main"  hover-class="none"  style="padding: 19px 16px;">-->
        <!--<view class="cus-row">-->
          <!--<view class="cus-row-col-10 fs-16-fc-000000-m v-a-m">我的红包</view>-->
          <!--<view class="cus-row-col-2 t-al-r v-a-m">-->
            <!--<image src="/static/images/icon_bnext_nor@3x.png" mode="widthFix" style="width:8px;height: 13px;"></image>-->
          <!--</view>-->
        <!--</view>-->
      <!--</navigator>-->


      <div open-type="navigate" url="/pages/coupon/main" hover-class="none" style="padding: 19px 16px;" @click="authThenGo('/pages/coupon/main')">
        <view class="cus-row">
          <view class="cus-row-col-10 fs-16-fc-000000-m v-a-m">代金券</view>
          <view class="cus-row-col-2 t-al-r v-a-m">
            <image src="/static/images/icon_bnext_nor@3x.png" mode="widthFix" style="width:8px;height: 13px;"></image>
          </view>
        </view>
      </div>

    </view>
    </div>
  </div>
</template>

<script>
    import globalStore from '../../stores/global-store'
    import IdCard from 'js-idcard'
    import param from '../../utils/param'

    export default {
        data () {
            return {
                msg: 'Hello',
                banners:{},
                src:'',
                user:{},
                isVip:false,
                isAuth:false,
                age:''
            }
        },
        created:function()
        {

        },
        methods: {
            /*判断是否登录然后跳转*/
            authThenGo(url)
            {
                if( !param.getOpenid() )
                {
                    wx.navigateTo({
                        url:"/pages/login/main"
                    })
                    return;
                }

                wx.navigateTo({
                    url:url
                })
            },
            initPage()
            {

              if( !param.getOpenid() )
              {
                  return;
              }

              this.isAuth = true;

              let url = globalStore.state.host + 'user/user-center';
              let requestData = {}
              Object.assign(requestData,{openid:param.getOpenid()});
              this.$http.get(url,requestData).then((res)=>{
                console.log(res);
                this.user = res.data.data.user;
                this.isVip = res.data.data.isVip;
                this.age = res.data.data.user.age;

              }).catch(err=>{console.log(3)})
            }
        },
        onShow()
        {
          this.initPage();
        },
        mounted() {
          // this.src = globalStore.state.host + 'user/my-services?&openid=' +wx.getStorageSync('openid');
            this.age = '';
            this.isVip = false;
            this.isAuth = false;
          this.initPage();
        },
        computed:
        {
          headImg:function()
          {
              if( this.user.header_img )
              {
                  return globalStore.state.host + this.user.header_img;
              }else
              {
                  return '/static/images/user_pic_nor@3x.png';
              }
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

  .flower-bg{
    background-image: linear-gradient(-153deg, #CE388E 9%, #A30182 100%);
    box-shadow: 0 2px 8px 0 rgba(191,25,132,0.34);
    border-radius: 5px;
    padding: 19px 16px;
  }

  .l-btn-red2{
    border: 1px solid #C50081;
    border-radius: 9px;
    line-height: 18px;
    box-sizing: border-box;
    padding: 0 7px;
    font-family: PingFangSC-Medium;
    font-size: 12px;
    color: #C50081;
    display: inline-block;
  }


</style>