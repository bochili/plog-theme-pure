import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';
import VueLazyload from 'vue-lazyload'
import {createPinia} from 'pinia'
import loadImage from './assets/default.png'

const pinia = createPinia()
createApp(App).use(VueLazyload, {
    preLoad: 1.3,
    error: loadImage,
    loading: loadImage,
    attempt: 1
}).use(router).use(pinia).use(ArcoVue).mount('#app')
