import { Alert } from '@mui/material'

const Notification = ({ message, type }) => {

  return (
    <div>
      {(message &&
    <Alert severity={type}>
      {message}
    </Alert>
      )}
    </div>
  )
}

export default Notification