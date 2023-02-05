import { Button, TextField } from '@mui/material'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { clearNotificationMessage, setNotificationMessage } from '../reducers/notificationReducer'
import blogService from '../services/blogs'
const BlogForm = ({ handleVisibility }) => {
  const dispatch = useDispatch()

  const createFromObject = (blogObject) => {
    handleVisibility()
    blogService
      .createBlog(blogObject)
      .then(returnedBlog => {
        dispatch(createBlog(returnedBlog))
        dispatch(setNotificationMessage(`Blog with title ${blogObject.title} added`))
        setTimeout(() => {
          dispatch(clearNotificationMessage())
        }, 5000)
      })
  }

  const handleBlogCreation = (event) => {
    event.preventDefault()
    const blogObject = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value,
    }
    createFromObject(blogObject)

    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''
  }

  return(
    <form onSubmit={handleBlogCreation}>
      <TextField
        label="Title"
        name="title"
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <TextField
        label="Author"
        name="author"
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <TextField
        label="URL"
        name="url"
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        margin="normal"
      >
        Create
      </Button>
    </form>
  )
}

export default BlogForm