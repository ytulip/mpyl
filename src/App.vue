<script>
//import globalStore from 'stores/global-store.js'
//import globalStore from 'stores/global-store'
export default {
  created () {
    //获得code
      wx.login({
          success: function(res) {
              if (res.code) {
                  //发起网络请求
                  console.log(res.code);
//                  this.$http.get('http://ly.zhuyan.me/activity/user-info',{code:res.code}).then((res)=>{console.log(res)}).catch(err=>{console.log(3)});
                  wx.request({
                      url: 'http://yl.zhuyan.me/' + 'activity/common-info2',
                      data: {
                          code: res.code
                      },
                      success:function(requestRes)
                      {
                          console.log(requestRes);
                          //存储openid
                          if ( requestRes.data.status ) {
                              wx.setStorageSync('openid',requestRes.data.data.openid);
//                              globalStore.commit('setOpenid',$openid)
//                              console.log(globalStore.state.openid)
                          }

                      }
                  })
              } else {
                  console.log('登录失败！' + res.errMsg)
              }
          }
      });



    // 调用API从本地缓存中获取数据
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    console.log('app created and cache logs by setStorageSync')
  }
}
</script>

<style>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
