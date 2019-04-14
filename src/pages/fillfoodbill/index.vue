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

                <div class="fs-14-fc-7e7e7e-r" style="margin-top: 8px;">{{pct_code_name}} {{address}}</div>
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
                <div class="cus-row-col-6 v-a-m t-al-c">
                    <!--<div class="in-bl v-a-m quantity-plus-icon dp-n" v-on:click="deQuantity"><image src="/static/images/tarbar/icon_out_nor@3x.png" class="quantity-plus-icon"/></div>-->
                    <div class="in-bl v-a-m" style="margin: 0 30px;"><div class="quantity-plus">    {{quantity}}    </div></div>
                    <!--<div class="in-bl v-a-m quantity-plus-icon dp-n" v-on:click="addQuantity"><image src="/static/images/tarbar/icon_add_nor@3x.png" class="quantity-plus-icon"/></div>-->
                </div>
            </div>

            <div class="barr-line"></div>
            <div class="cus-row">
                <div class="cus-row-col-6 v-a-m">
                    <span class="fs-16-fc-000000-m in-bl" style="line-height: 25px;">预定时间</span>
                </div>
                <!--<div class="cus-row-col-6 v-a-m t-al-r dp-n">-->
                    <!--<span class="fs-16-fc-c50081-m" v-on:click="openCalderSwitch">修改</span>-->
                <!--</div>-->
            </div>

            <div class="in-bl fs-16-fc-000000-m m-t-16">共计:{{days}}天</div>
            <div class="fs-14-fc-7e7e7e-r m-t-6" style="line-height: 20px;">{{deliverDays}}</div>

            <div class="fs-14-fc-7e7e7e-r m-t-16">午餐配送时间：11:30 - 12:30</div>
            <div class="fs-14-fc-7e7e7e-r m-t-6">晚餐配送时间：18:30 - 19:30</div>
        </div>


        <div class="white-panel m-t-16">
            <div class="cus-row" style="margin-top: 14px;" v-on:click="goCoupon(product.id)">
                <div class="cus-row-col-6 v-a-m">
                    <div class="fs-16-fc-000000-m">代金券</div>
                    <div class="fs-14-fc-7e7e7e-r m-t-10" v-if="!activeCouponCount">暂无代金券</div>
                    <div class="fs-14-fc-c50081-m m-t-10" v-else>{{product.product_name}}代金券 {{activeCouponCount}}张</div>
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
                    <div class="fs-16-fc-000000-m">花甲会员优惠</div>
                    <div class="fs-14-fc-7e7e7e-r m-t-10">暂未开通会员</div>
                </div>
            </div>

            <div class="barr-line"></div>

            <div class="t-al-r fs-18-fc-000000-m">小计 ￥{{product.price * activeCouponCount}}</div>

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
                <div class="cus-row-col-8 t-al-r v-a-m" id="total_price">
                    <span class="fs-18-fc-000000-m" style="margin-right: 26px;">￥ {{price - product.price * activeCouponCount}}元</span>
                </div>
                <div class="cus-row-col-4 v-a-m">
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
                                    <div class="cus-row-col-2 t-al-l" v-on:click="monthGo(-1)">
                                        <i class="prev-icon"></i>
                                    </div>
                                    <div class="cus-row-col-8">
                                        <span class="fs-16-fc-212229-m">{{currentMonth}}</span>
                                    </div>
                                    <div class="cus-row-col-2 t-al-r" v-on:click="monthGo(1)">
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
                        <a class="yl_btn1 m-t-20" v-on:click="setChosenDay" style="margin-top: 0;display: block;">确定</a>
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

                year:2019,
                month:1,
                data:[
                    [{day:''},{day:''},{day:''},{day:''},{day:''},{day:''},{day:''}],
                    [{day:''},{day:''},{day:''},{day:''},{day:''},{day:''},{day:''}],
                    [{day:''},{day:''},{day:''},{day:''},{day:''},{day:''},{day:''}],
                    [{day:''},{day:''},{day:''},{day:''},{day:''},{day:''},{day:''}],
                    [{day:''},{day:''},{day:''},{day:''},{day:''},{day:''},{day:''}],
                    [{day:''},{day:''},{day:''},{day:''},{day:''},{day:''},{day:''}]
                ],
                s:'12',
                lines:[0,1,2,3,4,5],
                tabIndex:1,
                currentDay:'',
                startDay:'',
                calderSwitch:false,
                chosenDay:'',
                chosenType:'',
                openid:'',
                couponId:'',
                chosenCoupon:[]
            }
        },
        watch: {
        },
        onShow:function(){
            if( globalStore.state.habbitRemarkShare )
            {
                console.log(globalStore.state.habbitRemarkShare);
                this.remark = globalStore.state.habbitRemarkShare;
            }

            if ( globalStore.state.addressShare )
            {
                let jsonData = JSON.parse(globalStore.state.addressShare);
                this.name = jsonData.name;
                this.phone = jsonData.phone;
                this.pct = jsonData.pct;
                this.pct_code_name = jsonData.pct_code_name;
                this.address = jsonData.address;
            }


            if ( globalStore.state.chosenCoupon )
            {
                let chosenCoupon = globalStore.state.chosenCoupon;
                console.log('回调的:');
                console.log(JSON.stringify(chosenCoupon));
                this.chosenCoupon = chosenCoupon;
            }

            globalStore.commit('setAddressShare','');
            globalStore.commit('sethabbitRemarkShare','');
            globalStore.commit('setChosenCoupon','');
        },
        methods: {
            goCoupon(type){
                console.log('当前选中');
                console.log(JSON.stringify(this.activeIdArr));
                wx.navigateTo(
                    {
                        url:'/pages/chosencoupon/main?product_id='+this.product.id+'&ids=' + this.activeIdArr.join(',') + '&max=' + (this.days * this.quantity)
                    }
                );
            },
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
                        url: "/pages/address/main?chosenType=1&openid=" + wx.getStorageSync('openid')
                    });
            },
            setChosenDay:function () {
                this.chosenDay = this.startDay;
                this.chosenType = this.tabIndex;
                this.closeCalderSwitch();
            },
            lunchTimeChange:function(e)
            {
                this.lunchIndex = e.mp.detail.value;
            },
            dinnerTimeChange:function(e)
            {
                this.dinnerIndex = e.mp.detail.value;
            },
            monthGo:function(direction)
            {
                let currTmp = new Date(this.year,this.month - 1 + direction,1);
                this.year = currTmp.getFullYear();
                this.month = currTmp.getMonth() + 1;
//                console.log(currTmp.getFullYear());
//                console.log(currTmp.getMonth + 1);

                this.updateCalder();

            },
            updateCalder:function()
            {
                let fullDay = new Date(this.year,this.month,0).getDate();
                let startWeek = new Date(this.year,this.month - 1,1).getDay();

                console.log(fullDay);
                console.log(startWeek);

                let tmpData =  [
                    [{day:''},{day:''},{day:''},{day:''},{day:''},{day:''},{day:''}],
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

                    console.log(mo);
                    console.log(mod);

                    //周六、周日不可点击
                    tmpData[mo][mod].day = i+1;

                    if(mod == 0 || mod == 6 || (new Date(this.year,this.month - 1,i + 1) < this.currentDay))
                    {
                        tmpData[mo][mod].forbiddenChosen = true;
                    }

                    //设置为选中
                    console.log('選中的日期');
                    console.log(this.chosenDays);
                    console.log(new Date(this.year,this.month - 1,i + 1).toString());
                    console.log('選中的日期end');
                    if( _.indexOf(this.chosenDays, new Date(this.year,this.month - 1,i + 1).toString()) !== -1 ) {
                        tmpData[mo][mod].chosen = true;
                    }
                }

                this.data = tmpData;
                console.log('渲染日历');
                console.log(JSON.stringify(this.data));
                this.$forceUpdate();

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
                let a = this;

                if(!this.pct)
                {
                    this.$mptoast('请选择服务地址');
                    return;
                }


                //TODO:判断地址是否为空
                if( !this.openid )
                {
                    this.$mptoast('页面获取用户信息失败');
                    return;
                }


                let requestData = {pct_code:this.pct,pct_code_name:this.pct_code_name,phone:this.phone,name:this.name,address:this.address,clean_service_time:this.timeService[this.timeServiceIndex],product_id:id,remark:this.remark,openid:wx.getStorageSync('openid'),size:this.signTypeArray[this.signTypeIndex],lunch_service:this.lunchService[this.lunchIndex],dinner_service:this.dinnerService[this.dinnerIndex],people:2,service_start_time:this.deliverStartList[this.deliverStartIndex],user_openid:this.openid,quantity:this.quantity,tabIndex:this.chosenType,couponIds:this.activeIdArr.join(',')};
                let url = globalStore.state.host + 'user/report-bill';
                this.$http.post(url,requestData).then((res)=>{
                    //下单成功跳转呀
                    if(res.data.status) {

                        if( res.data.data == '333' )
                        {
                            globalStore.commit('setPaySuccessBack','');
                            let url = Base64.encode('/passport/pay-success?openid=' + param.getOpenid());
                            wx.redirectTo(
                                {
                                    url:'/pages/commonweb/main?url=' + url,
                                }
                            )
                            return;
                        }


                        var jsonData = JSON.parse(res.data.data);
                        console.log(jsonData);

                        wx.requestPayment({
                            'timeStamp': jsonData.timeStamp,
                            'nonceStr': jsonData.nonceStr,
                            'package': jsonData.package,
                            'signType': jsonData.signType,
                            'paySign': jsonData.paySign,
                            'success':function(res){
                                globalStore.commit('setPaySuccessBack','');
                                let url = Base64.encode('/passport/pay-success?openid=' + param.getOpenid());
                                wx.redirectTo(
                                    {
                                        url:'/pages/commonweb/main?url=' + url,
                                    }
                                )
                            },
                            'fail':function(res){
                                a.$mptoast('支付失败');
                            }
                        });
                    }

                }).catch(err=>{console.log('网络异常')})
            },
            setBegin:function(day)
            {
                let tmpStartDay = new Date(this.year,this.month - 1,day);

                let startWeek = new Date(this.year,this.month - 1,1).getDay();
                day = day - 1;
                let mo  = parseInt((startWeek + day) / 7);
                let mod = (day+startWeek)%7;

                if ( this.data[mo][mod].forbiddenChosen )
                {
                    return;
                }

                // if( this.data[mo][mod].chosen )
                // {
                //     return;
                // }
                if ( tmpStartDay == this.startDay)
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

                this.startDay = tmpStartDay;
                this.updateCalder()
            },
            setTab:function(index){
                this.tabIndex = index;

                this.updateCalder();
            },
            getDateArr:function(startDay,n)
            {
                let conFlag = true;
                let arr = [startDay.toString()];
                let beginDay = new Date(startDay.getFullYear(),startDay.getMonth(),startDay.getDate());
                while(conFlag)
                {
                    //
                    beginDay = new Date(beginDay.getFullYear(),beginDay.getMonth(),beginDay.getDate() + 1);
                    if( _.indexOf([0,6],beginDay.getDay()) !== -1 )
                    {
                        continue;
                    }

                    arr.push(beginDay.toString());

                    if( arr.length > (n - 1))
                    {
                        conFlag = false;
                    }
                }
                return arr;
            },
            userOpenid(){
                let a = this;
                wx.login({
                    success: function (res) {
                        if (res.code) {
                            //发起网络请求
                            console.log(res.code);
                            wx.request({
                                url: globalStore.state.host + 'activity/common-info2',
                                data: {
                                    code: res.code
                                },
                                success: function (requestRes) {
                                    console.log(requestRes);
                                    if (requestRes.data.status) {
                                        a.openid = requestRes.data.data.openid;
                                    }

                                }
                            })
                        } else {
                            console.log('登录失败！' + res.errMsg)
                        }
                    }
                });
            }

        },
        mounted() {
            let id = param.getParamValue('product_id');
            let startDayStr = param.getParamValue('startDay');
            let startDayStrArr = startDayStr.split('-');
            let url = globalStore.state.host + 'passport/product-info';
            let a = this;



            
            this.startDay = new Date(startDayStrArr[0],startDayStrArr[1] - 1,startDayStrArr[2]);


            this.currentDay = new Date();
            this.quantity =  parseInt(param.getParamValue('quantity'));
            this.chosenDay = this.startDay;
            this.year = this.startDay.getFullYear();
            this.month = this.startDay.getMonth() + 1;
            this.tabIndex = param.getParamValue('tabIndex');
            this.chosenType = this.tabIndex;


            this.updateCalder();


            this.$http.get(url,{id:id,openid:wx.getStorageSync('openid')}).then((res)=>{
                console.log(res.data.data.arr);
                a.attrArr = res.data.data.arr;
                if( res.data.data.userAddress[0] )
                {
                    a.name = res.data.data.userAddress[0].address_name;
                    a.phone = res.data.data.userAddress[0].mobile;
                    a.pct = res.data.data.userAddress[0].pct_code;
                    a.pct_code_name = res.data.data.userAddress[0].pct_code_name;
                    a.address = res.data.data.userAddress[0].address;
                }


                a.timeService = res.data.data.timeArr;
                a.lunchService = res.data.data.lunchArr;
                a.dinnerService = res.data.data.dinnerArr;
                a.deliverStartList = res.data.data.start_deliver_day;
                a.periodPrice = res.data.data.periodPrice;
                a.product = res.data.data.product;
                a.couponId = res.data.data.couponId;

                a.chosenCoupon= _.pluck(res.data.data.coupons,'id');

            }).catch(err=>{console.log('网络异常')});



            /*尝试异步去获取用户的openid*/
            this.userOpenid();



        },
        computed:{
            price:function()
            {
                let totalPrice = this.quantity * this.product.price * this.days;
                return totalPrice.toFixed(2);
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
            },
            deliverDays:function()
            {
                let arr = [];

                if(!this.chosenDay)
                {
                    return '';
                }

                let dateArr = [];
                console.log(this.chosenDay.toString());
                if( this.days == 1 )
                {
                    dateArr = [this.chosenDay.toString()];
                } else
                {
                    dateArr = this.getDateArr(this.chosenDay,this.days);
                }

                console.log(dateArr);

                dateArr.forEach(function(value, index, array){
                    //执行某些操作
                    let tmpDate = new Date(value);
                    let tmpStr = (tmpDate.getMonth() +1) + '月' + (tmpDate.getDate()) + '日';
                    arr.push(tmpStr);
                });

                let arrStr = arr.join(',');
                console.log(arrStr);
                return arrStr;
            },
            chosenTypeText:function()
            {
                if ( this.chosenType == 1 )
                {
                    return 1;
                } else if ( this.chosenType == 2)
                {
                    return 5;
                } else if ( this.chosenType == 3)
                {
                    return 21;
                }
            },
            chosenDays:function()
            {
                if ( this.startDay > this.currentDay )
                {
                    if( this.tabIndex == 1 )
                    {
                        return [this.startDay.toString()];
                    } else if( this.tabIndex == 2)
                    {
                        return this.getDateArr(this.startDay,7);
                    } else {
                        return this.getDateArr(this.startDay,30);
                    }
                } else
                {
                    return [];
                }
            },
            days:function()
            {
                if ( this.chosenType == 1 )
                {
                    return 1;
                }else if ( this.chosenType == 2)
                {
                    return 7;
                }else
                {
                    return 30;
                }
            },
            activeCouponCount:function()
            {
                // return 3;
                let activeIds = this.chosenCoupon.slice(0,this.quantity * this.days);
                return activeIds.length;
            },
            activeIdArr:function()
            {
                let ids = this.chosenCoupon.slice(0,this.quantity * this.days);
                return ids;
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
      background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAA/CAYAAABjJtHDAAAAAXNSR0IArs4c6QAAAYdJREFUaAXN2t1tgzAQB/C6L4yRbpIMwAMjdLSOwAZJNknGQEKiXFUsCDbxx/3vzi9gY+GfzrqHw7iPSOu67msYhp+mab77vn9EpkGHP0Nv/4fdpmk6z8Ab9UPz0GPudYEV7LQ8c8495whepCO4wYVgmkCPO4JpAf9wKTANYDAhFkjoOifJSSpJsrZ1jZVIEo+jhXO2l+ajgRucNeAOZwkYxFkBRnEWgIc4beBbnCYwCacFTMZpALNw0sBsnCSwCCcFLMZJAKtwaGA1DglkwaGAbDgEkBXHDWTHcQIhOC4gDMcBhOJqgXBcDVAER8C2bS/jOF7pPqXNZeddBFdaD8NxpTD63AbF1cBo62G4WhgMxwGD4Lhg7DhOGCuOG8aGQ8BYcChYNQ4Jq8KhYcU4CVgRTgqWjZOEZeGkYck4DVgSTgv2FqcJO8Rpw6I4C7Agzgpsh7ME2+CswTzOIoxw2cfo6ANgQi3Nl4Yp0ZOEEdDjqHMElIbtcDGgBiyIewVqwaK4FVD1L7BfS2TUzqpVOAIAAAAASUVORK5CYII=');
      background-size: 8px 13px;
  }


  .prev-icon
  {
      display: inline-block;
      width: 8px;
      height: 13px;
      background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAA/CAYAAABjJtHDAAAAAXNSR0IArs4c6QAAAYdJREFUaAXN2t1tgzAQB/C6L4yRbpIMwAMjdLSOwAZJNknGQEKiXFUsCDbxx/3vzi9gY+GfzrqHw7iPSOu67msYhp+mab77vn9EpkGHP0Nv/4fdpmk6z8Ab9UPz0GPudYEV7LQ8c8495whepCO4wYVgmkCPO4JpAf9wKTANYDAhFkjoOifJSSpJsrZ1jZVIEo+jhXO2l+ajgRucNeAOZwkYxFkBRnEWgIc4beBbnCYwCacFTMZpALNw0sBsnCSwCCcFLMZJAKtwaGA1DglkwaGAbDgEkBXHDWTHcQIhOC4gDMcBhOJqgXBcDVAER8C2bS/jOF7pPqXNZeddBFdaD8NxpTD63AbF1cBo62G4WhgMxwGD4Lhg7DhOGCuOG8aGQ8BYcChYNQ4Jq8KhYcU4CVgRTgqWjZOEZeGkYck4DVgSTgv2FqcJO8Rpw6I4C7Agzgpsh7ME2+CswTzOIoxw2cfo6ANgQi3Nl4Yp0ZOEEdDjqHMElIbtcDGgBiyIewVqwaK4FVD1L7BfS2TUzqpVOAIAAAAASUVORK5CYII=');
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
