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
                src: ''

            }
        },
        created:function()
        {

        },
        methods: {

        },

        mounted() {
            console.log(param.getParamValue('id'));
            this.src = globalStore.state.host + 'user/report-bill?product_id=' + param.getParamValue('id') + '&openid=' +wx.getStorageSync('openid');
        },
    }
</script>

<style scoped>
  .message {
    color: red;
    padding: 10px;
    text-align: center;
  }
</style>