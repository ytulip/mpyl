<template>
  <div class="p16 bg-f9f9fb">

    <div v-if="productType == 1">
    <div class="common-panel p-16-24">
      <div class="cus-row">
        <div class="cus-row-col-6 v-a-m fs-18-fc-000000-m">订购服务</div>
        <div class="cus-row-col-6 v-a-m fs-14-fc-c50081-m t-al-r">订单进行中</div>
      </div>

      <div class="cus-row m-t-24">
        <div class="in-bl v-a-t food-icon-img">
          <image :src="imgHost + product.cover_image" class="slide-image" style="width: 100%;height: 100%;"/>
        </div>
        <div class="v-a-t in-bl m-l-24">
          <div class="fs-16-fc-000000-m">{{product.product_name}}</div>
          <div class="m-t-10"><span class="fs-14-fc-c50081-m">￥{{product.price}}</span><span class="fs-14-fc-7e7e7e-r"> ×{{order.quantity}}小时</span></div>
        </div>
      </div>


      <div class="barr-line"></div>
      <div class="cus-row">
        <div class="cus-row-col-12 v-a-m">
          <div class="fs-16-fc-000000-m">服务时间</div>
          <div class="fs-14-fc-7e7e7e-r m-t-16">{{order.service_start_time}}    {{beginTime}}</div>
        </div>


      </div>

      <div class="barr-line"></div>


      <div class="cus-row">
        <div class="cus-row-col-12 v-a-m">
          <div class="fs-16-fc-000000-m">预定时间</div>
        </div>
        <div class="cus-row-col-12 v-a-m fs-14-fc-484848 f-f-r m-t-16">{{order.quantity}}小时
        </div>
      </div>

      <div class="m-t-16">

        <!--<div class="day-item">11月12日</div>-->

        <div v-for="(item,index) in list" :index="index" :key="index" :data-index="index">
          <div class="recommend-game" v-for="(it,idx) in item" :key="idx" :data-index="idx">
            <div class="game-info day-item-active" v-bind:class="{'day-item': it.through_line}">{{it.date_formate}}</div>
          </div>
        </div>

        <div class="t-al-r m-t-24" v-if="pastDays.length">
          <div class="fs-14-fc-484848 f-f-r" style="border: 1px solid #E1E1E1;border-radius: 16px;padding: 0 12px;line-height:32px;display: inline-block; " v-on:click="goHistory()">历史记录</div>
        </div>

      </div>

    </div>

    <!--配送地址-->
    <div class="common-panel p-16-24 m-t-16">
      <div class="cus-row">
        <div class="cus-row-col-6 v-a-m">
          <span class="fs-18-fc-000000-m in-bl" style="line-height: 25px;">服务地址</span>
        </div>
        <div class="cus-row-col-6 v-a-m t-al-r">
        </div>
      </div>

      <div class="m-t-16">
        <div class="fs-16-fc-000000-m in-bl" style="line-height: 22px;">{{order.address_name}}  {{order.address_phone}}</div>

        <div class="fs-14-fc-7e7e7e-r" style="margin-top: 8px;">{{order.address}}</div>
      </div>
    </div>



    <div class="common-panel m-t-16 p-16-24">

      <div class="cus-row">
        <div class="cus-row-col-6 fs-16-fc-7E7E7E-r">代金券</div>
        <div class="cus-row-col-6 fs-16-fc-000000-m t-al-r">{{product.product_name}}代金券{{order.coupons?1:0}}张</div>
      </div>

      <div class="barr-line"></div>

      <div class="cus-row">
        <div class="cus-row-col-6 fs-16-fc-7E7E7E-r">花甲会员优惠</div>
        <div class="cus-row-col-6 fs-16-fc-000000-m t-al-r">8折优惠</div>
      </div>

      <div class="barr-line"></div>

      <div class="cus-row">
        <div class="cus-row-col-12 fs-16-fc-000000-m t-al-r">合计￥{{order.coupons?order.origin_pay:0}}元</div>
      </div>

    </div>



    <div class="fs-18-fc-000000-m m-t-16">订单信息</div>

    <div class="common-panel m-t-16 p-16-24">

      <div class="cus-row">
        <div class="cus-row-col-6 fs-16-fc-7E7E7E-r">订单号码</div>
        <div class="cus-row-col-6 fs-16-fc-000000-m t-al-r">{{order.id}}</div>
      </div>

      <div class="barr-line"></div>

      <div class="cus-row">
        <div class="cus-row-col-6 fs-16-fc-7E7E7E-r">下单时间</div>
        <div class="cus-row-col-6 fs-16-fc-000000-m t-al-r">{{order.created_at}}</div>
      </div>

      <div class="barr-line"></div>

      <div class="cus-row">
        <div class="cus-row-col-6 fs-16-fc-7E7E7E-r">支付方式</div>
        <div class="cus-row-col-6 fs-16-fc-000000-m t-al-r">{{order.coupons?'代金券全额抵扣':'微信支付'}}</div>
      </div>

    </div>
    </div>

    <div v-else>
      <div class="common-panel p-16-24">
        <div class="cus-row">
          <div class="cus-row-col-6 v-a-m fs-18-fc-000000-m">订购服务</div>
          <div class="cus-row-col-6 v-a-m fs-14-fc-c50081-m t-al-r">订单进行中</div>
        </div>

        <div class="cus-row m-t-24">
          <div class="in-bl v-a-t food-icon-img">
            <image :src="imgHost + product.cover_image" class="slide-image" style="width: 100%;height: 100%;"/>
          </div>
          <div class="v-a-t in-bl m-l-24">
            <div class="fs-16-fc-000000-m">{{product.product_name}}</div>
            <div class="m-t-10"><span class="fs-14-fc-c50081-m">￥{{product.price}}</span><span class="fs-14-fc-7e7e7e-r"> ×{{order.quantity}}份 ×{{order.days}}天</span></div>
          </div>
        </div>


        <div class="barr-line"></div>
        <div class="cus-row">
          <div class="cus-row-col-6 v-a-m">
            <div class="fs-16-fc-000000-m">订餐份数</div>
            <div class="fs-14-fc-7e7e7e-r m-t-6">1份餐仅供一人</div>
          </div>

          <div class="cus-row-col-6 v-a-m t-al-r fs-16-fc-000000-m">
            x{{order.quantity}}
          </div>

        </div>

        <div class="barr-line"></div>


        <div class="cus-row">
          <div class="cus-row-col-6 v-a-m">
            <div class="fs-16-fc-000000-m">预定时间</div>
          </div>
          <div class="cus-row-col-6 v-a-m t-al-r fs-14-fc-484848 f-f-r">
            剩余天数{{countDays}}/{{order.days}}天
          </div>
        </div>

        <div class="m-t-16">

          <!--<div class="day-item">11月12日</div>-->

          <div v-for="(item,index) in list" :index="index" :key="index" :data-index="index">
            <div class="recommend-game" v-for="(it,idx) in item" :key="idx" :data-index="idx">
              <div class="game-info day-item-active" v-bind:class="{'day-item': it.through_line}">{{it.date_formate}}</div>
            </div>
          </div>

          <div class="t-al-r m-t-24" v-if="pastDays.length">
            <div class="fs-14-fc-484848 f-f-r" style="border: 1px solid #E1E1E1;border-radius: 16px;padding: 0 12px;line-height:32px;display: inline-block; " v-on:click="goHistory()">历史记录</div>
          </div>

        </div>

      </div>

      <!--配送地址-->
      <div class="common-panel p-16-24 m-t-16">
        <div class="cus-row">
          <div class="cus-row-col-6 v-a-m">
            <span class="fs-18-fc-000000-m in-bl" style="line-height: 25px;">配送地址</span>
          </div>
          <div class="cus-row-col-6 v-a-m t-al-r">
          </div>
        </div>

        <div class="m-t-16">
          <div class="fs-16-fc-000000-m in-bl" style="line-height: 22px;">{{order.address_name}}  {{order.address_phone}}</div>

          <div class="fs-14-fc-7e7e7e-r" style="margin-top: 8px;">{{order.address}}</div>
        </div>
      </div>



      <div class="common-panel m-t-16 p-16-24">

        <div class="cus-row">
          <div class="cus-row-col-6 fs-16-fc-7E7E7E-r">代金券</div>
          <div class="cus-row-col-6 fs-16-fc-000000-m t-al-r">{{order.id}}</div>
        </div>

        <div class="barr-line"></div>

        <div class="cus-row">
          <div class="cus-row-col-6 fs-16-fc-7E7E7E-r">花甲会员优惠</div>
          <div class="cus-row-col-6 fs-16-fc-000000-m t-al-r">{{order.created_at}}</div>
        </div>

        <div class="barr-line"></div>

        <div class="cus-row">
          <div class="cus-row-col-12 fs-16-fc-000000-m t-al-r">合计￥165元</div>
        </div>

      </div>



      <div class="fs-18-fc-000000-m m-t-16">订单信息</div>

      <div class="common-panel m-t-16 p-16-24">

        <div class="cus-row">
          <div class="cus-row-col-6 fs-16-fc-7E7E7E-r">订单号码</div>
          <div class="cus-row-col-6 fs-16-fc-000000-m t-al-r">{{order.id}}</div>
        </div>

        <div class="barr-line"></div>

        <div class="cus-row">
          <div class="cus-row-col-6 fs-16-fc-7E7E7E-r">下单时间</div>
          <div class="cus-row-col-6 fs-16-fc-000000-m t-al-r">{{order.created_at}}</div>
        </div>

        <div class="barr-line"></div>

        <div class="cus-row">
          <div class="cus-row-col-6 fs-16-fc-7E7E7E-r">支付方式</div>
          <div class="cus-row-col-6 fs-16-fc-000000-m t-al-r">微信支付</div>
        </div>

      </div>
    </div>


  </div>
