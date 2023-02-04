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
      <div>
        title
        <input id='title-input'
          type="text"
          name="title"
        />
      </div>
      <div>
        author
        <input id='author-input'
          name="author"
        />
      </div>
      <div>
        url
        <input id='url'
          type="text"
          name="url"
        />
      </div>
      <button type="submit">Create</button>
    </form>
  )
}

export default BlogForm