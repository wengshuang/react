import { lazy } from 'react'
const LIST = lazy(() => import('../pages/list'))
const DETAILS = lazy(() => import('../pages/details'))
const PRODUCT = lazy(() => import('../pages/product'))
const USERS = lazy(() => import('../pages/users'))
const router: any = {
  '/list': {
    path: '/list',
    name: '成员列表',
    Com: LIST,
  },
  '/details': {
    path: '/details',
    name: '详情',
    Com: DETAILS,
  },
  '/product': {
    path: '/product',
    name: '生产',
    Com: PRODUCT,
  },
  '/users': {
    path: '/users',
    name: '用户列表',
    Com: USERS,
  },
}

export default router
