<template>
    <div class="p16">


        <div v-for="(item,index) in list" style="margin-bottom: 16px;" class="address-panel p16" v-on:click="chosen(index)" v-if="list.length">
            <div class="fs-16-fc-000000-m">
               <span class="l-btn-red2 in-bl" v-if="item.is_default">
                   默认
               </span> {{item.pct_code_name}} {{item.address}}
            </div>

            <div class="fs-14-fc-7E7E7E-r m-t-10">
                <span>{{item.address_name}}</span><span style="margin-left: 8px">{{item.mobile}}</span>
            </div>

            <div class="m-t-16 t-al-r">
                <div class="in-bl edit-btn" @click.stop="editAddress(item.address_id)">编 辑</div>
            </div>
        </div>

        <div v-if="!list.length" style="margin-top: 56px;">
            <div class="t-al-c">
                <image src="/static/images/home_icon_home_nor@3x.png" style="width: 52px;height: 52px;"/>
                <div class="fs-14-fc-7e7e7e-r m-t-24">点击下方，新增地址哦！</div>
            </div>
        </div>



        <div class="fix-bottom3" v-bind:class="{isIpx:isIpx}" style="background-color: #ffffff;padding: 14px;border-top:1px solid #EBE9E9 ;">
            <a class="yl_btn1"  v-on:click="nextStep()" style="margin-top: 0;">新增地址</a>
        </div>
    </div>
</template>

<script>
    import globalStore from '../../stores/global-store'
    import param from "../../utils/param"



    export default {
        data () {
            return {
                msg: 'Hello',
                list:{},
                src:'',
                id:'',
                chosenType:false,
                isIpx:''
            }
        },
        created:function()
        {

        },
        onShow()
        {
            this.pageInit();
        },
        methods: {
            chosen(ind)
            {
              if( !this.chosenType )
              {
                  return false;
              }

              //设置共享值

                // var jsonData = JSON.stringify({ id: id, name:name,phone: phone,pct:pct,pct_code_name:pct_code_name,address:address});
                // wx.miniProgram.postMessage({ data: jsonData});

                let data = JSON.stringify({ id: this.list[ind].address_id, name:this.list[ind].address_name,phone: this.list[ind].mobile,pct:this.list[ind].pct_code,pct_code_name:this.list[ind].pct_code_name,address:this.list[ind].address});


                globalStore.commit("setAddressShare",data);
                wx.navigateBack({
                    delta: 1
                })

            },
            pageInit()
            {
                let url = globalStore.state.host + 'user/address-data';
                let param = {};
                Object.assign(param,{openid:wx.getStorageSync('openid')});
                this.$http.get(url,param).then((res)=>{
                    console.log(res);
                    this.list = res.data.data;
                }).catch(err=>{console.log(3)})
            },
            editAddress(id)
            {
                wx.navigateTo(
                    {
                        url:'/pages/editaddress/main?id=' + id
                    }
                )
            },
            nextStep:function()
            {
                wx.navigateTo(
                    {
                        url:'/pages/editaddress/main'
                    }
                )
            }
        },
        mounted() {
            this.isIpx = globalStore.state.isIpx;
            // this.src = globalStore.state.host + 'user/addresses?&openid=' +wx.getStorageSync('openid');
            this.chosenType = param.getParamValue('chosenType');
            this.pageInit();
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


  .l-btn-red2{
      border: 1px solid #C50081;
      border-radius: 17px;
      line-height: 20px;
      box-sizing: border-box;
      padding: 0 8px;
      font-family: PingFangSC-Medium;
      font-size: 14px;
      color: #C50081;
      letter-spacing: -0.27px;
      display: inline-block;
  }
</style>