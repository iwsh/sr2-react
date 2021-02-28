import { combineReducers } from 'redux'
import LoginReducer from './LoginReducer'
import UserDataReducer from './UserDataReducer'

const rootReducer = combineReducers({
//   login: LoginReducer,
//   userdata: UserDataReducer,
  LoginReducer,
  UserDataReducer
})

export default rootReducer