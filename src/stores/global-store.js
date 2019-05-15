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
        chosenCoupon:[],
        paySuccessBack:'',
        isIpx:'',
        cleanClose:true
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
            state.chosenCoupon = data
        },
        setPaySuccessBack:(state,data) =>{
            state.paySuccessBack = data
        },
        setIsIpx:(state,data) =>{
            state.isIpx = data
        },
    }
});
