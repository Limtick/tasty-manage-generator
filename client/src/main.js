// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import TastyForm from '@/components/tastyForm'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import './registerServiceWorker'
import 'style/reset.css'
import 'style/layout.scss'

Vue.config.productionTip = false
Vue.prototype.$http = Axios

Vue.use(ElementUI)
Vue.use(TastyForm)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  ...App
})
