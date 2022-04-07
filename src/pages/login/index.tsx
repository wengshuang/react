import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../api/user'
import './index.less'

const Login = function () {
  const [username, setusername] = useState('admin')
  const [password, setpassword] = useState('')
  const nav = useNavigate()

  async function handleClick() {
    try {
      const {
        data: { data }
      } = await api.login({
        username: username || 'admin',
        password: password
      })
      localStorage.token = data.token
      nav('/blog-menu')
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <div className="container">
      <div className="login-wrapper">
        <div className="header">Login</div>
        <div className="form-wrapper">
          <input
            type="text"
            value={username}
            onChange={(e) => setusername(e.target.value)}
            name="username"
            placeholder="admin"
            className="input-item"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            name="password"
            placeholder="密码"
            className="input-item"
          />
          <button className="btn" onClick={() => handleClick()}>
            登录
          </button>
        </div>
      </div>
    </div>
  )
}
export default Login
