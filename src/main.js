import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import http from './common/request'
import ElementUI from 'element-ui';
import VueLazyload from 'vue-lazyload'
import 'element-ui/lib/theme-chalk/index.css';
import "../src/assets/css/variable.less"
import "../src/assets/css/public.less"

Vue.prototype.$http = http
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueLazyload, {
  error:  require('../src/assets/img/placeholder.png'),  // 本地加载失败图片
  loading: require('../src/assets/img/placeholder.png'), // 本地加载占位图
  preLoad: 1.3, // 预加载高度的比例
  attempt: 3 // 尝试加载次数
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


