import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
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

const App = (props: any) => {
  const nav = useNavigate()
  useEffect(() => {
    api.getUserInfo().then(({ data: { data } }) => {
      props.setName(data.name)
      props.setMenu(data.authorization)
      console.log(data.authorization)
      nav(menu[data.authorization[0]].path, { replace: true })
    })
    // if (props.menu.includes(url)) {

    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="home" element={<Sus child={<Home />} />}></Route>
        {props.menu.map((item: string) => {
          const { path, Com, name } = menu[item]
          return <Route path={path} key={item} element={<Sus child={<Com name={name} />} />}></Route>
        })}
      </Route>
      <Route path="login" element={<Login />}></Route>
      {/* <Route path='*' element={<NotFound/>}></Route> */}
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
