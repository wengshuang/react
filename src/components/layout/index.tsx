import React from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import { HomeOutlined, TagsOutlined } from '@ant-design/icons'
import style from './index.module.css'

const { SubMenu } = Menu
const { Header, Sider } = Layout

const LayoutCom = function (props: any) {
  const local = useLocation()
  return (
    <Layout>
      <Header>
        <span className={style.color_fff}>{props.name}</span>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            selectedKeys={[local.pathname]}
            defaultOpenKeys={[local.pathname.split('-')[0].replace('/', '')]}
            style={{ height: '100%', borderRight: 0 }}
          >
            <Menu.Item key="home" icon={<HomeOutlined />}>
              <Link to="/home">首页</Link>
            </Menu.Item>
            <SubMenu key="blog" icon={<TagsOutlined />} title="博客设置">
              <Menu.Item key="/blog-menu">
                <Link to="/blog-menu">博客菜单</Link>
              </Menu.Item>
              <Menu.Item key="/blog-list">
                <Link to="/blog-list">博客列表</Link>
              </Menu.Item>
            </SubMenu>
            {/* icon={<UserOutlined />} */}
            {/* <SubMenu key="list" title="测试成员">
              <Menu.Item key="/list">
                <Link to="/list">成员</Link>
              </Menu.Item>
            </SubMenu> */}
          </Menu>
        </Sider>
        <Layout style={{ padding: '24px' }}>
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  )
}

export default LayoutCom
