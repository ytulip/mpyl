<template>
  <div class="p16">

    <textarea class="p16 fs-16-fc-7E7E7E-m" style="background: #FFFFFF;box-shadow: 0 2px 6px 0 #E7E9F0;border-radius: 5px;width: 100%;height: 144px;box-sizing: border-box;" v-model="tval">

    </textarea>


    <div class="fix-bottom3" v-bind:class="{isIpx:isIpx}" style="background-color: #ffffff;padding: 14px;border-top:1px solid #EBE9E9 ;">
      <a class="yl_btn1"  v-on:click="nextStep()" style="margin-top: 0;">保存</a>
    </div>
    <mptoast />
  </div>
</template>

<script>
    import globalStore from '../../stores/global-store'
    import IdCard from 'js-idcard'
    import param from '../../utils/param'
    import mptoast from 'mptoast'


    export default {
        data () {
            return {
                msg: 'Hello',
                banners:{},
                src:'',
                user:{},
                type:0,
                tval:'',
                isIpx:''
            }
        },
        created:function()
        {

        },
      components: {
        mptoast
      },
        methods: {
            nextStep()
            {
              let requestData =  {type:this.type};
              if( this.type == 1)
              {
                requestData.real_name = this.tval;

                if( !requestData.real_name )
                {
                  this.$mptoast('姓名不能为空');
                  return;
                }


              } else if( this.type == 4)
              {
                  requestData.age = this.tval;

                  if( !parseInt(requestData.age) )
                  {
                    this.$mptoast('年龄格式有误');
                    return;
                  }
              }else
              {
                requestData.id_card = this.tval;
                if( !requestData.id_card )
                {
                  this.$mptoast('身份证不能为空');
                  return;
                }

                if( !IdCard.checkIdCard(requestData.id_card) )
                {
                  this.$mptoast('身份证格式有误');
                  return;
                }
              }
              let a = this;

              param.commonRequest(
                      {
                        url:globalStore.state.host + '/user/edit-user',
                        page:this,
                        data:requestData,
                        success:function(res)
                        {
                          if(res.status)
                          {
                            wx.navigateBack({
                              delta: 1
                            })

                          }else{
                            a.$mptoast(res.desc);
                          }
                        },
                        error:function () {

                        }
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
          this.isIpx = globalStore.state.isIpx;

          let type = param.getParamValue('type');
          this.type = type;
          this.tval = param.getParamValue('val');
          let title = '';
          switch (type) {
            case '1':
              title = '修改姓名';
              break;
            case '2':
              title = '修改身份证号';
              break;
            case '4':
              title = '年龄';
              break;
            default:
              title = '';
          }

          //更改标题
          wx.setNavigationBarTitle({
            title: title,
            success: function(res) {
              // success
            }
          })

          this.initPage();
        },
        compute:
        {

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