import axios, { AxiosInstance, AxiosResponse } from 'axios'
// import qs from 'qs'
import { message } from 'antd'
import { showMessage } from './status'

// 返回res.data的interface
export interface IResponse {
  code: number | string
  data: any
  msg: string
}
let axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
})

// axios实例拦截响应
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // if (response.headers.authorization) {
    //   localStorage.setItem('app_token', response.headers.authorization)
    // } else {
    //   if (response.data && response.data.token) {
    //     localStorage.setItem('app_token', response.data.token)
    //   }
    // }
    if (response.status === 200) {
      if (response.data.code === 200) {
        return response
      } else {
        message.warning(response.data.message)
        return Promise.reject(response)
      }
    } else {
      message.error(showMessage(response.status))
      return Promise.reject(response)
    }
  },
  // 请求失败
  (error: any) => {
    const { response } = error
    if (response) {
      // 请求已发出，但是不在2xx的范围
      showMessage(response.status)
      return Promise.reject(response.data)
    } else {
      message.warning('网络连接异常,请稍后再试!')
    }
  },
)
// 不需要token的url
const unUseToken = ['/login', '/register']

// axios实例拦截请求
axiosInstance.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem('token')
    if (token && !unUseToken.includes(config.url)) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: any) => {
    return Promise.reject(error)
  },
)
interface Ruquest {
  url: string
  method: 'get' | 'post' | 'put' | 'delete'
  data?: any
}

const request = (params: Ruquest) => {
  return axiosInstance({
    url: params.url,
    method: params.method,
    [params.method === 'get' ? 'params' : 'data']: params.data,
  })
}
export default request
