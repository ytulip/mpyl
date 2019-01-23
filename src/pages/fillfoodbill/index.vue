<template>
    <div class="p16 bg-f9f9fb">

        <div class="white-panel">
            <div class="cus-row">
                <div class="cus-row-col-6 v-a-m">
                    <span class="fs-18-fc-000000-m in-bl" style="line-height: 25px;">配送地址</span>
                </div>
                <div class="cus-row-col-6 v-a-m t-al-r">
                    <span class="fs-16-fc-c50081-m" v-on:click="goAddressList()">修改</span>
                </div>
            </div>

            <div class="m-t-16">
                <div class="fs-16-fc-000000-m in-bl" style="line-height: 22px;">{{name}}  {{phone}}</div>

                <div class="fs-14-fc-7e7e7e-r" style="margin-top: 8px;">
                    {{pct_code_name}} {{address}}
                </div>
            </div>
        </div>



        <div class="white-panel m-t-16">
            <div class="cus-row">
                <div class="cus-row-col-6 v-a-m">
                    <span class="fs-18-fc-000000-m in-bl" style="line-height: 25px;">订购服务</span>
                </div>
            </div>

            <div class="cus-row m-t-24">
                <div class="in-bl v-a-t food-icon-img">
                    <image :src="visitCoverImage" class="slide-image" style="width: 100%;height: 100%;"/>
                </div>
                <div class="v-a-t in-bl m-l-24">
                    <div class="fs-16-fc-000000-m">{{product.product_name}}</div>
                    <div class="m-t-10"><span class="fs-14-fc-c50081-m">￥{{product.price}}</span><span class="fs-14-fc-7e7e7e-r"> ×{{quantity}}份 ×{{days}}天</span></div>
                </div>
            </div>

            <div class="barr-line"></div>
            <div class="cus-row">
                <div class="cus-row-col-6 v-a-m">
                    <div class="fs-16-fc-000000-m">订餐份数</div>
                    <div class="fs-14-fc-7e7e7e-r m-t-6">1份餐仅供一人</div>
                </div>
                <div class="cus-row-col-6 v-a-m t-al-r">
                    <div class="in-bl v-a-m quantity-plus-icon" v-on:click="deQuantity"><image src="/static/images/tarbar/icon_out_nor@3x.png" class="quantity-plus-icon"/></div>
                    <div class="in-bl v-a-m" style="margin: 0 30px;"><span class="quantity-plus">    {{quantity}}    </span></div>
                    <div class="in-bl v-a-m quantity-plus-icon" v-on:click="addQuantity"><image src="/static/images/tarbar/icon_add_nor@3x.png" class="quantity-plus-icon"/></div>
                </div>
            </div>

            <div class="barr-line"></div>
            <div class="cus-row">
                <div class="cus-row-col-6 v-a-m">
                    <span class="fs-16-fc-000000-m in-bl" style="line-height: 25px;">预定时间</span>
                </div>
                <div class="cus-row-col-6 v-a-m t-al-r">
                    <span class="fs-16-fc-c50081-m" v-on:click="openCalderSwitch">修改</span>
                </div>
            </div>

            <div class="in-bl fs-16-fc-000000-m m-t-16">共计:{{days}}天</div>
            <div class="fs-14-fc-7e7e7e-r m-t-6">明天</div>

            <div class="fs-14-fc-7e7e7e-r m-t-16">午餐配送时间：11:30 - 12:30</div>
            <div class="fs-14-fc-7e7e7e-r m-t-6">晚餐配送时间：18:30 - 19:30</div>

            <div class="m-t-24">
                <img src="" style="width: 80px;height: 80px;"/>
            </div>
        </div>


        <div class="white-panel m-t-16">

            <div class="fs-16-fc-000000-m">优惠</div><br/>

            <div class="cus-row">
                <div class="cus-row-col-6 v-a-m">
                    <div class="fs-16-fc-000000-m">花甲红包</div>
                    <div class="fs-14-fc-7e7e7e-r m-t-10">暂无备注</div>
                </div>
                <div class="cus-row-col-5 v-a-m">

                </div>
                <div class="cus-row-col-1 v-a-m t-al-r">
                    <img src="/static/images/icon_next_nor@3x.png" style="width: 13px;" mode="widthFix"/>
                </div>
            </div>



            <div class="barr-line"></div>

            <div class="cus-row">
                <div class="cus-row-col-6 v-a-m">
                    <span class="fs-16-fc-000000-m">订购优惠</span><br/>
                    <span class="fs-14-fc-7e7e7e-r">5日以上优惠20元</span>
                </div>
                <div class="cus-row-col-6 v-a-m fs-14-fc-7e7e7e-r t-al-r">
                    暂无优惠
                </div>
            </div>

        </div>

        <div class="white-panel m-t-16" v-on:click="doRemark" style="margin-bottom: 80px;">
            <div class="cus-row">
                <div class="cus-row-col-6 v-a-m">
                    <div class="fs-18-fc-000000-m">忌口备注</div>
                    <div class="fs-14-fc-7e7e7e-r m-t-10">{{remarkAndPlaceholder}}</div>
                </div>
                <div class="cus-row-col-5 v-a-m">

                </div>
                <div class="cus-row-col-1 v-a-m t-al-r">
                    <img src="/static/images/icon_next_nor@3x.png" style="width: 13px;" mode="widthFix"/>
                </div>
            </div>
        </div>

        <div class="fix-bottom3" style="background-color: #ffffff;padding: 14px;border-top:1px solid #EBE9E9 ;">
            <div class="cus-row cus-row-v-m">
                <div class="cus-row-col-6" id="total_price">
                    <span class="fs-24-fc-212229">￥{{price}}</span><span class="fs-24-fc-212229" id="price_label"></span>
                </div>
                <div class="cus-row-col-2"></div>
                <div class="cus-row-col-4">
                    <a class="yl_btn1 m-t-20"  v-on:click="nextStep()" style="margin-top: 0;">微信支付</a>
                </div>
            </div>
        </div>


        <div style="position: fixed;top:0;bottom: 0;left: 0;right: 0;background-color: rgba(28,36,75,0.80);z-index:9999" id="calder" v-if="calderSwitch">
            <div style="position: absolute;left:0;bottom: 0;right: 0;">


                <div style="padding-left: 16px;margin-bottom: 16px;">
                    <img src="/static/images/icon_unsuess_nor@3x.png" style="width: 24px;height: 24px;" v-on:click="closeCalderSwitch">
                </div>


                <div style="padding: 26px 16px 6px; background-color: #ffffff">

                    <div style="">
                        <span class="fs-18-fc-212229-m">预定时间</span><span style="margin-left: 16px;" class="fs-14-fc-7E7E7E-r">单次预定限五天内 节假日暂不供应</span>
                    </div>

                    <div class="t-al-c" style="font-size: 0;margin-top: 26px;">
                        <div class="in-bl" style="background: #F9F9FB;border: 1px solid #E1E1E1;border-radius: 17px 0px 0px 17px;" v-bind:class="{ 'active-type': (tabIndex == 1) }" v-on:click="setTab(1)"><span class="fs-16-fc-080808-r" style="line-height: 36px;padding: 0 24px;">单次</span></div>
                        <div class="in-bl" style="background: #F9F9FB;border-top: 1px solid #E1E1E1;border-bottom: 1px solid #E1E1E1;" v-bind:class="{ 'active-type': (tabIndex == 2) }" v-on:click="setTab(2)"><span class="fs-16-fc-080808-r" style="line-height: 36px;padding: 0 24px;">按周</span></div>
                        <div class="in-bl" style="background: #F9F9FB;border: 1px solid #E1E1E1;border-radius: 0px 17px 17px 0px;" v-bind:class="{ 'active-type': (tabIndex == 3) }" v-on:click="setTab(3)"><span class="fs-16-fc-080808-r" style="line-height: 36px;padding: 0 24px;">按月</span></div>
                    </div>

                    <div class="t-al-c" style="margin-top: 40px;">
                        <div class="cus-row">
                            <div class="cus-row-col-3 v-a-m t-al-l">
                                <span class="fs-16-fc-212229-m op3">{{prveMonth}}</span>
                            </div>
                            <div class="cus-row-col-6 v-a-m">
                                <div class="cus-row">
                                    <div class="cus-row-col-2 t-al-l">
                                        <i class="prev-icon"></i>
                                    </div>
                                    <div class="cus-row-col-8">
                                        <span class="fs-16-fc-212229-m">{{currentMonth}}</span>
                                    </div>
                                    <div class="cus-row-col-2 t-al-r">
                                        <i class="next-icon"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="cus-row-col-3 v-a-m t-al-r">
                                <span class="fs-16-fc-212229-m op3">{{nextMonth}}</span>
                            </div>
                        </div>
                        <div class="cus-row" style="margin-top: 22px;">
                            <div class="cus-row-col-1-7"><span class="fs-16-fc-212229-m">日</span></div>
                            <div class="cus-row-col-1-7"><span class="fs-16-fc-212229-m">一</span></div>
                            <div class="cus-row-col-1-7"><span class="fs-16-fc-212229-m">二</span></div>
                            <div class="cus-row-col-1-7"><span class="fs-16-fc-212229-m">三</span></div>
                            <div class="cus-row-col-1-7"><span class="fs-16-fc-212229-m">四</span></div>
                            <div class="cus-row-col-1-7"><span class="fs-16-fc-212229-m">五</span></div>
                            <div class="cus-row-col-1-7"><span class="fs-16-fc-212229-m">六</span></div>
                        </div>

                        <div class="cus-row cus-row-v-m" v-for="(ind,item) in lines" style="margin-top: 22px;">
                            <div class="cus-row-col-1-7"><span class="fs-16-fc-212229-m" v-bind:class="{'op3':data[item][0].forbiddenChosen,'chosen':data[item][0].chosen}" v-on:click="setBegin(data[item][0].day)">{{data[item][0].day}}</span></div>
                            <div class="cus-row-col-1-7"><span class="fs-16-fc-212229-m"  v-bind:class="{'op3':data[item][1].forbiddenChosen,'chosen':data[item][1].chosen}" v-on:click="setBegin(data[item][1].day)">{{data[item][1].day}}</span></div>
                            <div class="cus-row-col-1-7"><span class="fs-16-fc-212229-m"  v-bind:class="{'op3':data[item][2].forbiddenChosen,'chosen':data[item][2].chosen}" v-on:click="setBegin(data[item][2].day)">{{data[item][2].day}}</span></div>
                            <div class="cus-row-col-1-7"><span class="fs-16-fc-212229-m"  v-bind:class="{'op3':data[item][3].forbiddenChosen,'chosen':data[item][3].chosen}" v-on:click="setBegin(data[item][3].day)">{{data[item][3].day}}</span></div>
                            <div class="cus-row-col-1-7"><span class="fs-16-fc-212229-m"  v-bind:class="{'op3':data[item][4].forbiddenChosen,'chosen':data[item][4].chosen}" v-on:click="setBegin(data[item][4].day)">{{data[item][4].day}}</span></div>
                            <div class="cus-row-col-1-7"><span class="fs-16-fc-212229-m"  v-bind:class="{'op3':data[item][5].forbiddenChosen,'chosen':data[item][5].chosen}" v-on:click="setBegin(data[item][5].day)">{{data[item][5].day}}</span></div>
                            <div class="cus-row-col-1-7"><span class="fs-16-fc-212229-m" v-bind:class="{'op3':data[item][6].forbiddenChosen,'chosen':data[item][6].chosen}" v-on:click="setBegin(data[item][6].day)">{{data[item][6].day}}</span></div>

                        </div>

                    </div>

                    <div style="margin-top: 26px;">
                        <a class="yl_btn1 m-t-20" href="javascript:buy()" style="margin-top: 0;display: block;">确定2</a>
                    </div>
                </div>
            </div>
        </div>



    </div>

