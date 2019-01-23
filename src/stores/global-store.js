import Vue from 'vue'
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        count: 0,
        openid:'',
        host:'http://yl.zhuyan.me/',
        addressShare:'',
        webViewUrl:'',
        habbitRemarkShare:''
    },
    mutations: {
        increment: (state) => {
            state.count += 1
        },
        decrement: (state) => {
            state.count -= 1
        },
        setOpenid: (state,openid) => {
            state.openid = openid
        },
        setAddressShare: (state,data) =>{
            console.log('mark:');
            console.log(data);
            state.addressShare = data
        },
        sethabbitRemarkShare: (state,data) =>{
            console.log('mark:');
            console.log(data);
            state.habbitRemarkShare = data
        }
    }
});
