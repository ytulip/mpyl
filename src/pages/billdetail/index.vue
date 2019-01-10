<template>
  <web-view src="{{src}}" @message="bindmessage"></web-view>
</template>

<script>
    import globalStore from '../../stores/global-store'
    import param from '../../utils/param'
    export default {
        data () {
            return {
                msg: 'Hello',
                banners:{},
                src:''
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
            userInit () {
                let url = globalStore.state.host + 'index/home-main';
                let param = {code:1}
                Object.assign(param,{openid:this.openid});
                this.$http.get(url,param).then((res)=>{
                    console.log(res);
                    this.banners = res.data.banners;
                }).catch(err=>{console.log(3)})
            },
            bindmessage(e){
                console.log(e.target.data)
                globalStore.commit("setAddressShare",e.target.data[0]);
            }
        },
        mounted() {
            this.src = globalStore.state.host + 'user/clean-or-food-order-detail?id='+param.getParamValue('id')+'&openid=' +wx.getStorageSync('openid');
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