</template>

<script>
    import globalStore from '../../stores/global-store'
    import param from '../../utils/param'
    import _ from 'underscore'
    import { Base64 } from 'js-base64'

    export default {
        data () {
            return {
                msg: 'Hello',
                src: '',
                name:'',
                phone:'',
                pct:'',
                pct_code_name:'',
                address:'',
                neighborhoodId:0,
                attrArr:[],
                signTypeIndex:0,
                signTypeArray:['请先选择地址'],
                priceArray:[],
                idArray:[],
                timeService:[],
                timeServiceIndex:0,
                remark:'',
                lunchService:[],
                lunchIndex:0,
                dinnerService:[],
                dinnerIndex:0,
                deliverStartList:[],
                deliverStartIndex:0,
                periodPrice:[],
                periodIndex:0,
                product:{},
                quantity:0,
                days:1,

                year:2019,
                month:1,
                data:[
                    [{day:''},{day:''},{day:''},{day:''},{day:''},{day:''},{day:''}],
                    [{day:''},{day:''},{day:''},{day:''},{day:''},{day:''},{day:''}],
                    [{day:''},{day:''},{day:''},{day:''},{day:''},{day:''},{day:''}],
                    [{day:''},{day:''},{day:''},{day:''},{day:''},{day:''},{day:''}],
                    [{day:''},{day:''},{day:''},{day:''},{day:''},{day:''},{day:''}]
                ],
                s:'12',
                lines:[0,1,2,3,4],
                tabIndex:1,
                currentDay:'',
                calderSwitch:false
            }
        },
        created:function()
        {

        },
        watch: {
            pct: function (val) {
                console.log('watch:');
                console.log(val);
                //找对应的array
                for( let i of this.attrArr)
                {
                    if( i.neighborhood_id == this.pct ){
                        this.signTypeIndex = 0;
                        // this.signTypeArray = i.kv;
                        let arrTmpSize = [];
                        let arrTmpPrice = [];
                        let arrTmpId = [];

                        for ( let j of i.kv)
                        {
                            arrTmpSize.push(j.size);
                            arrTmpPrice.push(j.price);
                            arrTmpId.push(j.attr_id);
                        }
                        this.signTypeArray = arrTmpSize;
                        this.priceArray = arrTmpPrice;
                        this.idArray = arrTmpId;
                        console.log(i.kv);
                        break;
                    }
                }

            }
        },
        onShow:function(){
            if( globalStore.state.habbitRemarkShare )
            {
                //设置默认地址
//                let jsonData = JSON.parse(globalStore.state.addressShare);
//                this.name = jsonData.name;
//                this.phone = jsonData.phone;
//                this.pct = jsonData.pct;
//                this.pct_code_name = jsonData.pct_code_name;
//                this.address = jsonData.address;
                console.log(globalStore.state.habbitRemarkShare);
                this.remark = globalStore.state.habbitRemarkShare;

                //如果地址变了，那么面积也应当相应的变化哟
            }
            globalStore.commit('sethabbitRemarkShare','');
        },
        methods: {
            closeCalderSwitch:function()
            {
               this.calderSwitch = false;
            },
            openCalderSwitch:function()
            {
                this.calderSwitch = true;
            },
            deQuantity:function () {
                if( this.quantity > 1)
                {
                    this.quantity = this.quantity - 1;
                }
            },
            addQuantity:function(){
                this.quantity = this.quantity + 1;
            },
            goAddressList:function()
            {
                wx.navigateTo(
                    {
                        url: "/pages/address/main?openid=" + wx.getStorageSync('openid')
                    });
            },
            lunchTimeChange:function(e)
            {
                this.lunchIndex = e.mp.detail.value;
            },
            dinnerTimeChange:function(e)
            {
                this.dinnerIndex = e.mp.detail.value;
            },
            bindPickerChange:function(e)
            {
                console.log('picker发送选择改变，携带值为',  e.mp.detail.value)
                this.signTypeIndex = e.mp.detail.value;
            },
            serviceTimeChange: function(e)
            {
                console.log('picker发送选择改变，携带值为',  e.mp.detail.value)
                this.timeServiceIndex = e.mp.detail.value;
            },
            deliverStartChange:function(e)
            {
                this.deliverStartIndex = e.mp.detail.value;
            },
            periodServiceChange:function(e)
            {
                this.periodIndex = e.mp.detail.value;
            },
            doRemark:function()
            {
                console.log('doRemark');
                wx.navigateTo(
                {
                    url: "/pages/remark/main"
                });
            },
            nextStep: function()
            {
                let id = param.getParamValue('product_id');
                let requestData = {pct_code:this.pct,pct_code_name:this.pct_code_name,phone:this.phone,name:this.name,address:this.address,clean_service_time:this.timeService[this.timeServiceIndex],product_id:id,remark:this.remark,openid:wx.getStorageSync('openid'),size:this.signTypeArray[this.signTypeIndex],attr_id:this.idArray[this.signTypeIndex],lunch_service:this.lunchService[this.lunchIndex],dinner_service:this.dinnerService[this.dinnerIndex],people:2,attr_id:this.periodPrice[this.periodIndex].attr_id,service_start_time:this.deliverStartList[this.deliverStartIndex]};
                let url = globalStore.state.host + 'user/report-bill';
                this.$http.post(url,requestData).then((res)=>{
                    // console.log(res.data.data.arr);
                    // a.attrArr = res.data.data.arr;
                    // a.timeService = res.data.data.timeArr;

                    //下单成功跳转呀
                    if(res.data.status) {
                        let url = Base64.encode('/passport/pay-success');
                        wx.navigateTo(
                            {
                                url:'/pages/commonweb/main?url=' + url,
                            }
                        );
                    }

                }).catch(err=>{console.log('网络异常')})
            },
            setBegin:function(day)
            {
                console.log(day);
                //判断是否可以点击
                let startWeek = new Date(this.year,this.month - 1,1).getDay();
                day = day - 1;
                let mo  = parseInt((startWeek + day) / 7);
                let mod = (day+startWeek)%7;

                if ( this.data[mo][mod].forbiddenChosen )
                {
                    return;
                }

                if( this.data[mo][mod].chosen )
                {
                    return;
                }



                for(let i = 0 ;i < 35;i++)
                {
                    let mo2  = parseInt(i / 7);
                    let mod2 = i % 7;

                    if (this.data[mo2][mod2].chosen)
                    {
                        this.data[mo2][mod2].chosen = false;
                    }
                }



                this.data[mo][mod].chosen = true;



//                        let tmpData = this.data;
//                        this.data = tmpData;
//
//                        console.log(this.data[mo][mod].chosen);
                this.$forceUpdate();

            },
            setTab:function(index){
                this.tabIndex = index;
            }
        },
        mounted() {
            let id = param.getParamValue('product_id');
            let url = globalStore.state.host + 'passport/product-info';
            let a = this;


            let fullDay = new Date(this.year,this.month,0).getDate();
            let startWeek = new Date(this.year,this.month - 1,1).getDay();
            this.currentDay = new Date();

            let tmpData =  [
                [{day:''},{day:''},{day:''},{day:''},{day:''},{day:''},{day:''}],
                [{day:''},{day:''},{day:''},{day:''},{day:''},{day:''},{day:''}],
                [{day:''},{day:''},{day:''},{day:''},{day:''},{day:''},{day:''}],
                [{day:''},{day:''},{day:''},{day:''},{day:''},{day:''},{day:''}],
                [{day:''},{day:''},{day:''},{day:''},{day:''},{day:''},{day:''}]

            ];
            for(let i = 0;i<fullDay;i++)
            {
                let mo  = parseInt((i+startWeek) / 7);
                let mod = (i+startWeek)%7;


                //周六、周日不可点击
                tmpData[mo][mod].day = i+1;

                if(mod == 0 || mod == 6 || (new Date(this.year,this.month - 1,i + 1) < this.currentDay))
                {
                    tmpData[mo][mod].forbiddenChosen = true;
                }
            }

            this.data = tmpData;
            console.log('渲染日历');
            console.log(JSON.stringify(this.data));
            this.$forceUpdate();

            this.$http.get(url,{id:id,openid:wx.getStorageSync('openid')}).then((res)=>{
                console.log(res.data.data.arr);
                a.attrArr = res.data.data.arr;
                a.timeService = res.data.data.timeArr;
                a.lunchService = res.data.data.lunchArr;
                a.dinnerService = res.data.data.dinnerArr;
                a.deliverStartList = res.data.data.start_deliver_day;
                a.periodPrice = res.data.data.periodPrice;
                a.product = res.data.data.product;
            }).catch(err=>{console.log('网络异常')});



        },
        computed:{
            price:function()
            {
                return this.priceArray[this.signTypeIndex]
            },
            periodService:function()
            {
                console.log(this.periodPrice);
                return _.pluck(this.periodPrice,'period_name');
            },
            visitCoverImage:function()
            {
                return globalStore.state.host + this.product.cover_image;
            },
            remarkAndPlaceholder:function()
            {
                if(this.remark)
                {
                    return this.remark;
                } else
                {
                    return '暂无备注';
                }
            },
            prveMonth:function()
            {
//                        return (this.month - 1) + '月';
                return (new Date(this.year,this.month - 2).getMonth() + 1) + '月';
            },
            currentMonth:function()
            {
                return this.year + '年' + this.month + '月';
            },
            nextMonth:function()
            {
                return (new Date(this.year,this.month).getMonth() + 1) + '月';
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



  .fs-16-fc-212229-m{
      font-family: PingFangSC-Medium;
      font-size: 16px;
      color: #212229;
      line-height: 16px;
  }


  .fs-18-fc-212229-m{
      font-family: PingFangSC-Medium;
      font-size: 18px;
      color: #212229;
      line-height: 18px;
  }

  .op3{opacity: 0.3;}



  .next-icon{
      display: inline-block;
      width: 8px;
      height: 13px;
      background: url('/images/icon_next_nor@3x.png');
      background-size: 8px 13px;
  }


  .prev-icon
  {
      display: inline-block;
      width: 8px;
      height: 13px;
      background: url('/images/icon_next_nor@3x.png');
      background-size: 8px 13px;
      transform: rotate(180deg);
  }


  .barr-line{
      background: #FFFFFF;
      border: 1px solid #E1E1E1;
  }

  .active-type{
      border: 1px solid #C50081 !important;
      background-color: #ffffff !important;
  }

  .chosen{
      background: #C50081;
      border-radius: 14px;
      height: 28px;
      width: 28px;
      display: inline-block;
      color: #ffffff !important;
      line-height: 28px !important;
      opacity: 1;
  }

  .cus-row-col-1-7 span{line-height: 22px;}


  .fs-16-fc-080808-r {
      font-family: PingFangSC-Regular;
      font-size: 16px;
      color: #080808;
      letter-spacing: -0.39px;
      text-align: center;
      line-height: 16px;
  }
</style>