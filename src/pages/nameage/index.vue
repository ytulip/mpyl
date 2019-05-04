<template>
  <div style="padding: 0 48px;">
    <div class="fs-24-fc-000000 f-f-m" style="margin-top: 45px;">填写姓名</div>

    <div style="margin-top: 45px;">
      <div class="cus-row-col-12 divi-4-p">
        <div class="single-input-wrap">
          <input  class="cus-input fs-18-fc-2E3133" style="line-height: 32px !important;height: 32px;" v-model="real_name"/>
        </div>
      </div>
    </div>

    <div class="input-line">
      <picker @change="bindAttend2Change" :value="neighborhoodIndex" :range="neighborhoodArr">
        <view class="picker fs-18-fc-2E3133" style="padding-right: 14px;position: relative;" v-bind:class="{'fs-18-fc-2E3133':neighborhoodIndex === -1}">
          {{neighborhoodVal}}
          <div style="position:absolute;right: 0;top:0;">
            <image src="/static/images/icon_bnext_nor@3x.png" mode="widthFix" style="width:8px;height: 13px;"></image>
          </div>
        </view>
      </picker>
    </div>



    <div class="m-t-40"><a class="yl_btn1" v-bind:class="{ 'btn-gray': (btnGray) }" v-on:click="nextStep()">完成</a></div>
  </div>
</template>

<script>
    import globalStore from '../../stores/global-store'
    import IdCard from 'js-idcard'
    import param from '../../utils/param'

    export default {
        data () {
            return {
                msg: 'Hello',
                banners:{},
                src:'',
                user:{},
                isVip:false,
                isAuth:false,
                real_name:'',
                neighborhood:[],
                neighborhoodArr:[],
                neighborhoodIndex:-1,
                indexInit:false
            }
        },
        created:function()
        {

        },
        methods: {
            /*判断是否登录然后跳转*/
            authThenGo(url)
            {
                if( !param.getOpenid() )
                {
                    wx.navigateTo({
                        url:"/pages/login/main"
                    })
                    return;
                }

                wx.navigateTo({
                    url:url
                })
            },
            bindAttend2Change(e)
            {
                this.indexInit = true;
                this.neighborhoodIndex = e.mp.detail.value;
            },
            initPage()
            {

              if( !param.getOpenid() )
              {
                  return;
              }

              this.isAuth = true;

              let url = globalStore.state.host + 'user/user-center';
              let requestData = {}
              Object.assign(requestData,{openid:param.getOpenid()});
              this.$http.get(url,requestData).then((res)=>{
                console.log(res);
                this.user = res.data.data.user;
                this.isVip = res.data.data.isVip;

              }).catch(err=>{console.log(3)})

            },
            nextStep()
            {
                if( this.btnGray )
                {
                    this.$mptoast('还有资料未填写');
                    return;
                }

                let requestData = {name:this.real_name,age:this.neighborhoodArr[this.neighborhoodIndex]}

                param.commonRequest(
                    {
                        url:globalStore.state.host + 'user/nameage',
                        page:this,
                        data:requestData,
                        success:function(res)
                        {
                            if(res.status)
                            {
                                wx.switchTab({
                                    url: '/pages/index/main'
                                });
                            }
                        },
                        error:function () {

                        }
                    }
                );
            }
        },
        onShow()
        {
          this.initPage();
        },
        mounted() {
          // this.src = globalStore.state.host + 'user/my-services?&openid=' +wx.getStorageSync('openid');
          this.indexInit = false;
          this.neighborhoodIndex = 42;
          this.neighborhoodArr =  [];
          for(let i=18; i <= 100;i++)
          {
              this.neighborhoodArr.push(i);
          }

          this.initPage();
        },
        computed:
        {

            btnGray:function()
            {
                if ( !this.real_name )
                {
                    return true;
                }

                if ( !this.indexInit )
                {
                    return true;
                }

                return false;
            },
            neighborhoodVal:function()
            {

                if( !this.indexInit )
                {
                    return '选择年龄';
                }

                if( this.neighborhoodArr.length ) {
                    return this.neighborhoodArr[this.neighborhoodIndex] + '岁';
                } else
                {
                    return '';
                }
            },
          age:function()
          {

            if(!this.user.id_card)
            {
              return '?';
            }

            if( !IdCard.checkIdCard(this.user.id_card) )
            {
              return '?';
            }

            let birthDay = IdCard.birthDay(this.user.id_card)
            let birth = birthDay.date;
            let   r   =   birth.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
            if(r==null)return   '';
            let   d=   new   Date(r[1],   r[3]-1,   r[4]);
            if   (d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4])
            {
              let   Y   =   new   Date().getFullYear();
              return  (Y-r[1]);
            }
            return '?';
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

  .flower-bg{
    background-image: linear-gradient(-153deg, #CE388E 9%, #A30182 100%);
    box-shadow: 0 2px 8px 0 rgba(191,25,132,0.34);
    border-radius: 5px;
    padding: 19px 16px;
  }

  .l-btn-red2{
    border: 1px solid #C50081;
    border-radius: 9px;
    line-height: 18px;
    box-sizing: border-box;
    padding: 0 7px;
    font-family: PingFangSC-Medium;
    font-size: 12px;
    color: #C50081;
    display: inline-block;
  }

  .divi-4-p{box-sizing:border-box;}

  .single-input-wrap
  {
    border-bottom: 1px solid #BFBFBF;padding-bottom: 8px;
  }

  .input-line{
    padding: 20px 0;
    border-bottom: 1px solid #bfbfbf;
  }
</style>