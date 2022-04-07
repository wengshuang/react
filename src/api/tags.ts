import request from '../utils/http'
const api = {
  addTag(data?: any) {
    return request({
      url: '/tags/addTag',
      method: 'post',
      data
    })
  },
  getTags(data?: any) {
    return request({
      url: '/tags/getTags',
      method: 'get',
      data
    })
  },
  getAllTags(data?: any) {
    return request({
      url: '/tags/getAllTags',
      method: 'get',
      data
    })
  },
  delTag(data?: any) {
    return request({
      url: '/tags/delTag',
      method: 'post',
      data
    })
  }
}

export default api
