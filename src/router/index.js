import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ProvisionalView from '@/views/ProvisionalView.vue'
import DetailView from '@/views/DetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/provisional',
      name: 'provisional-value',
      component: ProvisionalView,
    },
    {
      path: '/detail',
      name: 'detail-value',
      component: DetailView,
    },
  ],
})

export default router
