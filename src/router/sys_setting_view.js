
import Router from 'vue-router'
import Vue from 'vue'
import sys_user_list from '@/pages/manager/sys_setting/sys_user/sys_user_list'
import sys_show_perms from '@/pages/manager/sys_setting/sys_user/sys_show_perms'
import sys_perms_group from '@/pages/manager/sys_setting/sys_user/sys_perms_group'





Vue.component('sys_setting_sys_user_sys_user_list',sys_user_list);
Vue.component('sys_setting_sys_user_sys_show_perms',sys_show_perms);
Vue.component('sys_setting_sys_user_sys_perms_group',sys_perms_group);

export default [

  {
    path: '/main',
    component: resolve => require(['@/pages/manager/main'], resolve),
    children: [
      {

        name:"用户管理",
        path: '/sys_user_list',
        component: sys_user_list,

      },
      {

        name:"用户权限",
        path: '/sys_user_perms',
        component: sys_show_perms,

      },
      {

        name:"权限集管理",
        path: '/sys_perms_group',
        component: sys_perms_group,

      }
    ]

  }
]




