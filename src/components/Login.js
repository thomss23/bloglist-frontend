import LoginForm from './LoginForm'
import Notification from './Notification'
import Togglable from './Togglable'

const Login = ({ notificationMessage }) => {
  return (
    <div>
      <Notification message={notificationMessage} type='error'/>
      <Togglable buttonLabel='login'>
        <LoginForm/>
      </Togglable>
    </div>
  )
}

export default Login