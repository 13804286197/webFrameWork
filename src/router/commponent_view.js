import Vue from 'vue'
import v_input from '@/components/table/v-input'
import leftMenu from '@/pages/manager/menu/left_menu'
import headerMenu from '@/pages/manager/menu/header-menu'
import footerMenu from '@/pages/manager/menu/footer-menu'


Vue.component('v-input',v_input)

Vue.component('v-left-menu',leftMenu)
Vue.component('v-header-menu',headerMenu)
Vue.component('v-footer-menu',footerMenu)




