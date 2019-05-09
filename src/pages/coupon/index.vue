<template>
  <div class="p16 bg-f9f9fb">
      <div class="address-panel p16" v-for="(item,index) in list" style="margin-bottom: 16px;" v-if="list.length">

          <div v-if="!item.refer_code">
              <div class="cus-row">
                  <div class="cus-row-col-6 fs-16-fc-000000-m">
                      {{item.type_text}}
                  </div>
                  <div class="cus-row-col-6 t-al-r"><div class="l-btn-red3">花甲会员</div></div>
              </div>
              <div class="cus-row" style="margin-top: 10px;">
                  <div class="cus-row-col-6 fs-14-fc-7E7E7E-r">有效期至：{{item.expire_at}}</div>
              </div>
          </div>

          <div v-else>
              <div class="cus-row">
                  <div class="cus-row-col-8 v-a-m">
                      <div class="cus-row">
                          <div class="cus-row-col-6 fs-16-fc-000000-m">
                              {{item.type_text}}
                          </div>
                          <div class="cus-row-col-6 t-al-r "></div>
                      </div>
                      <div class="cus-row" style="margin-top: 10px;">
                          <div class="cus-row-col-12 fs-14-fc-7E7E7E-r">有效期至：{{item.expire_at}}</div>
                      </div>
                  </div>

                  <div class="cus-row-col-4 t-al-r v-a-m">
                      <span class="fs-16-fc-c50081-m" style="font-size: 12px !important;;">￥</span><span class="fs-16-fc-c50081-m">{{item.price}}</span>
                  </div>
              </div>
          </div>
      </div>


      <div v-if="!list.length" style="margin-top: 56px;">
          <div class="t-al-c">
              <image src="/static/images/home_icon_home_nor@3x.png" style="width: 52px;height: 52px;"/>
              <div class="fs-14-fc-7e7e7e-r m-t-24">暂无代金券</div>
          </div>
      </div>

      <div class="fix-bottom3" v-bind:class="{isIpx:isIpx}" style="background-color: #ffffff;padding: 14px;border-top:1px solid #EBE9E9 ;">
          <a class="yl_btn1"  v-on:click="nextStep()" style="margin-top: 0;">兑换代金券</a>
      </div>


      <div class="layer-shadow" v-if="layerFlag">
          <div class="layer-top" style="padding: 24px;">
              <div class="f-f-m t-al-c" style="border-bottom:  1px solid #E1E1E1;">
                    <input class="fs-18-fc-2E3133" style="padding: 20px 0;" v-model="invited" placeholder="输入优惠码"/>
              </div>

              <div class="cus-row" style="margin-top: 34px;">
                  <div class="cus-row-col-6">
                      <a class="yl_btn1 btn-none" v-on:click="cancelLayer">取消</a>
                  </div>
                  <div class="cus-row-col-6">
                      <a class="yl_btn1" @click="changeCoupon">确定</a>
                  </div>
              </div>
          </div>
      </div>

      <div style="margin-bottom: 100px;"></div>

      <mptoast />

  </div>
</template>

<script>
    import globalStore from '../../stores/global-store'
    import param from '../../utils/param'
    import mptoast from 'mptoast'

    export default {
        data () {
            return {
                msg: 'Hello',
                banners:{},
                list:[],
                layerFlag:0,
                isIpx:'',
                invited:''
            }
        },
        components: {
            mptoast
        },
        created:function()
        {
        },
        methods: {
            initPage:function()
            {

                this.isIpx = globalStore.state.isIpx;
                this.layerFlag = false;

                let url = globalStore.state.host + 'user/coupon-list';
                let requestData = {}
                Object.assign(requestData,{openid:param.getOpenid()});
                this.$http.get(url,requestData).then((res)=>{
                    this.list = res.data.data;
                }).catch(err=>{console.log(3)})
            },
            nextStep()
            {
                this.invited = '';
                this.layerFlag = 1;
            },
            cancelLayer()
            {
                this.layerFlag = 0;
            },
            changeCoupon()
            {
                //兑换代金券
                if( !this.invited )
                {
                    this.$mptoast('请填写兑换码');
                    return;
                }


                //加遮罩层
                wx.showLoading({
                    title: '正在处理',
                    mask:true
                })

                this.$http.post(globalStore.state.host + '/user/change-invited',{openid:param.getOpenid(),invited_code:this.invited}).then((res)=>{
                    wx.hideLoading();
                    if(res.data.status)
                    {
                        this.layerFlag = false;
                        this.$mptoast('兑换成功');
                        this.initPage();
                        return;
                    } else
                    {
                        this.$mptoast(res.data.desc);
                    }
                });

            }
        },
        mounted:function()
        {
            this.initPage();
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
</style>