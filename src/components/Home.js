import { List, ListItem, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import Blog from './Blog'
import BlogForm from './BlogForm'
import Notification from './Notification'
import Togglable from './Togglable'



const Home = ({ notificationMessage, blogFormRef, handleVisibility, sortedBlogs }) => {

  return(

    <div>
      <Notification message={notificationMessage} type='success'></Notification>

      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm handleVisibility={handleVisibility}/>
      </Togglable>

      <Typography variant="h4" component="h2" color='blue'>Blogs</Typography>


      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        aria-label="blogs">

        {sortedBlogs.map(blog => {
          return (
            <ListItem key={blog.id} disablePadding>
              <Link to={`/blogs/${blog.id}`}>
                <Blog blog={blog} visible={false} />
              </Link>
            </ListItem>
          )
        }
        )}

      </List>

    </div>
  )

}

export default Home