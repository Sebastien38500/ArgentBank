import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  firstName: '',
  isRemember:false,
  lastName: '',
  userName:'',
  error: '',
}

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
  
    setFirstName: (state, action) => {
      state.isLoading = false
      state.firstName = action.payload
      state.error = ''
    },
    setLastName: (state, action) => {
      state.isLoading = false
      state.lastName = action.payload
      state.error = ''
    },
   setError: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    }, 
     setUserName: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
    setIsRemember: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
   
  },
})
const { actions, reducer } = profileSlice
export const {

  setFirstName,
  setLastName,
  setError,
  setUserName,
  setIsRemember,

} = actions
export default reducer