<template>
  <web-view src="{{src}}"></web-view>
</template>

<script>
    import globalStore from '../../stores/global-store'
    import param from '../../utils/param'
    import { Base64 } from 'js-base64'
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
            }
        },
        mounted() {
            let url = param.getParamValue('url');
            this.src = globalStore.state.host + Base64.decode(url);
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