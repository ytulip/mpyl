<template>
  <web-view src="{{src}}"></web-view>
</template>

<script>
    import globalStore from '../../stores/global-store'
    import param from '../../utils/param'
    import { Base64 } from 'js-base64'
    import UrlParse from 'url-parse'

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
        },
        onShow(){
            if( globalStore.state.paySuccessBack )
            {
                globalStore.commit('setPaySuccessBack','');
                wx.switchTab({
                    url: '/pages/book/main'
                })
                return;
            }
        },
        mounted() {

            //加是否是iphone X的参数
            let isIpx = globalStore.state.isIpx;
            let url = param.getParamValue('url');


            if( isIpx )
            {
                let targetUrl = globalStore.state.host + Base64.decode(url);
                console.log(targetUrl);
                let urlParse = UrlParse(targetUrl);
                let query = urlParse.query;
                console.log(query);
                // query['isIpx'] = 1;
                query = query?(query+'&isIpx=1'):'?isIpx=1';
                urlParse.set('query',query);
                this.src = urlParse.href;
            } else {
                this.src = globalStore.state.host + Base64.decode(url);
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