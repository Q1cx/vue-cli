// 封装axios
import axios from 'axios'
// 创建一个axios对象使用{}的配置项
const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/mp/v1_0/'
  // 请求头
//   headers: {
//     // token认证需要的字段   值 ：要加上前缀Bearer
//     Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem('hm73-tt')).token
//   }
})
// 添加请求拦截器
instance.interceptors.request.use(config => {
  // config 请求配置对象
  // 修改 config
  const user = window.sessionStorage.getItem('hm73-tt')
  if (user) {
    config.headers = {
      Authorization: 'Bearer ' + JSON.parse(user).token
    }
  }
  return config
}, error => {
  // 创建Promise对象的方式，new Promise()  结果可能成功，也可能失败，
  // Promise.resolve()创建一个成功的Promise
  // Promise.reject()创建一个成功的Promise

  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(response => {
  return response
}, (error) => {
  // 错的时候做自己的事情
  // 如果相应的状态是401 拦截到登陆页面
  // error.response.status 状态码
  if (error.response.status === 401) {
    // hash 是location提供获取操作 地址栏的#后的地址的属性
    location.hash = '#/login'
  }
  return Promise.reject(error)
})
export default instance
