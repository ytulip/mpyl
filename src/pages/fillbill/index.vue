<template>

    <div class="p16 bg-f9f9fb">

        <div class="white-panel">
            <div class="cus-row">
                <div class="cus-row-col-6 v-a-m">
                    <span class="fs-18-fc-000000-m in-bl" style="line-height: 25px;">服务地址</span>
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
                    <div class="fs-18-fc-000000-m">服务时间</div>
                    <div class="fs-14-fc-7e7e7e-r m-t-10">{{selectedValueText}}</div>
                </div>
                <div class="cus-row-col-6 v-a-m t-al-r" v-on:click="pctSwitch">
                    <img src="/static/images/icon_next_nor@3x.png" style="width: 13px;" mode="widthFix"/>
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
                    <div class="m-t-10"><span class="fs-14-fc-c50081-m">￥{{product.price}}</span><span class="fs-14-fc-7e7e7e-r"> × {{selectedTabIndexText}}</span></div>
                </div>
            </div>

            <div class="barr-line"></div>
            <div class="cus-row">
                <div class="cus-row-col-6 v-a-m">
                    <span class="fs-16-fc-000000-m in-bl" style="line-height: 25px;">服务时长</span>
                </div>
                <div class="cus-row-col-6 v-a-m t-al-r">
                    <span class="fs-16-fc-c50081-m" v-on:click="openCalderSwitch">修改</span>
                </div>
            </div>

            <div class="in-bl fs-16-fc-000000-m m-t-16">共计:{{selectedTabIndexText}}</div>
        </div>


        <div class="white-panel m-t-16">

            <div class="cus-row" style="margin-top: 14px;">
                <div class="cus-row-col-6 v-a-m">
                    <div class="fs-16-fc-000000-m">代金券</div>
                    <div class="fs-14-fc-7e7e7e-r m-t-10">暂无代金券</div>
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
                    <div class="fs-16-fc-000000-m">订购优惠</div>
                    <div class="fs-14-fc-7e7e7e-r m-t-10">5日以上优惠20元</div>
                </div>
                <div class="cus-row-col-6 v-a-m fs-14-fc-7e7e7e-r t-al-r">暂无优惠</div>
            </div>

        </div>

        <div class="white-panel m-t-16" v-on:click="doRemark" style="margin-bottom: 80px;">
            <div class="cus-row">
                <div class="cus-row-col-6 v-a-m">
                    <div class="fs-18-fc-000000-m">服务备注</div>
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
                    <span class="fs-18-fc-000000-m" style="margin-right: 26px;">￥ {{price}}元</span>
                </div>
                <div class="cus-row-col-4 v-a-m">
                    <a class="yl_btn1 m-t-20"  v-on:click="nextStep()" style="margin-top: 0;">微信支付</a>
                </div>
            </div>
        </div>



        <view class="fix-bottom2 t-al-c" wx:if="{{layerShow}}">
            <view class="cus-row" style="padding: 0 16px;border-bottom: 1px solid #eeeeee;border-top: 1px solid #eeeeee">
                <view class="cus-row-col-2 fs-14-fc-95909E v-a-m" style="line-height: 40px;" v-on:click="cancelPCT">
                    取消
                </view>
                <view class="cus-row-col-8">

                </view>
                <view class="cus-row-col-2 fs-14-fc-5EC11A v-a-m t-al-r" style="line-height: 40px;" v-on:click="choosePCT">
                    确定
                </view>
            </view>
            <picker-view indicator-style="height: 50px;" style="width: 100%; height: 220px;font-size: 14px;color: #484848;" :value="value" @change="bindChange">
                <picker-view-column>
                    <view wx:for="{{years}}" style="line-height: 50px">{{item}}</view>
                </picker-view-column>
                <picker-view-column>
                    <view wx:for="{{months}}" style="line-height: 50px">{{item}}点</view>
                </picker-view-column>
                <picker-view-column>
                    <view wx:for="{{days}}" style="line-height: 50px">{{item}}分</view>
                </picker-view-column>
            </picker-view>
        </view>


        <div style="position: fixed;top:0;bottom: 0;left: 0;right: 0;background-color: rgba(28,36,75,0.80);z-index:9999" id="calder" v-if="calderSwitch">
            <div style="position: absolute;left:0;bottom: 0;right: 0;">

                <div style="padding-left: 16px;margin-bottom: 16px;">
                    <img src="/static/images/icon_close_nor@3x.png" style="width: 24px;height: 24px;" v-on:click="closeCalderSwitch">
                </div>

                <div style="padding: 26px 16px 6px; background-color: #ffffff;border-top-left-radius: 16px;border-top-right-radius: 16px;">

                    <div class="fs-18-fc-212229-m">服务时长</div>

                    <div class="row m-t-24">
                        <div class="cus-row-col-4 v-a-m">
                            <div class="select-block" v-bind:class="{ 'select-block-active': (tabIndex == 1) }" v-on:click="setTab(1)">
                                2小时
                                <div class="selected" v-if="tabIndex == 1"></div>
                            </div>
                        </div>
                        <div class="cus-row-col-4 v-a-m">
                            <div class="select-block" v-bind:class="{ 'select-block-active': (tabIndex == 2) }" v-on:click="setTab(2)">2.5小时<div class="selected" v-if="tabIndex == 2"></div></div>
                        </div>
                        <div class="cus-row-col-4 v-a-m">
                            <div class="select-block" v-bind:class="{ 'select-block-active': (tabIndex == 3) }" v-on:click="setTab(3)">3小时<div class="selected" v-if="tabIndex == 3"></div></div>
                        </div>
                    </div>
                    <div class="row m-t-16">
                        <div class="cus-row-col-4 v-a-m">
                            <div class="select-block" v-bind:class="{ 'select-block-active': (tabIndex == 4) }" v-on:click="setTab(4)">3.5小时<div class="selected" v-if="tabIndex == 4"></div></div>
                        </div>
                        <div class="cus-row-col-4 v-a-m">
                            <div class="select-block" v-bind:class="{ 'select-block-active': (tabIndex == 5) }" v-on:click="setTab(5)">4小时<div class="selected" v-if="tabIndex == 5"></div></div>
                        </div>
                        <div class="cus-row-col-4 v-a-m">
                            <div class="select-block" v-bind:class="{ 'select-block-active': (tabIndex == 6) }" v-on:click="setTab(6)">4.5小时<div class="selected" v-if="tabIndex == 6"></div></div>
                        </div>
                    </div>
                    <div class="row m-t-16">
                        <div class="cus-row-col-4 v-a-m">
                            <div class="select-block" v-bind:class="{ 'select-block-active': (tabIndex == 7) }" v-on:click="setTab(7)">5小时<div class="selected" v-if="tabIndex == 7"></div></div>
                        </div>
                        <div class="cus-row-col-4 v-a-m">
                            <div class="select-block" v-bind:class="{ 'select-block-active': (tabIndex == 8) }" v-on:click="setTab(8)">5.5小时<div class="selected" v-if="tabIndex == 8"></div></div>
                        </div>
                        <div class="cus-row-col-4 v-a-m">
                            <div class="select-block" v-bind:class="{ 'select-block-active': (tabIndex == 9) }" v-on:click="setTab(9)">6小时<div class="selected" v-if="tabIndex == 9"></div></div>
                        </div>
                    </div>

                    <div class="fs-18-fc-212229-m m-t-24">服务时长</div>

                    <div class="m-t-16 fs-14-fc-7E7E7E-r" style="line-height: 18px;">
                        面积60平方以下  2-3小时<br/>
                        面积60-120平  3-4小时<br/>
                        面积120-200平  4-5小时<br/>
                        面积200平以上  5-6小时<br/>
                        为了确保您的服务体验以及按时完成服务，请您确保足够的服务时长，如服务提前结束，我们会将服务费用退还。<br/>
                    </div>

                    <div style="margin-top: 26px;">
                        <a class="yl_btn1 m-t-20" v-on:click="setChosenDay" style="margin-top: 0;display: block;">确定</a>
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
    import _ from 'underscore'
    import mptoast from 'mptoast'
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
                selectedTabIndex:0,
                years:['2月28日 明天','3月1日 星期五'],
                months:['9','10','13','14'],
                days:['00','10','20','30','40','50'],
                layerShow:false,
                value: [0, 0, 0],
                selectedValue:[]
            }
        },
        watch: {
        },
        components: {
            mptoast
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

            if ( globalStore.state.addressShare )
            {
                let jsonData = JSON.parse(globalStore.state.addressShare);
                this.name = jsonData.name;
                this.phone = jsonData.phone;
                this.pct = jsonData.pct;
                this.pct_code_name = jsonData.pct_code_name;
                this.address = jsonData.address;
            }

            globalStore.commit('setAddressShare','');
            globalStore.commit('sethabbitRemarkShare','');
        },
        methods: {
            pctSwitch:function()
            {
                this.layerShow = true;
            },
            cancelPCT:function(e){
                // this.setData(
                //     {
                //         layerShow:false
                //     }
                // );
                this.layerShow = false;
            },

            choosePCT:function(e)
            {


                //回写数据


                this.layerShow = false;
                this.selectedValue = this.value;
                // this.setData(
                //     {
                //         chooseText:this.data.years[this.data.value[0]] + this.data.months[this.data.value[1]] + this.data.days[this.data.value[2]],
                //         chooseValue:this.data.value,
                //         layerShow:false
                //     }
                // );
            },
            bindChange:function(e)
            {
                // console.log('pickerview');
                // console.log(e.mp.detail);
                // value: [0, 0, 0]
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
                this.selectedTabIndex = this.tabIndex;
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



                if( !this.selectedTabIndex )
                {
                    this.$mptoast('请选择服务时长');
                    return;
                }

                //TODO:判断地址是否为空
                if( !this.openid )
                {
                    this.$mptoast('页面获取用户信息失败');
                    return;
                }

                if( !this.selectedValue.length )
                {
                    this.$mptoast('请选择服务时间');
                    return;
                }


                let requestData = {pct_code:this.pct,pct_code_name:this.pct_code_name,phone:this.phone,name:this.name,address:this.address,clean_service_time:this.selectedTabIndex,product_id:id,remark:this.remark,openid:wx.getStorageSync('openid'),service_start_time:this.selectedValue,user_openid:this.openid};
                let url = globalStore.state.host + 'user/report-bill';
                this.$http.post(url,requestData).then((res)=>{
                    // console.log(res.data.data.arr);
                    // a.attrArr = res.data.data.arr;
                    // a.timeService = res.data.data.timeArr;

                    //下单成功跳转呀
                    if(res.data.status) {
                        // let url = Base64.encode('/passport/pay-success');
                        // wx.redirectTo(
                        //     {
                        //         url:'/pages/commonweb/main?url=' + url,
                        //     }
                        // );
                        var jsonData = JSON.parse(res.data.data);
                        console.log(jsonData);
                        wx.requestPayment({
                            'timeStamp': jsonData.timeStamp,
                            'nonceStr': jsonData.nonceStr,
                            'package': jsonData.package,
                            'signType': jsonData.signType,
                            'paySign': jsonData.paySign,
                            'success':function(res){
                                // a.$mptoast('支付成功');
                                // util.mAlert('支付成功');
                                // util.kit.goHome();
                                wx.redirectTo(
                                    {
                                        url:'/pages/activity/success'
                                    }
                                );
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
            let url = globalStore.state.host + 'passport/product-info';
            let id = param.getParamValue('product_id');
            let a = this;
            this.$http.get(url,{id:id,openid:wx.getStorageSync('openid')}).then((res)=>{
                a.attrArr = res.data.data.arr;
                if( res.data.data.userAddress[0] )
                {
                    a.name = res.data.data.userAddress[0].address_name;
                    a.phone = res.data.data.userAddress[0].mobile;
                    a.pct = res.data.data.userAddress[0].pct_code;
                    a.pct_code_name = res.data.data.userAddress[0].pct_code_name;
                    a.address = res.data.data.userAddress[0].address;
                }

                a.product = res.data.data.product;
            }).catch(err=>{console.log('网络异常')});



            /*尝试异步去获取用户的openid*/
            this.userOpenid();



        },
        computed:{
            visitCoverImage:function()
            {
                return globalStore.state.host + this.product.cover_image;
            },
            remarkAndPlaceholder()
            {
                return '暂无备注';
            },
            selectedTabIndexText:function()
            {
                if(this.selectedTabIndex)
                {
                    return  (1.5 + this.selectedTabIndex * 0.5) +  '小时';
                }else {
                    return '0小时';
                }
            },
            selectedValueText()
            {
                if( this.selectedValue.length )
                {
                    return this.years[this.selectedValue[0]] + this.months[this.selectedValue[1]] + this.days[this.selectedValue[2]];
                } else
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

    .select-block{
        background: #FFFFFF;
        border: 1px solid #F3F3F3;
        border-radius: 4px;
        width: 103px;
        height: 57px;
        font-family: PingFangSC-Medium;
        font-size: 18px;
        color: #000000;
        letter-spacing: -0.35px;
        display: inline-block;
        line-height: 57px;
        text-align: center;
        position: relative;
    }

    .select-block-active{border: 1px solid  #C50081;}

    .selected{
        width: 0;height: 0;border-style: solid;border-width: 24px 24px 0 0;border-color: #CE388E transparent transparent transparent;position: absolute;top:0;left: 0;
    }
</style>
