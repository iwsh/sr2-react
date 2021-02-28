// 初期State
const initialState = {
  email: 'initial_email',
  password: 'initial_password',
}

// Reducer処理
const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_EMAIL':
      return {
        email: action.email,
        password: state.password,
      }
    case 'DELETE_EMAIL':
      return {
        email: '',
        password: state.password,
      }
    case 'SET_PASSWORD':
      return {
        email: state.email,
        password: action.password,
      }
    case 'DELETE_PASSWORD':
      return {
        email: state.email,
        password: '',
      }
    default:
      return state
  }
}

export default LoginReducer