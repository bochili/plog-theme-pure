import {defineNuxtPlugin} from '#app';
import VueLazyload from 'vue-lazyload';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(VueLazyload, {
        preLoad: 1.33, // 预加载的宽高比，4:3
        error: '/default.png', // 加载失败时使用的图片
        loading: '/default.png', // 加载时的loading图
        attempt: 2 //尝试加载次数
    });
});
