import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { handleSaveUserName } from '../../components/form/form';
import { useSelector } from 'react-redux';

// Action creators to set profile user name and first name
export const setProfileUserName = (userName) => ({
  type: 'user/setProfileUserName',
  payload: userName,
});
export const setProfileFirstName = (firstName) => ({
  type: 'user/setProfileFirstName',
  payload: firstName,
});
export const setProfileLastName = (lastName) => ({
  type: 'user/setProfileLastName',
  payload: lastName,
});

// Action creator to set the "isRemember" property
export const setIsRememberAction = createAction('user/setIsRemember');

// Async thunk to handle user login
export const loginUser = createAsyncThunk(
  'user/login',
  async (userCredentials, { dispatch, getState }) => {
    try {
      // Get the current state to access the "isRemember" property
      const state = getState();
      const isRemember = state.user.isRemember; 

      // Make a request to the login API
      const request = await axios.post('http://localhost:3001/api/v1/user/login', userCredentials);
      const response = request.data.body;
      
      // Dispatch an action to fetch user data using the obtained token
      dispatch(fetchUserDatas(response.token));
      
      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }
);

// Async thunk to fetch user data using the token
export const fetchUserDatas = createAsyncThunk(
  'user/fetchUserDatas',
  async (token, { dispatch }) => {
    try {
      // Make a request to the user profile API
      const res = await axios.post(
        'http://localhost:3001/api/v1/user/profile',
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data } = res;

      // Handle the response and dispatch actions to update the state
      if (data && data.status === 200) {
        const { body } = data;
        if (body) {
          dispatch(setProfileUserName(body.userName));
          dispatch(setProfileFirstName(body.firstName));
          dispatch(setProfileLastName(body.lastName));

          return body;
        } else {
          throw new Error('Invalid response body');
        }
      } else {
        throw new Error(data ? data.message : 'Invalid response');
      }
    } catch (error) {
      throw error;
    }
  }
);

// Define the initial state and reducers for the user slice
const UserSlice = createSlice({
  name: 'user',

  initialState: {
    loading: false,
    user: null,
    token: '',
    isRemember: false, 
    error: null,
    lastName: '' 
  },

  // Handle actions and update the state accordingly
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        // Set loading state while logging in
        state.token = '';
        state.loading = true;
        state.user = null;
        state.isRemember = false;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        // Update state on successful login
        state.loading = false;
        state.user = action.payload;
        state.token = action.payload.token;
        state.isRemember = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        // Handle login failure
        state.loading = false;       
        state.user = null;
        state.isRemember = false;
        state.token = '';

        // Set an error message based on the type of error
        if (action.error.message === 'Request failed with status code 401') {
          state.error = 'Access Denied! Invalid Credentials';
        } else {
          state.error = action.error.message;
        }
      })
      .addCase(fetchUserDatas.pending, (state) => {
        // Set loading state while fetching user data
        state.userName = '';
        state.firstName = '';
        state.lastName = '';
        state.isLogin = false;
      })
      .addCase(fetchUserDatas.fulfilled, (state, action) => {
        // Update state with fetched user data
        state.userName = action.payload.userName;
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
        state.isLogin = true;
        state.error = null; 
      })  
      .addCase(fetchUserDatas.rejected, (state, action) => {
        // Handle user data fetching failure
        state.userName = '';
        state.firstName = '';
        state.lastName = '';
        state.isLogin = false;

        // Set an error message based on the type of error
        if (action.error.message === 'Request failed with status code 401') {
          state.error = 'Access Denied! Invalid Credentials';
        } else {
          state.error = action.error.message;
        }
      })
      .addCase(setIsRememberAction, (state, action) => {
        // Update "isRemember" state based on the action payload
        state.isRemember = action.payload;
      });
  },
});

// Export actions and reducer from the user slice
const { actions, reducer } = UserSlice;
export const { lastName, userName, error, isLogin, user, token, isRemember, isLoading, firstName } = UserSlice.actions;
export default UserSlice.reducer;
