<template>
  <div class="container" @click="clickHandle">
    <div class="message">{{msg}}</div>
  </div>
</template>

<script>
    import globalStore from '../../stores/global-store'
    export default {
        data () {
            return {
                msg: 'Hello'
            }
        },
        created:function()
        {
            //定时等待10s
            (function(a,timer){
                 let countDownHandler = setInterval(function(){
                    timer = timer - 1;
                    console.log(timer);
                    //判断是否拥有openid
                   if( wx.getStorageSync('openid'))
                   {
                       a.openid = wx.getStorageSync('openid');
                       if( a.hasOwnProperty('userInit') )
                       {
                           console.log('has userInit');
                           a.userInit();
                       } else {
                           console.log('donot has userInit');
                       }
                       clearInterval(countDownHandler);
                       return;
                   }
                    a.userInit();
                    if( timer < 1) {
                        clearInterval(countDownHandler);
                        return;
                    }
                },1000);
            })(this,7);
        },
        methods: {
            clickHandle () {
                let url = 'http://yl.zhuyan.me/activity/user-info'
                let param = {code:1}
                //网络请求
                this.$http.get(url,param).then((res)=>{}).catch(err=>{console.log(3)});
                this.msg = 'Clicked!!!!!!'
            },
            userInit () {
                let url = globalStore.state.host + 'activity/user-info';
                let param = {code:1}
                Object.assign(param,{openid:this.openid});
                this.$http.get(url,param).then((res)=>{}).catch(err=>{console.log(3)})
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