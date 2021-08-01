import Vue from 'nativescript-vue'
import App from './components/App'
import Login from './components/Login'
import Encuesta from './components/Encuesta'
import axios from 'axios'




// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')
Vue.prototype.$axios = axios;
Vue.prototype.$axios.defaults.baseURL = 'http://192.140.25.25:8080/api/srcr/';

new Vue({
  
  render: h => h('frame', [h(Login)])
}).$start()
