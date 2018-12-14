import Vue from 'vue'
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        count: 0,
        openid:'',
        host:'http://yl.zhuyan.me/'
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
        }
    }
});
