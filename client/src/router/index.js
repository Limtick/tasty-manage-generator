import Vue from 'vue'
import Router from 'vue-router'
import menu from './menu'

import Layout from '@/views/Layout'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      redirect: {
        name: 'FormGenerator'
      },
      children: menu
    }
  ]
})
