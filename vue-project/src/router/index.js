import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BlankPage from '../views/BlankPage.vue' // Import BlankPage.vue

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/blank-page', // Add route for BlankPage.vue
      name: 'blank-page',
      component: BlankPage
    }
  ]
})

export default router
