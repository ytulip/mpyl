<template>
    <div class="content-wrapper-24-16">
        <web-view src="{{src}}"></web-view>
    </div>
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

            if ( globalStore.state.isIpx )
            {
                this.src = globalStore.state.host + 'user/good-detail-xcx?isIpx=1&product_id=' + param.getParamValue('id') + '&openid=' + wx.getStorageSync('openid');
            } else
            {
                this.src = globalStore.state.host + 'user/good-detail-xcx?product_id=' + param.getParamValue('id') + '&openid=' + wx.getStorageSync('openid');
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