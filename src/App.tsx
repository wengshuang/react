import React, { useEffect } from 'react'
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom'
// import { useAppDispatch, useAppSelector } from './controller/app/hooks';
// import { add,addMount } from './controller/counter'
import api from './api/user'

import { connect } from 'react-redux'
import Layout from './components/layout'
import Login from './pages/login'
import menu from './routers'
import Loading from './components/Loading'
// import NotFound from './components/NotFound'
const Home = React.lazy(() => import('./pages/home'))
interface Isus {
  // name: string
  child: any
}

function Sus(prop: Isus) {
  return <React.Suspense fallback={<Loading />}>{prop.child}</React.Suspense>
}

// const authorToMenu  = function  (author:string[]) {
//   author.
// }

const App = (props: any) => {
  const nav = useNavigate()
  const path = useLocation()
  useEffect(() => {
    if (path.pathname === '/login') {
      return
    }
    api
      .getUserInfo()
      .then(({ data: { data } }) => {
        props.setName(data.username)
        props.setMenu(data.auth)
        const currentPath = path.pathname
        // 如果刷新页面后的路由是有权限就跳到该路由
        // 如果没有就跳到home
        // 没有权限就跳到login
        if (!data.auth.length) {
          nav('/login', { replace: true })
          return
        }
        if (data.auth.includes(currentPath)) {
          nav(path.pathname, { replace: true })
        } else {
          nav('/home', { replace: true })
        }
      })
      .catch(() => {
        nav('/login', { replace: true })
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="home" element={<Sus child={<Home />} />}></Route>
        {props.menu.map((item: string) => {
          const { path, Com, name } = menu[item]
          return <Route path={path} key={item} element={<Sus child={<Com name={name} />}></Sus>}></Route>
        })}
      </Route>
      <Route path="login" element={<Login />}></Route>
      {/* <Route path="*" element={<Navigate to="/home" replace></Navigate>}></Route> */}
      {/* {
        props.menu.length>0? <Route path='*' element={<NotFound/>}></Route>:''
      } */}
    </Routes>
  )
}
export default connect(
  (state: any) => ({
    menu: state.user.menu,
  }),
  {
    setName: (name: string) => ({
      type: 'SET_NAME',
      payload: {
        name,
      },
    }),
    setMenu: (menu: string[]) => ({
      type: 'SET_MENU',
      payload: {
        menu,
      },
    }),
  },
)(App)
