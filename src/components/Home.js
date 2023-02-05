import { Link } from 'react-router-dom'
import Blog from './Blog'
import BlogForm from './BlogForm'
import Notification from './Notification'
import Togglable from './Togglable'

const Home = ({ username, notificationMessage, handleLogOut, blogFormRef, handleVisibility, sortedBlogs }) => {
  return(
    <div>
      <Notification message={notificationMessage} type='notification'></Notification>
      <p>{`${username} logged in`}</p> <button type="button" onClick={handleLogOut}>Logout</button>

      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm handleVisibility={handleVisibility}/>
      </Togglable>

      <h2>blogs</h2>

      {sortedBlogs.map(blog =>
        <Link key={blog.id} to={`/blogs/${blog.id}`}>
          <Blog blog={blog} visible={false} />
        </Link>
      )}
    </div>
  )

}

export default Home