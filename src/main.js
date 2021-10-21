/*
 * @Author: qby
 * @Date: 2021-10-20 21:20:32
 * @LastEditTime: 2021-10-21 10:21:24
 * @LastEditors: qby
 * @Description: 
 */
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
Vue.prototype.$EventBus = new Vue()
new Vue({
  render: h => h(App),
}).$mount('#app')
