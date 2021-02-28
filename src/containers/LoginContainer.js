import {
  connect,
} from 'react-redux'

import App from '../App'
import LoginActions from '../modules/LoginActions'

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleSetEmail(value) {
      dispatch(LoginActions.setEmail(value))
    },
    handleDeleteEmail() {
      dispatch(LoginActions.deleteEmail())
    },
    handleSetPassword(value) {
      dispatch(LoginActions.setPassword(value))
    },
    handleDeletePassword() {
      dispatch(LoginActions.deletePassword())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

