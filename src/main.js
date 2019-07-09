import Vue from 'vue'
import App from './App.vue'

// 导包
import ElementUI from 'element-ui'
// 引入样式
import 'element-ui/lib/theme-chalk/index.css'

// 默认会去加载索引文件  index.js/index.vue/index.json
// 在vue-cli创建的项目中 @前缀代表的是根路径  src目录
import router from '@/router'

// 在全局范围内注册组件 (注册element-ui组件库)
Vue.use(ElementUI)
Vue.config.productionTip = false

// 1 依赖项目需要的资源 （js模块  css模块）
// 2  实例化根实例  render() 渲染app组件   然后挂在到#app的容器内
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
