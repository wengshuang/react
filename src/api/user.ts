import request from '../utils/http'
const api = {
  login: (data: any) => {
    return request({
      url: '/login',
      method: 'get',
      data
    })
  },
  getUserInfo: (data?: any) => {
    return request({
      url: '/getUserInfo',
      method: 'get',
      data
    })
  },
  getData: (data?: any) => {
    return request({
      url: '/getData',
      method: 'get',
      data
    })
  }
}

export default api