</template>

<script>
    import globalStore from '../../stores/global-store'
    import param from "../../utils/param"
    import moment from "moment"
    import _ from 'underscore'


    export default {
        data () {
            return {
                msg: 'Hello',
                banners:{},
                src:'',
                list:[],
                id:'',
                productType:0,
                product:{},
                res:[],
                host:globalStore.state.host,
                layerFlag:0,
                order:{},
                imgHost:globalStore.state.host,
                pastDays:[],
                days:[]
            }
        },
        created:function()
        {

        },
        methods: {
           pageInit(){
               let url = globalStore.state.host + '/user/order-detail-data';
               this.$http.get(url,{openid:param.getOpenid(),order_id:this.id}).then((res)=>{
                   // console.log(res);
                   // this.list = res.data.data;
                   this.order = res.data.data.order;
                   this.product = res.data.data.product;
                   this.productType = this.product.type;
                   this.pastDays = res.data.data.pastDays;
                   this.days = res.data.data.days;


                   //days list,两层循环
                   let dayLines = [];
                   let dayLinesFlag = 0;
                   let dayLineArr = [];

                   let i = 0;

                   for( i = 0;i < this.pastDays.length;i++)
                   {
                       if( dayLinesFlag == 4)
                       {

                           //日期转换

                           dayLines.push(dayLinesArr);
                           dayLineArr = [];
                           dayLinesFlag = 0;
                       }

                       let dateFormat = moment(this.days[i].date);
                       this.days[i].date_formate = dateFormat.format('MM月DD日');
                       this.days[i].through_line = 1;

                       dayLineArr.push(this.pastDays[i]);
                       dayLinesFlag +=  1;
                   }


                   for( i = 0;i < this.days.length;i++)
                   {
                       if( dayLinesFlag == 4)
                       {
                           dayLines.push(dayLinesArr);
                           dayLineArr = [];
                           dayLinesFlag = 0;
                       }

                       let dateFormat = moment(this.days[i].date);
                       this.days[i].date_formate = dateFormat.format('MM月DD日');
                       this.days[i].through_line = 0;

                       dayLineArr.push(this.days[i]);
                       dayLinesFlag +=  1;
                   }

                   if( dayLineArr.length )
                   {
                       dayLines.push(dayLineArr);
                   }

                   console.log('逐行打印');
                   console.log(JSON.stringify(dayLines));
                   this.list = dayLines;
               }).catch(err=>{console.log(err)});
           },
            goDetail(id){
               console.log(id);
               wx.navigateTo(
                   {
                       url:'/pages/billdetail/main?id=' + id
                   }
               );
            },
           goHistory()
           {
             let days = _.pluck(this.pastDays,'date');
             days = days.join(',');
             let url = Base64.encode('/passport/history?dates=' + days + '&product_id=' + this.order.product_id);
             wx.redirectTo(
                     {
                       url:'/pages/commonweb/main?url=' + url,
                     }
             )
           },
            formatDate(dateStr)
            {
                //比如讲2019年11月12日，转换成11月12日
            }
        },
        onShow(){
            this.pageInit();
        },
        mounted() {
            globalStore.commit('setPaySuccessBack',1);
            this.id = param.getParamValue('id');
            this.pageInit();
        },
        computed:
        {
            countDays:function()
            {
                return this.days.length;
            },
            beginTime()
            {
                // return this.order.begin_time
                if( this.order.begin_time )
                {
                    return this.order.begin_time.substring(0,5);
                }else
                {
                    return '';
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

  .bill-panel{background: #FFFFFF;
    box-shadow: 0 2px 6px 0 #E7E9F0;
    border-radius: 5px;padding: 16px;}


  .day-item{
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #7E7E7E;
    text-decoration:line-through;
  }

  .day-item-active
  {
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #212229;
    text-decoration:none;
  }

  .recommend-game{vertical-align: top;width: 20%;display: inline-block;font-size: 0;}
  .recommend-game .game-info{width: 90%;text-align: center;}
  .recommend-game .game-info img{width: 100%;}
  /*.recommend-icon:nth-child(1){}*/
  .recommend-game:nth-child(2) .game-info{margin-left: 2.5%}
  .recommend-game:nth-child(3) .game-info{margin-left: 5%}
  .recommend-game:nth-child(4) .game-info{margin-left: 7.5%}
  .recommend-game:nth-child(5) .game-info{margin-left: 10%}
</style>