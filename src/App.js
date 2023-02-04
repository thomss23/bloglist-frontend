import { useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import './index.css'
import Togglable from './components/Togglable'
import { setBlogs } from './reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './reducers/userInfoReducer'
const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      dispatch(setBlogs(blogs))
    )
  }, [dispatch])

  const blogs = useSelector(state => state.blogs)
  const notificationMessage = useSelector(state => state.notification)
  const user = useSelector(state => state.userInfo)


  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  function handleLogOut() {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(setUser(null))
    blogService.setToken(null)
  }

  const blogFormRef = useRef()

  const handleVisibility = () => {
    blogFormRef.current.toggleVisibility()
  }

  // const handleBlogUpdate = (blogObject, blogID) => {
  //   return blogService
  //     .updateBlog(blogObject, blogID)

  // }
  // const handleDelete = (id, title) => {
  //   if (window.confirm('Remove blog ' + title)) {
  //     blogService
  //       .deleteBlog(id)
  //       .then(response => {
  //         setBlogs(blogs.filter((blog) => blog.id !== id))
  //       })
  //       .catch(err => {
  //         console.log(err)
  //       })
  //   }
  // }

  if (user === null) {
    return (
      <>
        <Notification message={notificationMessage} type='error'/>
        <Togglable buttonLabel='login'>
          <LoginForm/>
        </Togglable>
      </>
    )}
  return (
    <div>
      <Notification message={notificationMessage} type='notification'></Notification>
      <p>{`${user.username} logged in`}</p> <button type="button" onClick={handleLogOut}>Logout</button>

      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm handleVisibility={handleVisibility}/>
      </Togglable>

      <h2>blogs</h2>

      {sortedBlogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}


    </div>
  )
}

export default App
