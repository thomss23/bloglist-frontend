// import LoginForm from './LoginForm'
import Notification from './Notification'
import SignIn from './SignIn'
// import Togglable from './Togglable'

const Login = ({ notificationMessage }) => {
  return (
    <div>
      <Notification message={notificationMessage} type='error'/>
      <SignIn/>
    </div>
  )
}

export default Login