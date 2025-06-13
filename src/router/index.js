import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PostView from '../views/PostView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },
    {
      path: '/post/:slug',
      name: 'Post',
      component: PostView,
      props: true,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    } else if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

;(function () {
  // Check if a redirect path was saved in sessionStorage by 404.html
  const redirect = sessionStorage.getItem('redirect')
  if (redirect) {
    // If so, delete the saved path
    sessionStorage.removeItem('redirect')
    // And redirect the user to the originally requested URL
    const targetUrl = new URL(redirect)
    router.replace(targetUrl.pathname + targetUrl.search + targetUrl.hash)
  }
})()

export default router
