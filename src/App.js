import { useEffect, useRef } from 'react'
import blogService from './services/blogs'
import './index.css'
import { setBlogs } from './reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './reducers/userInfoReducer'
import { Link, Route, Routes, useMatch } from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'
import { Container } from '@mui/system'
import { AppBar, Button, IconButton, Toolbar } from '@mui/material'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      dispatch(setBlogs(blogs))
    )
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const userInfo = JSON.parse(loggedUserJSON)
      dispatch(setUser(userInfo))
      blogService.setToken(userInfo.token)
    }
  }, [dispatch])

  const user = useSelector(state => state.userInfo)
  const blogs = useSelector(state => state.blogs)
  const notificationMessage = useSelector(state => state.notification)
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  function handleLogOut() {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(setUser(null))
    blogService.setToken(null)
  }

  const blogFormRef = useRef()

  const handleVisibility = () => {
    blogFormRef.current.toggleVisibility()
  }
  const matchUser = useMatch('/users/:id')
  const users = useSelector(state => state.users)
  const selectedUser = matchUser ? users.find(user => user.id === matchUser.params.id) : null

  const matchBlog = useMatch('/blogs/:id')
  const selectedBlog = matchBlog ? blogs.find(blog => blog.id === matchBlog.params.id) : null

  if(!user) {
    return(<Login notificationMessage={notificationMessage}></Login>)
  }

  return(
    <Container>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
          </IconButton>
          <Button color="inherit" component={Link} to='/users'>
            {/* <Link to="/users">users</Link> */}
            users
          </Button>
          <Button color="inherit" component={Link} to='/'>
            {/* <Link to="/">blogs</Link> */}
            blogs
          </Button>
          <Button
            type="submit"
            color="inherit"
            onClick={handleLogOut}>
            Log out
          </Button>
        </Toolbar>
      </AppBar>


      {/* <div>
        <Link style={padding} to="/">blogs</Link>
        <Link style={padding} to="/users">users</Link>
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleLogOut}>
         Log out
        </Button>
      </div> */}
      <Routes>
        <Route path="/" element={<Home username={user.username}
          notificationMessage={notificationMessage}
          handleLogOut={handleLogOut}
          blogFormRef={blogFormRef}
          handleVisibility={handleVisibility}
          sortedBlogs={sortedBlogs} />} />
        <Route path='/login' element={<Login notificationMessage={notificationMessage} />} />
        <Route path='/users' element={<Users handleLogOut={handleLogOut}></Users>} />
        <Route path="/users/:id" element={<User selectedUser={selectedUser} handleLogOut={handleLogOut} />} />
        <Route path="/blogs/:id" element={<Blog blog={selectedBlog} visible={true} handleLogOut={handleLogOut} />} />
      </Routes>
    </Container>

  )
}

export default App
