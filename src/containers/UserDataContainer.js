import {
  connect,
} from 'react-redux'

import App from '../App'
import UserDataActions from '../modules/UserDataActions'

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleSetUserData(value) {
      dispatch(UserDataActions.setUserData(value))
    },
    handleDeleteUserData() {
      dispatch(UserDataActions.deleteUserData())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

