
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({

  name: 'auth',

  initialState: {
    token: localStorage.getItem('token') || null,
    userName: localStorage.getItem('userName') || null,
    firstName: localStorage.getItem('first name') || null,
    isLoading: false,
    isAuth: false,
    isRemember: false,
    error: '',
    isRemember: false,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setFirstName: (state, action) => {
      state.firstName = action.payload;
    },
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    clearToken: (state) => {
      state.token = null;
    },
    handleSignIn: (state, action) => {
      state.token = action.payload;
    }, 
    logingSuccess: (state) => {
      state.isLoading = false
      state.isAuth = true
      state.error = ''
    },
    logingError: (state, action) => {
      state.isLoading = false
      state.error = 'E-mail ou mot de passe invalide';
    },
    logingRemember: (state, action) => {
      state.isRemember = action.payload
    },
    logingOut: (state) => {
      state.isAuth = false
    },
  },
});


export const selectToken = (state) => state.auth.token;
export const {
  setToken,
  setFirstName,
  clearToken,
  setUserName,
  handleSignIn,
  logingSuccess,
  logingError,
  logingOut,
  logingRemember,
} = authSlice.actions;
export default authSlice.reducer;
