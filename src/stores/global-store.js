import Vue from 'vue'
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        count: 0,
        openid:'',
        host:'https://huajialife.com/',
        addressShare:'',
        webViewUrl:'',
        habbitRemarkShare:'',
        chosenCoupon:[]
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
        },
        setChosenCoupon: (state,data) =>{
            console.log('mark:');
            console.log(data);
            state.chosenCoupon = data
        }
    }
});
