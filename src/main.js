// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios';
import qs from 'qs';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {validate} from '../static/js/common/validate/validate.js' //注意路径

Vue.prototype.$validater = validate


import {
  Input,
  Button,
  Select,
  Radio,
  RadioGroup,
  RadioButton,
  Checkbox,
  CheckboxGroup,
  DatePicker,
  Form,
  FormItem,
  Loading,
  Message
  // MessageBox,
} from 'element-ui'
Vue.prototype.$qs = qs
//Vue.use(Message);

Vue.use(ElementUI);
axios.defaults.timeout = 50000;// 在超时前，所有请求都会等待 5 秒
axios.defaults.headers.post['Content-Type']= 'application/x-www-form-urlencoded;charset=UTF-8';// 配置请求头
axios.defaults.baseURL = 'http://localhost:8090';// 配置接口地址
axios.defaults.withCredentials = true;

Vue.prototype.$axios = axios;// 将axios配置成vue的原型

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
