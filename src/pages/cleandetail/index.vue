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
            this.src = globalStore.state.host + 'user/good-detail-xcx?product_id=' + param.getParamValue('id') + '&openid=' + wx.getStorageSync('openid');
//            this.getData();
//            let pages = getCurrentPages()    //获取加载的页面
//            let currentPage = pages[pages.length-1]
//            console.log(currentPage.options);
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