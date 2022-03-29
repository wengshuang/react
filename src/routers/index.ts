import { lazy } from 'react'
const LIST = lazy(() => import('../pages/list'))
const DETAILS = lazy(() => import('../pages/details'))
const PRODUCT = lazy(() => import('../pages/product'))
const router: any = {
  LIST: {
    path: '/list',
    name: '列表',
    Com: LIST,
  },
  DETAILS: {
    path: '/details',
    name: '详情',
    Com: DETAILS,
  },
  PRODUCT: {
    path: '/product',
    name: '生产',
    Com: PRODUCT,
  },
}

export default router
