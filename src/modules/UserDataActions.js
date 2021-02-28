const UserDataActions = {
  setUserData(value) {
    return {
      type: 'SET_DATA',
      data: value,
    }
  },
  deleteUserData() {
    return {
      type: 'DELETE_DATA',
    }
  },
}

export default UserDataActions