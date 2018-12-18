import Vue from 'vue'
import App from './index'
import Fly from 'flyio/dist/npm/wx'
import '../../style/common.css'


var fly = new Fly
const app = new Vue(App)
app.$mount()
fly.config.baseURL = ''
Vue.prototype.$http = fly
