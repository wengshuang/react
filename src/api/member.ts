import request from '../utils/http'
const api = {
  queryMemberList: (data?: any) => {
    return request({
      url: '/member/queryMemberList',
      method: 'get',
      data,
    })
  },
  addMember: (data?: any) => {
    return request({
      url: '/member/addMember',
      method: 'post',
      data,
    })
  },
  deleteMember: (data?: any) => {
    return request({
      url: '/member/deleteMember',
      method: 'post',
      data,
    })
  },
}

export default api
