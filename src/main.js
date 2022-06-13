
import Vue from 'vue'
import axios from 'axios'
import VueAxios from "vue-axios";
 
Vue.use(VueAxios, axios)

import Antd from 'ant-design-vue';
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import echarts from 'echarts'
import '@/styles/index.scss' // global css
import jsonView from 'vue-json-views'
import scroll from 'vue-seamless-scroll'
import vRegion from 'v-region'




// Vue.use() 的第二个参数是可选的


import App from './App'
import store from './store'
import router from './router'
Vue.prototype.$echarts = echarts
import '@/icons' // icon
import '@/permission' // permission control
// import "./assets/scss/style.scss";
import BaiduMap from 'vue-baidu-map'
import {BmlMarkerClusterer} from 'vue-baidu-map'
//实现sos组件的全局注册
import Popup from "./components/popup/index"
 Vue.prototype.$popup = Popup.install
//报警组件全局注册
 import alarm from "./components/alarm/index"
//  import VueAwesomeSwiper  from "vue-awesome-swiper";

//  import 'swiper/dist/css/swiper.css';
 
//  Vue.use(VueAwesomeSwiper);


 Vue.prototype.$alarm = alarm.install
Vue.use(jsonView)
Vue.use(Antd);
Vue.use(scroll);
Vue.use(vRegion)
Vue.component('bml-marker-cluster', BmlMarkerClusterer)
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: "NGh5sODXNesOuKWbVwY3b0E3YOVI2GOf"
})

// set ElementUI lang to EN
Vue.use(ElementUI)
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
