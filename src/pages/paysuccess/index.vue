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
        onShow(){
        },
        methods: {

        },
        mounted() {
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