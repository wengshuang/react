import React, { lazy } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import 'braft-editor/dist/index.css'
import Layout from './components/layout'
import Login from './pages/login'
const LIST = lazy(() => import('./pages/list'))
const BLOGMENU = lazy(() => import('./pages/blogMenu'))
const BLOGLIST = lazy(() => import('./pages/blogList'))

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

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/home" replace></Navigate>}></Route>
        <Route path="home" element={<Sus child={<Home />} />}></Route>
        <Route path="list" element={<Sus child={<LIST />} />}></Route>
        <Route path="blog-menu" element={<Sus child={<BLOGMENU />} />}></Route>
        <Route path="blog-list" element={<Sus child={<BLOGLIST />} />}></Route>
      </Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="*" element={<Navigate to="/login" replace></Navigate>}></Route>
      {/* {
        props.menu.length>0? <Route path='*' element={<NotFound/>}></Route>:''
      } */}
    </Routes>
  )
}
export default App
