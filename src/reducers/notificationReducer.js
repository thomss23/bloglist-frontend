import { createSlice } from '@reduxjs/toolkit'


const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotificationMessage(state, action) {
      return action.payload
    },
    clearNotificationMessage(state, action) {
      return null
    }
  }

})

export const { setNotificationMessage, clearNotificationMessage } = notificationSlice.actions
export default notificationSlice.reducer