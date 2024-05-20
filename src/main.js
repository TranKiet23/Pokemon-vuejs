import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import _ from 'lodash'
import qs from 'qs'

window._ = _;
window.qs = qs;
createApp(App).use(Antd).mount('#app')
