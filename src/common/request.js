import router from '@/router'
import axios from 'axios'
import { Message } from 'element-ui'

// 创建一个axios实例
const http = axios.create({
  baseURL: '/apiV2/',
  // baseURL: '/api/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

// 请求拦截器
http.interceptors.request.use(
  config => {
    // 在请求发送之前做一些处理
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = token
    }


    // 添加自定义的User-Agent头部
    // const userAgent = window.navigator.userAgent
    // config.headers['User-Agent'] = userAgent

    return config
  },
  error => {
    // 处理请求错误
    console.error(error)
    return Promise.reject(error)
  }
)

// 响应拦截器
http.interceptors.response.use(
  response => {
    // console.log(response, "response");
    const res = response.data
    if (res.code == 0) {
      return response.data;
    } else if (res.code == 15) {
      Message.error(res.result)
      localStorage.clear()
      router.push("/loginIndex")
    } else {
      console.log(res, "adfas");
      Message.error(res.result)
      return Promise.reject(new Error((res && res.result) || "系统错误"))
    }
    // 在这里对后端返回的数据进行处理

  },
  error => {
    // console.log(error, "error");
    const errRes = error.response
    if (errRes.status == 401) {
      console.log(errRes.data, "error.....");
      Message.error("登录失效")
      localStorage.clear()
      router.push("/loginIndex")
      return Promise.reject("登录失效")
    }
    // 在这里对请求错误进行处理

  }
)

export default http
