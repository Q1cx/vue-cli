// 创建路由对象  以及 配置路由规则和其他路由配置
import VueRouter from 'vue-router'
import Vue from 'vue'
import login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'

Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    { path: '/login', name: 'login', component: login },
    {
      path: '/',
      component: Home,
      children: [
        { path: '/', name: 'welcome', component: Welcome }
      ] }

  ]
})
export default router
