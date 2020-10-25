import { createSlice } from '@reduxjs/toolkit';

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    value: false,
  },
  reducers: {
    login: state => {
      state.value = true;
    },
    logout: state => {
      state.value = false;
    },
  },
});

export const { login, logout } = usersSlice.actions;

export default usersSlice.reducer;