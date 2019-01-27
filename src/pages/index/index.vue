<template>
  <div class="p16 bg-f9f9fb">
    <swiper class="swiper" autoplay="true" interval="5000" duration="1000">
      <block v-for="(item, index) in banners" :index="index" :key="key">
        <swiper-item v-on:click="goBannerDetail(item.id)">
          <image :src="item.url" class="slide-image" mode="aspectFill"/>
        </swiper-item>
      </block>
    </swiper>


    <div class="cus-row m-t-16">
      <div class="cus-row-col-6 v-a-t" style="padding-right: 7.5px;box-sizing: border-box;">
          <div class="food-panel" v-on:click="goCommunity">
              <div class="item-fc">订餐服务</div>
              <div style="position: absolute;right: 24px;bottom: 24px;">
                  <image style="width:54px;" src="/static/images/home_icon_food@3x.png" mode="widthFix"/>
              </div>
          </div>
      </div>
      <div class="cus-row-col-6" style="padding-left: 7.5px;box-sizing: border-box;">
          <div class="clean-panel" v-on:click="goClean">
             <div class="item-fc">家庭清洁</div>
              <div style="position: absolute;right: 21px;bottom: 21px;">
                  <image style="width:29px;" src="/static/images/hone_clean_nor@3x.png" mode="widthFix"/>
              </div>
          </div>
          <div class="hood-panel m-t-16" v-on:click="goCommunity">
             <div class="item-fc">社区管家</div>
              <div style="position: absolute;right: 21px;bottom: 21px;">
                  <image style="width:29px;" src="/static/images/home_master_nor@3x.png" mode="widthFix"/>
              </div>
          </div>
      </div>
    </div>


    <div class="vip-panel m-t-16" v-on:click="cusNavigate('vip')">
        <div class="cus-row">
            <div class="cus-row-col-8 v-a-m">
                <div class="fs-18-fc-000000-m" style="line-height: 25px;">
                    花甲会员· ¥60/月
                </div>
                <div class="fs-12-fc-7E7E7E-r m-t-6" style="line-height: 17px">
                    更多优惠，服务更多！
                </div>
            </div>
            <div class="cus-row-col-4 v-a-m t-al-r">
                <a class="l-btn-red">立即开通</a>
            </div>
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
                banners:{}
            }
        },
        created:function()
        {
//            console.log('index' + wx.getStorageSync('openid'));
            //定时等待10s
            // (function(a,timer){
            //     let countDownHandler = setInterval(function(){
            //         timer = timer - 1;
            //         console.log(timer);
            //         //判断是否拥有openid
            //         if( wx.getStorageSync('openid'))
            //         {f
            //             a.openid = wx.getStorageSync('openid');
            //             if( a.hasOwnProperty('userInit') )
            //             {
            //                 console.log('has userInit');
            //                 a.userInit();
            //             } else {
            //                 console.log('donot has userInit');
            //             }
            //             clearInterval(countDownHandler);
            //             return;
            //         }
            //         a.userInit();
            //         if( timer < 1) {
            //             clearInterval(countDownHandler);
            //             return;
            //         }
            //     },1000);
            // })(this,7);
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
                    console.log(res.data.data);
                    this.banners = res.data.data.banners;
                }).catch(err=>{console.log(3)})
            },
            goClean() {
                wx.navigateTo(
                    {
                        url:'/pages/clean/main'
                    }
                );
            },
            goCommunity() {
                wx.navigateTo(
                    {
                        url:'/pages/clean/main?type=community'
                    }
                );
            },
            goBannerDetail(id) {
                console.log('go banner detail' + id);
                wx.navigateTo(
                    {
                        url:'/pages/webview/main?id=' + id
                    }
                );
            },
            goVip(){
                wx.navigateTo(
                    {
                        url:'/pages/vip/main'
                    }
                );
            },
            cusNavigate(url){
                wx.navigateTo(
                    {
                        url: "/pages/"+url+"/main"
                    });
            }
        },
        mounted:function()
        {
            this.userInit();
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

  .l-btn-red{
      border: 1px solid #C50081;
      border-radius: 16px;
      line-height: 32px;
      box-sizing: border-box;
      padding: 0 13px;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #C50081;
      letter-spacing: -0.27px;
      display: inline-block;
  }
</style>