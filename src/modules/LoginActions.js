const LoginActions = {
  setEmail(value) {
    return {
      type: 'SET_EMAIL',
      email: value,
    }
  },
  deleteEmail() {
    return {
      type: 'DELETE_EMAIL',
    }
  },
  setPassword(value) {
    return {
      type: 'SET_PASSWORD',
      password: value,
    }
  },
  deletePassword() {
    return {
      type: 'DELETE_PASSWORD',
    }
  },
}

export default LoginActions