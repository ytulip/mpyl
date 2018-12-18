<template>
  <div class="content-wrapper-24-16">
      <div v-for="(item, index) in list" style="overflow: hidden;position: relative" v-on:click="goCleanDetail(item.type)">
        <image :src="item.url" class="slide-image" style="width: 100%" mode="widthFix"/>
        <div style="position: absolute;top:0;left: 0;right: 0;z-index: 99;" class="fs-24-fc-ffffff-b">{{item.title}}</div>
        <div style="position: absolute;bottom: 0;left: 0;right: 0;z-index: 99;" class="fs-16-fc-ffffff">{{item.desc}}</div>
      </div>
  </div>
</template>

<script>
    import globalStore from '../../stores/global-store'
    import param from '../../utils/param'
    export default {
        data () {
            return {
                msg: 'Hello',
                list:[{'url':'http://graphis.zhuyan.me/1.jpg','title':'日常保洁','desc':'一句话描述','type':1},{'url':'http://graphis.zhuyan.me/2.jpg','title':'深度保洁','desc':'一句话描述','type':2},{'url':'http://graphis.zhuyan.me/2.jpg','title':'开荒保洁','desc':'一句话描述','type':3}]
            }
        },
        created:function()
        {

        },
        methods: {
            goCleanDetail(type){
                console.log(type);
                wx.navigateTo(
                    {
                        url:'/pages/cleandetail/main?id=' + type + '&openid=' + wx.getStorageSync('openid')
                    }
                );
            }
        },
        mounted() {
            if( !param.getParamValue('type') )
            {
                this.list = [{'url':'http://graphis.zhuyan.me/1.jpg','title':'日常保洁','desc':'一句话描述','type':1},{'url':'http://graphis.zhuyan.me/2.jpg','title':'深度保洁','desc':'一句话描述','type':2},{'url':'http://graphis.zhuyan.me/2.jpg','title':'开荒保洁','desc':'一句话描述','type':3}];
            } else {
                this.list = [{'url':'http://graphis.zhuyan.me/1.jpg','title':'套餐名称1','desc':'一句话描述','type':4},{'url':'http://graphis.zhuyan.me/2.jpg','title':'套餐名称2','desc':'一句话描述','type':5},{'url':'http://graphis.zhuyan.me/2.jpg','title':'套餐名称3','desc':'一句话描述','type':6}];
            }
//            this.src = globalStore.state.host + 'user/good-detail-xcx?product_id=' + param.getParamValue('id');
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