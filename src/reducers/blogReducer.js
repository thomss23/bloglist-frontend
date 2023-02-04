import { createSlice } from '@reduxjs/toolkit'


const blogSlice = createSlice({
  name:'blogs',
  initialState: [],
  reducers: {
    createBlog(state, action) {
      const newBlog = action.payload
      state.push(newBlog)
    },
    setBlogs(state, action) {
      return action.payload
    },
    updateBlog(state, action) {
      return state.map(blog => blog.id === action.payload.id ? action.payload : blog)
    },
    deleteBlog(state, action) {
      return state.filter(blog => blog.id !== action.payload)
    }
  }

})

export default blogSlice.reducer
export const { setBlogs, createBlog, updateBlog, deleteBlog } = blogSlice.actions