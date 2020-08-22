import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//import './assets/theme/theme-green/index.css'
import VueRouter from 'vue-router'
import store from './store'
import { mapGetters,mapState } from 'vuex'

import routes from './router'

import 'font-awesome/css/font-awesome.min.css'

Vue.use(ElementUI)
Vue.use(VueRouter)

//NProgress.configure({ showSpinner: false });

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    sessionStorage.removeItem('user');
  }
  let user = JSON.parse(sessionStorage.getItem('user'));
  if (sessionStorage.getItem('menus')==null&&to.path!='/login'){
    next('/login')
  }
 next()
})

//router.afterEach(transition => {
//NProgress.done();
//});

new Vue({


  router,
  store,
  render: h => h(App)
}).$mount('#app')
