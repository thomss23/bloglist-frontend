import { createSlice } from '@reduxjs/toolkit'


const blogSlice = createSlice({
  name:'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    }
  }

})

export default blogSlice.reducer
export const { setBlogs } = blogSlice.actions