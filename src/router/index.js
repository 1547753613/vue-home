import Login from '../views/Login.vue'
import NotFound from '../views/404.vue'
import Home from '../views/Home.vue'
import Main from '../views/Main.vue'
import Form from '../views/nav1/Form.vue'
import user from '../views/nav1/user.vue'
import Page4 from '../views/nav2/Page4.vue'
import Page5 from '../views/nav2/Page5.vue'
import Page6 from '../views/nav3/Page6.vue'
import echarts from '../views/charts/echarts.vue'

let routes = [
  {
    path:'/',
    redirect: '/404',
    hidden:true
  },
  {
    path: '/login',
    component: Login,
    name: '登录',
    hidden: true
  },
  {
    path: '/',
    component: Home,
    name: '首页',
    iconCls: 'el-icon-message',//图标样式class
    hidden:false,
    test:true,
    leaf: true,
    children: [
      { path:'/404',component:NotFound,name:'首页',hidden:true,test:true},
      { path: '/401', component: () => import('@/views/401'), name: 'page401'},
      { path: '/main', component: Main, name: '主页' },
      { path: '/form', component: Form, name: 'Form'}

    ]
  },
  {
    path: '/',
    component: Home,
    name: '',
    iconCls: 'el-icon-user-solid',
    leaf: true,//只有一个节点
    children: [
      {path:'/person',component:()=>import('@/views/person/index.vue'),name:'员工管理'}
    ]
  },
  {
    path: '/',
    component: Home,
    name: '',
    iconCls: 'el-icon-s-shop',
    leaf: true,//只有一个节点
    children: [
      {path:'/landlord',component:()=>import('@/views/user/select'),name:'房东管理'}
    ]
  },
  {
    path: '/',
    component: Home,
    name: '',
    iconCls: 'el-icon-user',
    leaf: true,//只有一个节点
    children: [
      {path:'/user',component:()=>import('@/views/user/select'),name:'用户管理'}
    ]
  },
  {
    path: '/',
    component: Home,
    name: '',
    iconCls: 'el-icon-s-goods',
    leaf: true,//只有一个节点
    children: [
      {path:'/order',component:()=>import('@/views/user/select'),name:'订单管理'}
    ]
  },
  {
    path: '/',
    component: Home,
    name: '',
    iconCls: 'el-icon-headset',
    leaf: true,//只有一个节点
    children: [
      {path:'/consult ',component:()=>import('@/views/user/select'),name:'咨询管理'}
    ]
  },

  {
    path: '*',
    hidden: true,
    redirect: { path: '/404' }
  }
];

export default routes;
