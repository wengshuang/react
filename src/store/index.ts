import { combineReducers, createStore } from 'redux'
import user from './user'

export default createStore(combineReducers({ user }))
