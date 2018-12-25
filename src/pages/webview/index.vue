<template>
  <web-view src="{{src}}"></web-view>
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
            }
        },
        mounted() {
            let id = param.getParamValue('id');
            this.src = globalStore.state.host + 'passport/banner-detail?id=' + id;
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