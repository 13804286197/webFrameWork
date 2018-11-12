import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
import list from '@/pages/list'
import item from '@/pages/item'
import home from '@/pages/manager/home'
import login from '@/pages/common/login'
import { Message } from 'element-ui';

import view from './view'





Vue.use(Router)

Vue.component('item-v',item)

export default new Router({
  routes: [

    {
      path: '/',
      component: index
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/home',
      component: home
    },
    {
      path: '/list',
      component: list
    }
  ]
})
