<template>
  <div class="content-wrapper-24-16">
      <div v-for="(item, index) in list" style="overflow: hidden;position: relative" v-on:click="goCleanDetail(item.id)">
        <image :src="item.cover_image" class="slide-image" style="width: 100%" mode="widthFix"/>
        <div style="position: absolute;top:0;left: 0;right: 0;z-index: 99;" class="fs-24-fc-ffffff-b">{{item.product_name}}</div>
        <div style="position: absolute;bottom: 0;left: 0;right: 0;z-index: 99;" class="fs-16-fc-ffffff">{{item.sub_desc}}</div>
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
                list:[],
                type:0
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
                this.type = 1;
            } else {
                this.type = 2;
            }


            let url = globalStore.state.host + 'passport/product-list'
            let request = {type:this.type}
            //网络请求
            let a = this;
            this.$http.get(url,request).then((res)=>{
                console.log(res.data.data);
                a.list = JSON.parse(res.data.data);
                console.log(a.list);
            }).catch(err=>{console.log(3)});
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