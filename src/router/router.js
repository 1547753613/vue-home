import routes from './index'
import VueRouter from 'vue-router'
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
