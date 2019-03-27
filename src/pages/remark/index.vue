<template>
  <web-view src="{{src}}" @message="bindmessage"></web-view>
</template>

<script>
    import globalStore from '../../stores/global-store'
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
            bindmessage(e){
                console.log(e.target.data);
                let jsonData = JSON.parse(e.target.data[0]);
                console.log(jsonData);
                globalStore.commit("sethabbitRemarkShare",jsonData.habbitRemark);
            }
        },
        mounted() {
            this.src = globalStore.state.host + 'passport/habbit-remark?&openid=' +wx.getStorageSync('openid');
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