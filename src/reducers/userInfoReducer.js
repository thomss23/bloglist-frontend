import { createSlice } from '@reduxjs/toolkit'

const userInfoSlice = createSlice({
  name:'userInfo',
  initialState : null,
  reducers: {
    setUser(state, action) {
      if(!action.payload) {
        return null
      }
      return {
        username: action.payload.username,
        token: action.payload.token
      }
    }
  }
})

export default userInfoSlice.reducer
export const { setUser } = userInfoSlice.actions