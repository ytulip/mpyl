<template>
  <div class="p16">


    <div class="address-panel" style="padding: 0 16px;">

      <div class="input-line">
        <input placeholder="输入收货人姓名" class="fs-16-fc-000000-m" v-model="real_name">
      </div>


      <div class="input-line">
        <input placeholder="输入收货人手机号码" class="fs-16-fc-000000-m" type="number" v-model="phone">
      </div>


      <div class="input-line">
        <picker @change="bindAttend2Change" :value="neighborhoodIndex" :range="neighborhoodArr">
          <view class="picker fs-16-fc-000000-m" style="padding-right: 14px;position: relative;" v-bind:class="{'fs-16-fc-7E7E7E-r':neighborhoodIndex === -1}">
            {{neighborhoodVal}}
            <div style="position:absolute;right: 0;top:0;">
              <image src="/static/images/icon_bnext_nor@3x.png" mode="widthFix" style="width:8px;height: 13px;"></image>
            </div>
          </view>
        </picker>
      </div>

      <div class="input-line" style="border-bottom: none;">
        <input placeholder="详细地址：如街道、门牌号" class="fs-16-fc-000000-m" v-model="address">
      </div>

    </div>

    <div class="address-panel m-t-16 p16" style="padding: 20px 16px;">
      <div class="cus-row">
        <div class="cus-row-col-6 fs-16-fc-000000-m v-a-m">设置为默认地址</div>
        <div class="cus-row-col-6 v-a-m t-al-r">
          <div class="in-bl v-a-m fs-16-fc-7E7E7E-r">{{switchTxt}}</div>
          <div class="in-bl v-a-m"><image v-bind:src="defaultSwitchSrc" style="width:51px;height: 31px;margin-left: 12px;"  v-on:click="setDefault"/></div>
        </div>
      </div>
    </div>

    <div class="address-panel m-t-16 p16">
      <div class="cus-row" style="margin: 16px 0;">
        <div class="cus-row-col-6 fs-16-fc-c50081-m v-a-m" v-on:click="deleteAddress">删除地址</div>
      </div>
    </div>


    <div class="fix-bottom3" style="background-color: #ffffff;padding: 14px;border-top:1px solid #EBE9E9 ;">
      <a class="yl_btn1"  v-on:click="nextStep()" style="margin-top: 0;">保存</a>
    </div>

    <mptoast />

  </div>
</template>

<script>
    import globalStore from '../../stores/global-store'
    import _ from 'underscore'
    import param from '../../utils/param'
    import mptoast from 'mptoast'

    export default {
        data () {
            return {
                msg: 'Hello',
                banners:{},
                src:'',
                neighborhood:[],
                neighborhoodArr:[],
                neighborhoodIndex:-1,
                real_name:'',
                phone:'',
                address:'',
                addressDefault:0
            }
        },
        created:function()
        {

        },
        components: {
          mptoast
        },
        methods: {
            pageInit()
            {
              let url = globalStore.state.host + 'user/address-info';
              let param = {openid:wx.getStorageSync('openid')}
              this.$http.get(url,param).then((res)=>{
                // console.log(res);
                // this.banners = res.data.banners;

                //去拿地址
                this.neighborhood = res.data.data.neighborhood;
                this.neighborhoodArr = _.pluck(this.neighborhood,'ITEMNAME');
                this.addressInfo();
              }).catch(err=>{console.log(3)})
            },

            addressInfo()
            {
                if( !this.id )
                {
                    return;
                }

                //UserAddressData
                let url = globalStore.state.host + 'user/user-address-data';
                let param = {openid:wx.getStorageSync('openid'),address_id:this.id}
                this.$http.get(url,param).then((res)=>{
                    this.real_name = res.data.data.address_name;
                    this.phone = res.data.data.mobile;
                    this.address = res.data.data.address;
                    this.addressDefault = res.data.data.is_default;
                    this.neighborhoodIndex = this.neighborhoodArr.indexOf(res.data.data.pct_code_name);

                    //pct code
                }).catch(err=>{console.log(3)})


            },
            bindAttend2Change(e)
            {
              this.neighborhoodIndex = e.mp.detail.value;
            },
            nextStep()
            {
                // wx.showLoading({
                //   title: '正在处理',
                //   mask:true
                // })

              let requestData =  {real_name:this.real_name, phone:this.phone,address:this.address,neighborhood:this.neighborhoodId(),is_default:this.addressDefault};

              param.commonRequest(
                      {
                        url:globalStore.state.host + '/user/add-mod-address',
                        page:this,
                        data:requestData,
                        success:function(res)
                        {
                          if(res.status)
                          {
                            wx.navigateBack({
                              delta: 1
                            })
                          }
                        },
                        error:function () {

                        }
                      }
              );
            },
            neighborhoodId()
            {
              return this.neighborhood[this.neighborhoodIndex].ITEMNO;
            },
            setDefault()
            {
               this.addressDefault = this.addressDefault?0:1;
            }
        },
        mounted() {
          this.id = param.getParamValue('id');
          this.pageInit();
            // this.src = globalStore.state.host + 'user/add-mod-address?&openid=' +wx.getStorageSync('openid');
        },
        computed:
        {
           neighborhoodVal:function()
           {

             if( this.neighborhoodIndex === -1)
             {
               return '选择所属社区';
             }

             if( this.neighborhood.length ) {
               return this.neighborhoodArr[this.neighborhoodIndex];
             } else
             {
               return '';
             }
           },
           defaultSwitchSrc:function () {
              return this.addressDefault?'/static/images/icon_On@3x.png':'/static/images/icon_Off@3x.png'
           },
          switchTxt:function()
          {
            return this.addressDefault?'开':'关'
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


  .address-panel
  {
    background: #FFFFFF;
    box-shadow: 0 2px 6px 0 #E7E9F0;
    border-radius: 5px;
    position: relative;
  }

  .input-line{
    padding: 20px 0;
    border-bottom: 1px solid #E1E1E1;
  }
</style>