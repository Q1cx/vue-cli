import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
// 1 依赖项目需要的资源 （js模块  css模块）
// 2  实例化根实例  render() 渲染app组件   然后挂在到#app的容器内
new Vue({
  render: h => h(App)
}).$mount('#app')
