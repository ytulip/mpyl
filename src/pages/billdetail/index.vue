<template>
  <!--<web-view src="{{src}}" @message="bindmessage"></web-view>-->
  <div class="p-24-16 bg-f9f9fb">


    <div v-if="productType == 1">

    <div class="fs-18-fc-000000-m">家庭保洁</div>
      <div class="m-t-16 cus-row">
        <div class="fs-14-fc-484848 f-f-r cus-row-col-8">服务时间:2019-02-28</div>
        <div class="fs-14-fc-484848 f-f-r cus-row-col-4 t-al-r" v-on:click="goDetail">查看订单</div>
      </div>

    <div  class="m-t-24" style="overflow: hidden;position: relative;margin-bottom: 16px;padding-left: 84px;box-sizing: border-box">


      <div style="position: absolute;width: 120px;height: 120px;border-radius: 4px;top:18px;left: 0;z-index: 99;overflow: hidden;">
        <image  :src="productImg" class="slide-image" style="width: 100%;height: 100%;"/>
      </div>


      <div class="info-panel">
        <div class="fs-18-fc-000000-m" style="line-height: 25px;">{{product.product_name}}</div>
        <div class="fs-14-fc-7E7E7E-r" style="margin-top: 10px;line-height: 16px;">{{product.sub_desc}}</div>
      </div>
      <!--<div style="position: absolute;top:0;left: 0;right: 0;z-index: 99;" class="fs-24-fc-ffffff-b">{{item.product_name}}</div>-->
      <!--<div style="position: absolute;bottom: 0;left: 0;right: 0;z-index: 99;" class="fs-16-fc-ffffff">{{item.sub_desc}}</div>-->
    </div>


    <div class="common-panel m-t-24 p-16-24">
      <div class="fs-18-fc-000000-m">服务地址</div>

      <div class="fs-16-fc-000000-m m-t-20">
        <span>{{order.address_name}}</span> <span style="margin-left: 27px;">{{order.address_phone}}</span>
      </div>

      <div class="fs-14-fc-7E7E7E-r m-t-20" style="margin-top: 10px;line-height: 16px;">
        {{order.address}}
      </div>
    </div>

    <div class="common-panel m-t-24 p-16-24">
      <div class="fs-18-fc-000000-m">服务时长</div>
      <div class="fs-16-fc-000000-m m-t-20" style="margin-top: 10px;line-height: 16px;">
        {{order.quantity}}小时
      </div>
    </div>

    <div class="common-panel m-t-24 p-16-24">
      <div class="fs-18-fc-000000-m">服务备注</div>
      <div class="fs-14-fc-7E7E7E-r m-t-20" style="margin-top: 10px;line-height: 16px;">
        {{order.remark}}
      </div>
    </div>

    </div>


    <div v-if="productType == 2">
      <div class="fs-18-fc-000000-m">订餐服务</div>
      <div class="m-t-16 cus-row">
      <div class="fs-14-fc-484848 f-f-r cus-row-col-8">服务时间:2019-02-28</div>
      <div class="fs-14-fc-484848 f-f-r cus-row-col-4 t-al-r" v-on:click="goDetail">查看订单</div>
      </div>


      <div  class="m-t-24" style="overflow: hidden;position: relative;margin-bottom: 16px;padding-left: 84px;box-sizing: border-box">


          <div style="position: absolute;width: 120px;height: 120px;border-radius: 4px;top:18px;left: 0;z-index: 99;overflow: hidden;">
              <image  :src="productImg" class="slide-image" style="width: 100%;height: 100%;"/>
          </div>


          <div class="info-panel" style="position: relative;">
              <div class="fs-18-fc-000000-m" style="line-height: 25px;">{{product.product_name}}</div>
              <div class="fs-14-fc-7E7E7E-r" style="margin-top: 10px;line-height: 16px;">剩余天数{{days.length}}/{{order.days}}天</div>

              <div class="" style="position: absolute;bottom: 18px;" v-if="pastDays.length">
                <div class="fs-14-fc-484848 f-f-r" style="border: 1px solid #E1E1E1;border-radius: 16px;padding: 0 12px;line-height:32px " v-on:click="goHistory">历史记录</div>
              </div>
          </div>
      </div>

      <div class="cus-row m-t-24">
        <div class="cus-row-col-6 fs-18-fc-000000-m v-a-m">
          菜单
        </div>
        <div class="cus-row-col-6 fs-14-fc-484848 f-f-r v-a-m t-al-r">
          仅显示2周内菜单
        </div>
      </div>

      <div class="m-t-24 p24-block" v-for="(item,index) in res">
        <div class="fs-14-fc-2e3133-m">{{index}}</div>
        <div class="m-t-24">
          <div class="in-bl v-a-b" style="font-size: 0;">
            <img :src="host + item['lunch']['cover_img']" style="width: 80px;height: 80px;border-radius: 4px;"/>
          </div>
          <div class="in-bl v-a-b" style="margin-left: 24px; ">
            <div class="fs-16-fc-000000-m">
              午餐
            </div>
            <div class="fs-14-fc-7E7E7E-r" style="line-height: 18px;margin-top: 14px;">
              {{item['lunch']['foods']}}
            </div>
          </div>
        </div>


        <div class="m-t-24">
          <div class="in-bl v-a-b" style="font-size: 0;">
            <img :src="host + item['lunch']['cover_img']" style="width: 80px;height: 80px;border-radius: 4px;"/>
          </div>
          <div class="in-bl v-a-b" style="margin-left: 24px; ">
            <div class="fs-16-fc-000000-m">
              晚餐
            </div>
            <div class="fs-14-fc-7E7E7E-r" style="line-height: 18px;margin-top: 14px;">
              {{item['dinner']['foods']}}
            </div>
          </div>

          <!--如果是在第二天那么显示延后，或者显示已延后-->
          <div class="cus-row m-t-24" v-if="'2019-03-04' == index">
            <div class="cus-row-col-8 fs-14-fc-212229 f-f-r v-a-m">当日不在家，顺延到下次</div>
            <div class="cus-row-col-4 v-a-m t-al-r"> <div class="l-btn-red2" v-on:click="notThisDay">我要延后</div> </div>
          </div>

        </div>


      </div>


    </div>


    <div class="layer-shadow" v-if="layerFlag">
      <div class="layer-center" style="padding: 24px;">
        <div class="t-al-c fs-16-fc-000000-m">延后说明</div>
        <div class="m-t-16 fs-14-fc-7E7E7E-r" style="line-height: 22px;">
          这里是延后的说明，这里是延后的说明。这里是延后的说明这里是延后的说明。
        </div>

        <div class="cus-row" style="margin-top: 34px;">
          <div class="cus-row-col-6">
            <a class="yl_btn1 btn-none" v-on:click="cancelLayer">取消</a>
          </div>
          <div class="cus-row-col-6">
            <a class="yl_btn1" v-on:click="yanhou">确定</a>
          </div>
        </div>
      </div>
    </div>
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
                src:'',
                productType:0,
                product:{},
                res:[],
                host:globalStore.state.host,
                layerFlag:0,
                order:{},
                pastDays:[],
                days:[]
            }
        },
        created:function()
        {

        },
        methods: {
          /**
           * 不是今天
           */
              goHistory()
            {
              //优化
              let days = this.pastDays.jion(',');
              let url = Base64.encode('/passport/history?dates=' + $days + '&product_id=' + this.order.product_id);
              wx.redirectTo(
                      {
                        url:'/pages/commonweb/main?url=' + url,
                      }
              )


            },
            notThisDay()
            {
              this.layerFlag = 1;
            },
            cancelLayer()
            {
              this.layerFlag = 0;
            },
            components: {
              mptoast
            },
            goDetail()
            {
                wx.navigateTo(
                    {
                        url:'/pages/billinfo/main?id=' + param.getParamValue('id')
                    }
                );
            },
            yanhou()
            {
              let a = this;
              let requestData = {order_id:this.order.id};
              param.commonRequest(
                      {
                        url:globalStore.state.host + '/user/yanhou',
                        page:this,
                        data:requestData,
                        success:function(res)
                        {
                          if(res.status)
                          {
                            a.layerFlag = 0;
                            a.pageInit();
                            // wx.navigateBack({
                            //   delta: 1
                            // })

                          }else{
                            a.$mptoast(res.desc);
                          }
                        },
                        error:function () {

                        }
                      }
              );
            },
            pageInit()
            {
                let url = globalStore.state.host + '/user/order-detail-data';
                this.$http.get(url,{openid:param.getOpenid(),'order_id':param.getParamValue('id')}).then((res)=>{
                    // console.log(res);
                    // this.list = res.data.data;
                    this.order = res.data.data.order;
                    this.product = res.data.data.product;
                    this.productType = this.product.type;
                    this.pastDays = res.data.data.pastDays;
                    this.days = res.data.data.days;


                    this.res = res.data.data.res;
                    for( let i = 0; i < res.data.data.res.length;i++ )
                    {

                    }


                    //

                }).catch(err=>{
                    console.log(3)
                });
            }
        },
        mounted() {
            this.pageInit();
        },
        computed:{
            productImg()
            {
                if(this.product)
                {
                    return globalStore.state.host + this.product.cover_image;
                } else
                {
                    return '';
                }
            },
            remarkText()
            {
                let remark = '暂无备注';
                if( this.order )
                {
                    if ( this.order.remark ) return this.order.remark;
                }

                return remark;
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