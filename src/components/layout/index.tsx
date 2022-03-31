import React from 'react'
import { connect } from 'react-redux'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import { UserOutlined, HomeOutlined } from '@ant-design/icons'
import style from './index.module.css'
import menu from '../../routers'

const { SubMenu } = Menu
const { Header, Sider } = Layout

const LayoutCom = function (props: any) {
  const loacl = useLocation()
  return (
    <Layout>
      <Header>
        <span className={style.color_fff}>{props.name}</span>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={[loacl.pathname]}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
          >
            <Menu.Item key="/home" icon={<HomeOutlined />}>
              <Link to="/home">首页</Link>
            </Menu.Item>
            <SubMenu key="sub1" icon={<UserOutlined />} title="成员">
              {props.menu.map((item: string, index: number) => {
                const { path, name } = menu[item]
                return (
                  <Menu.Item key={path}>
                    <Link to={path}>{name}</Link>
                  </Menu.Item>
                )
              })}
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ padding: '24px' }}>
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  )
}

export default connect((state: any) => {
  console.log(state)
  return {
    name: state.user.name,
    menu: state.user.menu,
  }
})(LayoutCom)
