<template>
  <div class="p16">



    <div class="p16 mine-list">
      <div class="cus-row" v-on:click="uploadPhoto">
        <div class="cus-row-col-6 fs-16-fc-000000-m f-f-m v-a-m" style="">头像</div>
        <div class="cus-row-col-6 v-a-m t-al-r">
          <!--<image class="v-a-m in-bl" :src="headImg" style="width:60px;height: 60px;border-radius: 60px;"></image>-->
          <div class="v-a-m in-bl"  :style="headStyle"></div>
          <image class="v-a-m in-bl" src="/static/images/icon_bnext_nor@3x.png" mode="widthFix" style="width:8px;height: 13px;margin-left: 8px;"></image>
        </div>
      </div>
    </div>


    <div style="">
    <view  class="mine-list m-t-16">

      <navigator open-type="navigate" v-bind:url="'/pages/edit/main?type=1&val=' + user.real_name"  hover-class="none" style="padding: 19px 16px;">
        <view class="cus-row">
          <view class="cus-row-col-4 fs-16-fc-000000-m v-a-m">姓名</view>
          <view class="cus-row-col-8 t-al-r v-a-m">
            <span class="in-bl v-a-m fs-16-fc-7E7E7E-r m-r-14">{{user.real_name}}</span>
            <image  class="in-bl v-a-m" src="/static/images/icon_bnext_nor@3x.png" mode="widthFix" style="width:8px;height: 13px;"></image>
          </view>
        </view>
      </navigator>

      <navigator open-type="navigate" v-bind:url="'/pages/editselect/main?val=' + ((user.age_origin != null && user.age_origin)?user.age_origin:'')"  hover-class="none"  style="padding: 19px 16px;">
        <view class="cus-row">
          <view class="cus-row-col-4 fs-16-fc-000000-m v-a-m">生日</view>
          <view class="cus-row-col-8 t-al-r v-a-m">
            <span class="in-bl v-a-m fs-16-fc-7E7E7E-r m-r-14">{{(user.age_origin != null && user.age_origin)?user.age_origin:''}}</span>
            <image class="in-bl v-a-m" src="/static/images/icon_bnext_nor@3x.png" mode="widthFix" style="width:8px;height: 13px;"></image>
          </view>
        </view>
      </navigator>

      <navigator open-type="navigate" url="/pages/bind2/main"  hover-class="none"  style="padding: 19px 16px;">
        <view class="cus-row">
          <view class="cus-row-col-4 fs-16-fc-000000-m v-a-m">手机号码</view>
          <view class="cus-row-col-8 t-al-r v-a-m">
            <span class="in-bl v-a-m fs-16-fc-7E7E7E-r m-r-14">{{user.phone}}</span>
            <image class="in-bl v-a-m" src="/static/images/icon_bnext_nor@3x.png" mode="widthFix" style="width:8px;height: 13px;"></image>
          </view>
        </view>
      </navigator>


      <navigator open-type="navigate" v-bind:url="'/pages/edit/main?type=2&val=' + user.id_card" hover-class="none" style="padding: 19px 16px;">
        <view class="cus-row">
          <view class="cus-row-col-4 fs-16-fc-000000-m v-a-m">身份证号码</view>
          <view class="cus-row-col-8 t-al-r v-a-m">
            <span class="in-bl v-a-m fs-16-fc-7E7E7E-r m-r-14">{{user.id_card}}</span>
            <image class="in-bl v-a-m" src="/static/images/icon_bnext_nor@3x.png" mode="widthFix" style="width:8px;height: 13px;"></image>
          </view>
        </view>
      </navigator>

    </view>
    </div>




    <div class="fix-bottom3" v-bind:class="{isIpx:isIpx}" style="background-color: #ffffff;padding: 14px;border-top:1px solid #EBE9E9 ;">
      <a class="yl_btn1 btn-gray"  v-on:click="nextStep()" style="margin-top: 0;">退出账号</a>
    </div>

    <div class="layer-shadow" v-if="layerFlag">
      <div class="layer-center" style="padding: 24px;">

        <div class="t-al-c fs-16-fc-000000-m">确定退出账号？</div>

        <div class="f-f-m t-al-l" style="margin-top: 14px;">
          <div class="fs-14-fc-7e7e7e-r" style="line-height: 21px;">退出登录后将无法查看订单，重新登录后即可查看</div>
        </div>


        <div class="cus-row" style="margin-top: 24px;">
          <div class="cus-row-col-6">
            <a class="yl_btn1 btn-none" v-on:click="cancelLayer">取消</a>
          </div>
          <div class="cus-row-col-6">
            <a class="yl_btn1" @click="changeCoupon">确定</a>
          </div>
        </div>
      </div>
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
                isIpx:'',
                layerFlag:''
            }
        },
        created:function()
        {

        },
        methods: {
          cancelLayer()
          {
              this.layerFlag = 0;
          },
            changeCoupon() {
              wx.setStorageSync('openid', '');
              wx.reLaunch({
                  url: '/pages/mine/main'
              })
          },

            nextStep() {

              //弹出层
              this.layerFlag = 1;


                // wx.setStorageSync('openid', '');
                // wx.reLaunch({
                //     url: '/pages/mine/main'
                // })
            },
            initPage() {
                this.isIpx = globalStore.state.isIpx;
                this.layerFlag = false;

                let url = globalStore.state.host + 'user/user-center';
                let requestData = {}
                Object.assign(requestData, {openid: param.getOpenid()});
                this.$http.get(url, requestData).then((res) => {
                    console.log(res);
                    this.user = res.data.data.user;

                }).catch(err => {
                    console.log(3)
                })
            },
            uploadPhoto: function () {
                let _self = this;
                wx.chooseImage({
                    count: 1, // 默认9
                    sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                    success: function (res) {
                        let url = res.tempFilePaths[0];
                        console.log(url);

                        //文件要上传
                        wx.uploadFile({
                            url: globalStore.state.host + '/user/header-img?openid=' + param.getOpenid(),
                            filePath: url,
                            name: 'images[]',
                            success: function (res) {
                                let jsonData = JSON.parse(res.data);
                                if(jsonData.status)
                                {
                                    //设置头像请求
                                    _self.initPage();
                                }
                            }
                        })
                    }
                });

            },
        },
        onShow()
        {
          this.initPage();
        },
        mounted() {
            this.isIpx = globalStore.state.isIpx;
            // this.src = globalStore.state.host + 'user/my-services?&openid=' +wx.getStorageSync('openid');
          this.initPage();
        },
        computed:
        {
          age:function()
          {

            if(!this.user.id_card)
            {
              return '';
            }

             if( !IdCard.checkIdCard(this.user.id_card) )
             {
               return '';
             }

             let birthDay = IdCard.birthDay(this.user.id_card)
             let birth = birthDay.date;
             let   r   =   birth.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
              if(r==null)return   '';
              let   d=   new   Date(r[1],   r[3]-1,   r[4]);
              if   (d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4])
              {
                let   Y   =   new   Date().getFullYear();
                return  (Y-r[1]);
              }
              return '';
          },
          headImg:function()
          {
              if( this.user.header_img )
              {
                  return globalStore.state.host + this.user.header_img;
              }else
              {
                  return globalStore + '/images/user_pic_nor@3x.png';
              }
          },
          headStyle:function()
          {
            return 'width:60px;height: 60px;border-radius: 60px;background-image: url(' + this.headImg + ');background-size: cover;background-position: center center;background-repeat: no-repeat;'
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
</style>