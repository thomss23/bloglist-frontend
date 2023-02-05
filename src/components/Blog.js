import { Button, Card, CardContent, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import { updateBlog } from '../reducers/blogReducer'
import blogService from '../services/blogs'

const Blog = ({ blog, visible }) => {
  const dispatch = useDispatch()

  const blogStyle = {
    margin: 10,
    padding: 10,
    width: 300
  }

  const onUpdate = (blogObject, blogID) => {
    return blogService
      .updateBlog(blogObject, blogID)
  }

  // const handleDelete = (id, title) => {
  //   if (window.confirm('Remove blog ' + title)) {
  //     blogService
  //       .deleteBlog(id)
  //       .then(response => {
  //         dispatch(deleteBlog(blog.id))
  //         navigate('/')
  //       })
  //       .catch(err => {
  //         console.log(err)
  //       })
  //   }
  // }

  const handleBlogUpdate = () => {
    let blogObject = {
      title: blog.title,
      author: blog.author,
      likes: blog.likes + 1
    }

    onUpdate(blogObject, blog.id)
      .then(returnedBlog => {
        dispatch(updateBlog(returnedBlog))
      })
  }

  if(!blog) return null
  if(!visible) {
    return  <Card style={blogStyle}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {blog.title} by {blog.author}
        </Typography>
      </CardContent>
    </Card>
  }

  return (
    <Card style={blogStyle}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {blog.title} by {blog.author}
        </Typography>
        <Typography color="textSecondary">
          Likes: {blog.likes}
        </Typography>
        <Button onClick={handleBlogUpdate}>Like</Button>
        <Typography variant="body2" component="p">
          URL : {blog.url}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Added by {blog.author}
        </Typography>
        <Typography variant="h6" component="h3">
          Comments:
        </Typography>
        <ul>
          {blog.comments.map(comment => (
            <li key={comment}>{comment}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

export default Blog