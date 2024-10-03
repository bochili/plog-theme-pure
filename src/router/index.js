import { createWebHashHistory, createRouter } from 'vue-router'

import HomeView from '../pages/index.vue'
import TimelineView from '../pages/timeline/index.vue'
import MemoView from '../pages/cities/index.vue'
import DetailView from '../pages/sets/index.vue'

const routes = [
    {
        path: '/', component: HomeView,
        meta: { title: '首页 - 影集' }
    },
    {
        path: '/sets', component: DetailView,
        meta: { title: '影集' }
    },
    {
        path: '/timeline', component: TimelineView,
        meta: { title: 'Archives - 影集' }
    },
    {
        path: '/cities', component: MemoView,
        meta: { title: '一些記憶 - 影集' }
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})
router.beforeEach((to, from, next) => {
    document.title = to.meta?.title;
    next();
});
export default router