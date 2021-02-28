// 初期State
const initialState = {
  data: {},
}

// Reducer処理
const UserDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_DATA':
      return {
        data: action.data,
      }
    case 'DELETE_DATA':
      return {
        data: {},
      }
    default:
      return state
  }
}

export default UserDataReducer