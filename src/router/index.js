// 创建路由对象  以及 配置路由规则和其他路由配置
import VueRouter from 'vue-router'
import Vue from 'vue'
import login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import NodFound from '@/views/404'
import Article from '@/views/article'
import Image from '@/views/image'
import Publish from '@/views/publish'

Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    { path: '/login', name: 'login', component: login },
    {
      path: '/',
      component: Home,
      children: [
        { path: '/', name: 'welcome', component: Welcome },
        { path: '/article', name: 'article', component: Article },
        { path: '/image', name: 'image', component: Image },
        { path: '/publish', name: 'publish', component: Publish }
      ] },
    // 路径走到这个位置，证明没有任何程序去处理这个路径
    { path: '*', name: '404', component: NodFound }
  ]
})
// 主次一个全局的导航守卫  beforeEach后置守卫
router.beforeEach((to, from, next) => {
//   // r如果不清楚主动的出发，resolve(next下一步)会一直等待
//   // 如果是登陆页面   放行
//   if (to.path === '/login') return next()
//   // console.log('ok')
//   // 判断登陆状态
//   const user = window.sessionStorage.getItem('hm73-tt')
//   if (user) {
//     next()
//   } else {
//     next('/login')
//   }

  // 间歇
  const user = window.sessionStorage.getItem('hm73-tt')
  if (to.path != '/login' && !user) return next('/login')
  next()
})
export default router
