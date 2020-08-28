import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//import './assets/theme/theme-green/index.css'
import VueRouter from 'vue-router'
import store from './store'
import { mapGetters,mapState } from 'vuex'
import a from './request/ax';
import routes from './router'
import {test} from "./utils/testRouter";
import 'font-awesome/css/font-awesome.min.css'
Vue.prototype.$http=a
Vue.use(ElementUI)
Vue.use(VueRouter)

//NProgress.configure({ showSpinner: false });

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {


  if (to.path == '/login') {
    sessionStorage.removeItem('admin');
  }
  if (sessionStorage.getItem('admin')==null&&to.path!='/login'){
    next('/login')
  }else {

    let menus = store.getters.menus;
    let router = ['/404', '/login', '/dashboard']

    if (router.indexOf(to.path) == -1) {

      if (menus != null && to.path != '/401') {
        let bol = test(menus, to.name);

        if (!bol) {
          next('/401')
        }
      }
    }
    next()
  }
})


new Vue({


  router,
  store,
  render: h => h(App)
}).$mount('#app')

