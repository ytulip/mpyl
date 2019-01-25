<template>
    <div class="p16 bg-f9f9fb">
        <div v-for="(item, index) in list" style="overflow: hidden;position: relative;margin-bottom: 16px;padding-left: 84px;box-sizing: border-box" v-on:click="goCleanDetail(item.id)">


            <div style="position: absolute;width: 120px;height: 120px;border-radius: 4px;top:18px;left: 0;z-index: 99;overflow: hidden;">
                <image :src="item.cover_image" class="slide-image" style="width: 100%;height: 100%;"/>
            </div>


            <div class="info-panel">
                <div class="fs-18-fc-000000-m" style="line-height: 25px;">{{item.product_name}}</div>
                <div class="fs-14-fc-7E7E7E-r" style="margin-top: 10px;line-height: 16px;">{{item.sub_desc}}</div>

                <div style="position: absolute;bottom: 18px;left: 52px;"><span class="fs-14-fc-000033-m">￥</span><span class="fs-18-fc-000033-m">18.5</span></div>

            </div>
            <!--<div style="position: absolute;top:0;left: 0;right: 0;z-index: 99;" class="fs-24-fc-ffffff-b">{{item.product_name}}</div>-->
            <!--<div style="position: absolute;bottom: 0;left: 0;right: 0;z-index: 99;" class="fs-16-fc-ffffff">{{item.sub_desc}}</div>-->
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

    .info-panel
    {
        background: #FFFFFF;
        box-shadow: 0 2px 6px 0 #E7E9F0;
        border-radius: 5px;
        height: 156px;
        padding: 18px 18px 18px 52px;
        box-sizing: border-box;
        position: relative;
    }
</style>