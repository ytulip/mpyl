<template>
  <div class="container" @click="clickHandle">
    <div class="message">{{msg}}</div>
  </div>
</template>

<script>
    export default {
        data () {
            return {
                msg: 'Hello'
            }
        },
        methods: {
            clickHandle () {
                let url = 'http://yl.zhuyan.me/activity/user-info'
                let param = {code:1}
                //网络请求
                this.$http.get(url,param).then((res)=>{}).catch(err=>{console.log(3)});
                this.msg = 'Clicked!!!!!!'
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