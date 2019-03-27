<template>
  <div class="bg-f9f9fb p-24-16">
      <div style="position:relative">

          <div style="margin-top:60px;left: 0;right: 0;">
                <div class="common-panel" style="padding: 60px 24px 24px 24px;">
                    <div  class="t-al-c fs-18-fc-000000-m m-t-16" style="color:#C50081">小花</div>
                    <div class="m-t-24 fs-14-fc-7E7E7E-r">这里是一段套餐介绍的，午餐晚餐，每餐标准为2荤2素搭配堂主食为米饭，进了比这里是描述，目前还没有文况来定，之后文字补充上</div>
                </div>


              <div class="common-panel t-al-c fs-18-fc-000000-m m-t-24" style="padding: 18px 0;line-height: 22px;">
                  400-0892-888
              </div>
          </div>

          <div class="t-al-c" style="position: absolute;left: 0;right: 0;top:-60px;">
              <img src="/static/images/icon_hua@3x.png" style="width: 120px;height: 120px;border-radius: 120px;"/>
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