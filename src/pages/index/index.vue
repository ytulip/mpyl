<template>
  <div style="padding: 24px;">
    <swiper class="swiper" autoplay="true" interval="5000" duration="1000">
      <block v-for="(item, index) in banners" :index="index" :key="key">
        <swiper-item v-on:click="goBannerDetail(item.id)">
          <image :src="item.url" class="slide-image" mode="aspectFill"/>
        </swiper-item>
      </block>
    </swiper>

    <div style="border-radius: 12px;" v-on:click="goVip">
      <image src="http://graphis.zhuyan.me/banner2.jpg"  style="width: 100%;border-radius:6px;overflow:hidden;margin-top:24px;"/>
      <div>
          <p>一句话介绍介绍家庭会员哟</p>
          <p>会员服务</p>
      </div>
    </div>

    <div class="m-t-24 cus-row">
      <div class="cus-row-col-6" v-on:click="goClean">
        <image src="http://graphis.zhuyan.me/1.jpg"  mode="aspectFill" style="width: 100%;"/>
      </div>
      <div class="cus-row-col-6" v-on:click="goCommunity">
        <image src="http://graphis.zhuyan.me/2.jpg"  mode="aspectFill" style="width: 100%;"/>
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
            console.log('index' + wx.getStorageSync('openid'));
            //定时等待10s
            (function(a,timer){
                let countDownHandler = setInterval(function(){
                    timer = timer - 1;
                    console.log(timer);
                    //判断是否拥有openid
                    if( wx.getStorageSync('openid'))
                    {f
                        a.openid = wx.getStorageSync('openid');
                        if( a.hasOwnProperty('userInit') )
                        {
                            console.log('has userInit');
                            a.userInit();
                        } else {
                            console.log('donot has userInit');
                        }
                        clearInterval(countDownHandler);
                        return;
                    }
                    a.userInit();
                    if( timer < 1) {
                        clearInterval(countDownHandler);
                        return;
                    }
                },1000);
            })(this,7);
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