import request from '../utils/http'
const api = {
  addBlog(data?: any) {
    return request({
      url: '/blogs/addBlog',
      method: 'post',
      data
    })
  },
  getBlogs(data?: any) {
    return request({
      url: '/blogs/getBlogs',
      method: 'get',
      data
    })
  },
  delBlog(data?: any) {
    return request({
      url: '/blogs/delBlog',
      method: 'post',
      data
    })
  },
  updateBlog(data?: any) {
    return request({
      url: '/blogs/updateBlog',
      method: 'post',
      data
    })
  },
  getBlogById(data?: any) {
    return request({
      url: '/blogs/getBlogById',
      method: 'get',
      data
    })
  }
}

export default api
