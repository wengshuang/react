import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import api from '../../api/user'
import './index.less'

const Login = function (props: any) {
  const [username, setusername] = useState('admin')
  const [password, setpassword] = useState('000000')
  const nav = useNavigate()

  async function handleClick() {
    try {
      const {
        data: { data }
      } = await api.login({
        username: username || 'admin',
        password: password || '000000'
      })
      localStorage.token = data.token
      props.setName(data.username)
      props.setMenu(data.auth)
      nav('/home')
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
            placeholder="123456"
            className="input-item"
          />
          <button className="btn" onClick={() => handleClick()}>
            Login
          </button>
        </div>
      </div>
    </div>
  )
}
export default connect(null, {
  setName: (name: string) => ({
    type: 'SET_NAME',
    payload: {
      name
    }
  }),
  setMenu: (menu: string[]) => ({
    type: 'SET_MENU',
    payload: {
      menu
    }
  })
})(Login)
