import { useDispatch } from 'react-redux'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { clearNotificationMessage, setNotificationMessage } from '../reducers/notificationReducer'
import { setUser } from '../reducers/userInfoReducer'

const LoginForm = () => {
  const dispatch = useDispatch()

  const handleLoginSubmit = async (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value

    try {
      const user = await loginService.login({
        username, password,
      })
      console.log(user)
      blogService.setToken(user.token)

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      dispatch(setUser({
        username: username,
        token: user.token
      }))

      event.target.username.value = ''
      event.target.password.value = ''

    } catch (exception) {
      event.target.username.value = ''
      event.target.password.value = ''

      dispatch(setNotificationMessage('Wrong credentials'))
      setTimeout(() => {
        dispatch(clearNotificationMessage())
      }, 5000)
      return
    }

    dispatch(setNotificationMessage('Succesfully logged in'))
    setTimeout(() => {
      dispatch(clearNotificationMessage())
    }, 5000)
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLoginSubmit}>
        <div>
              username
          <input id='username'
            type="text"
            name="Username"
          />
        </div>
        <div>
              password
          <input id='password'
            type="password"
            name="Password"
          />
        </div>
        <button id='login-button' type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm