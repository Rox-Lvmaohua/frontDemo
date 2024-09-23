import { createApp } from 'vue'
import App from './App.vue'
import router from './router'   // router
import store from './store' // vuex
// 引入bootstrap组件和样式
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

createApp(App).use(store).use(router).mount('#app')
