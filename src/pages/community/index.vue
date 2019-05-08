<template>
  <div class="bg-f9f9fb p-24-16">
      <div style="position:relative">

          <div style="margin-top:60px;left: 0;right: 0;">
                <div class="common-panel" style="padding: 60px 24px 24px 24px;">
                    <div  class="t-al-c fs-18-fc-000000-m m-t-16" style="color:#C50081">小花</div>
                    <div class="m-t-24 fs-14-fc-7E7E7E-r" style="line-height: 21px;">花甲生活为您提供一个集“家庭服务、养老服务、医疗服务、房屋租售、法律服务、金融服务、生活百事的综合性管家服务，为您对接最优质的资源，帮您在生活上排忧解难，让您在社区享受到最贴心，最优质的服务，让您的社区生活更加智能便捷。</div>
                </div>


              <div class="common-panel t-al-c fs-18-fc-000000-m m-t-24" style="padding: 18px 0;line-height: 22px;" @click="makeCall">
                  028-61526472
              </div>
          </div>

          <div class="t-al-c" style="position: absolute;left: 0;right: 0;top:-60px;">
              <img src="https://huajialife.com/images/icon_hua@3x.png" style="width: 120px;height: 120px;border-radius: 120px;"/>
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

        },
        methods: {
            makeCall(){
                wx.makePhoneCall({
                    phoneNumber: '02861526472'
                })
            },
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