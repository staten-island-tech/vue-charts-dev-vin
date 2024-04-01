import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BlankPage from '../views/BlankPage.vue'
import MathView from '../views/MathView.vue' 

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/blank-page', 
      name: 'blank-page',
      component: BlankPage
    },
    {
      path: '/math-view', 
      name: 'math-view', 
      component: MathView 
    }
  ]
})

export default router
