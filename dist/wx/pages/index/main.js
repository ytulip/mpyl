require("../../common/manifest.js");
require("../../common/vendor.js");
global.webpackJsonpMpvue([9],{"5vTQ":function(t,i,a){"use strict";var n=a("woOf"),s=a.n(n),e=a("z0bi");i.a={data:function(){return{msg:"Hello",banners:{}}},created:function(){},methods:{clickHandle:function(){this.$http.get("http://yl.zhuyan.me/activity/user-info",{code:1}).then(function(t){}).catch(function(t){console.log(3)}),this.msg="Clicked!!!!!!"},userInit:function(){var t=this,i=e.a.state.host+"index/home-main",a={code:1};s()(a,{openid:this.openid}),this.$http.get(i,a).then(function(i){console.log(i.data.data),t.banners=i.data.data.banners}).catch(function(t){console.log(3)})},goClean:function(){wx.navigateTo({url:"/pages/clean/main"})},goCommunity:function(){wx.navigateTo({url:"/pages/clean/main?type=community"})},goBannerDetail:function(t){console.log("go banner detail"+t),wx.navigateTo({url:"/pages/webview/main?id="+t})},goVip:function(){wx.navigateTo({url:"/pages/vip/main"})},cusNavigate:function(t){wx.navigateTo({url:"/pages/"+t+"/main"})}},mounted:function(){this.userInit()}}},MhDc:function(t,i,a){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var n=a("5nAL"),s=a.n(n),e=a("Qt9A"),c=a("T9XY"),o=a.n(c),l=a("kXGG"),r=(a.n(l),new o.a);new s.a(e.a).$mount(),r.config.baseURL="",s.a.prototype.$http=r},Qt9A:function(t,i,a){"use strict";var n=a("5vTQ"),s=a("oOC7");var e=function(t){a("cjJ6")},c=a("ybqe")(n.a,s.a,e,"data-v-4f8ca7d4",null);i.a=c.exports},cjJ6:function(t,i){},oOC7:function(t,i,a){"use strict";var n={render:function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("div",{staticClass:"p16 bg-f9f9fb"},[a("swiper",{staticClass:"swiper",attrs:{autoplay:"true",interval:"5000",duration:"1000"}},t._l(t.banners,function(i,n){return a("block",{key:t.key,attrs:{index:n}},[a("swiper-item",{attrs:{eventid:"0-"+n,mpcomid:"0-"+n},on:{click:function(a){t.goBannerDetail(i.id)}}},[a("image",{staticClass:"slide-image",attrs:{src:i.url,mode:"aspectFill"}})])],1)})),t._v(" "),a("div",{staticClass:"cus-row m-t-16"},[a("div",{staticClass:"cus-row-col-6 v-a-t",staticStyle:{"padding-right":"7.5px","box-sizing":"border-box"}},[a("div",{staticClass:"food-panel",attrs:{eventid:"1"},on:{click:t.goCommunity}},[a("div",{staticClass:"item-fc"},[t._v("订餐服务")])])]),t._v(" "),a("div",{staticClass:"cus-row-col-6",staticStyle:{"padding-left":"7.5px","box-sizing":"border-box"}},[a("div",{staticClass:"clean-panel",attrs:{eventid:"2"},on:{click:t.goClean}},[a("div",{staticClass:"item-fc"},[t._v("家庭清洁")])]),t._v(" "),a("div",{staticClass:"hood-panel m-t-16",attrs:{eventid:"3"},on:{click:t.goCommunity}},[a("div",{staticClass:"item-fc"},[t._v("社区管家")])])])]),t._v(" "),a("div",{staticClass:"vip-panel m-t-16",attrs:{eventid:"4"},on:{click:function(i){t.cusNavigate("vip")}}},[t._m(0)])],1)},staticRenderFns:[function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"cus-row"},[i("div",{staticClass:"cus-row-col-8 v-a-m"},[i("div",{staticClass:"fs-18-fc-000000-m",staticStyle:{"line-height":"25px"}},[this._v("\n                  花甲会员· ¥60/月\n              ")]),this._v(" "),i("div",{staticClass:"fs-12-fc-7E7E7E-r m-t-6",staticStyle:{"line-height":"17px"}},[this._v("\n                  更多优惠，服务更多！\n              ")])]),this._v(" "),i("div",{staticClass:"cus-row-col-4 v-a-m t-al-r"},[i("a",{staticClass:"l-btn-red"},[this._v("立即开通")])])])}]};i.a=n}},["MhDc"]);