import { configureStore } from '@reduxjs/toolkit'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
import userInfoReducer from './reducers/userInfoReducer'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    notification: notificationReducer,
    userInfo: userInfoReducer
  }
})
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
