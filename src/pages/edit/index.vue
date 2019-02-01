<template>
  <div class="p16">

    <textarea class="p16 fs-16-fc-7E7E7E-m" style="background: #FFFFFF;box-shadow: 0 2px 6px 0 #E7E9F0;border-radius: 5px;width: 100%;height: 144px;box-sizing: border-box;">

    </textarea>


    <div class="fix-bottom3" style="background-color: #ffffff;padding: 14px;border-top:1px solid #EBE9E9 ;">
      <a class="yl_btn1"  v-on:click="nextStep()" style="margin-top: 0;">保存</a>
    </div>

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
                user:{}
            }
        },
        created:function()
        {

        },
        methods: {
            clickHandle () {
                let url = 'http://yl.zhuyan.me/activity/user-info'
                let param = {code:1}
                //网络请求
                this.$http.get(url,param).then((res)=>{}).catch(err=>{console.log(3)});
                this.msg = 'Clicked!!!!!!'
            },
            nextStep()
            {
              wx.setStorageSync('openid', '');
              wx.redirectTo(
                  {
                    url:'/pages/login/main',
                  }
              );
            },
            initPage()
            {
              let url = globalStore.state.host + 'user/user-center';
              let requestData = {}
              Object.assign(requestData,{openid:param.getOpenid()});
              this.$http.get(url,requestData).then((res)=>{
                console.log(res);
                this.user = res.data.data.user;
              }).catch(err=>{console.log(3)})
            }
        },
        mounted() {
            // this.src = globalStore.state.host + 'user/my-services?&openid=' +wx.getStorageSync('openid');
          this.initPage();
        },
        compute:
        {
          age:function()
          {
             if( !IdCard.checkIdCard(this.user.id_card) )
             {
               return '';
             }

             let birthDay = IdCard.birthDay(this.user.id_card)
             birth = birthDay.date;
             let   r   =   birth.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
              if(r==null)return   '';
              let   d=   new   Date(r[1],   r[3]-1,   r[4]);
              if   (d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4])
              {
                let   Y   =   new   Date().getFullYear();
                return  (Y-r[1]);
              }
              return '';

              // let identity = new Identity(this.user.id_card);
              // if(!identity.legal())
              // {
              //   return '';
              // } else
              // {
              //   let birth = identity.birthday();
              //
              //   let   r   =   birth.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
              //   if(r==null)return   '';
              //   let   d=   new   Date(r[1],   r[3]-1,   r[4]);
              //   if   (d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4])
              //   {
              //     let   Y   =   new   Date().getFullYear();
              //     return  (Y-r[1]);
              //   }
              //   return '';
              //
              //
              // }
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
</style>