import { useState, useEffect, useRef } from 'react'
import loginService from './services/login'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import './index.css'
import Togglable from './components/Togglable'
import { setBlogs } from './reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMeessage, setErrorMessage] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)

  const dispatch = useDispatch()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      dispatch(setBlogs(blogs))
    )
  }, [dispatch])

  const blogs = useSelector(state => state.blogs)
  const sortedBlogs = [...blogs]
  sortedBlogs.sort((a, b) => b.likes - a.likes)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLoginSubmit = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      blogService.setToken(user.token)

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      setUser(user)
      setUsername('')
      setPassword('')

    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

    setNotificationMessage('Succesfully logged in')
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  function handleLogOut() {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    blogService.setToken(null)
  }

  const blogFormRef = useRef()

  const createBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .createBlog(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNotificationMessage(`Blog with title ${blogObject.title} added`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })
  }
  const handleBlogUpdate = (blogObject, blogID) => {
    return blogService
      .updateBlog(blogObject, blogID)

  }
  const handleDelete = (id, title) => {
    if (window.confirm('Remove blog ' + title)) {
      blogService
        .deleteBlog(id)
        .then(response => {
          setBlogs(blogs.filter((blog) => blog.id !== id))
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  if (user === null) {
    return (
      <>
        <Notification message={errorMeessage} type='error'/>
        <Togglable buttonLabel='login'>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLoginSubmit}
            errorMessage = {errorMeessage}
          />
        </Togglable>
      </>
    )}
  return (
    <div>
      <Notification message={notificationMessage} type='notification'></Notification>
      <p>{`${user.username} logged in`}</p> <button type="button" onClick={handleLogOut}>Logout</button>

      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm
          createBlog={createBlog}
        />
      </Togglable>

      <h2>blogs</h2>

      {sortedBlogs.map(blog =>
        <Blog key={blog.id} blog={blog} onDelete={handleDelete} onUpdate={handleBlogUpdate} />
      )}


    </div>
  )
}

export default App
