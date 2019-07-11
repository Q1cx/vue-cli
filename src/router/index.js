// 创建路由对象  以及 配置路由规则和其他路由配置
import VueRouter from 'vue-router'
import Vue from 'vue'
import login from '@/views/login'
import Home from '@/views/home'

Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    { path: '/login', name: 'login', component: login },
    { path: '/', name: 'home', component: Home }

  ]
})
export default router
