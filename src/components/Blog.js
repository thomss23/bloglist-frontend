import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteBlog, updateBlog } from '../reducers/blogReducer'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()

  const [visible, setVisible] = useState(false)
  const hideDetailsWhenVisibleIsTrue = { display: visible ? 'none' : '' }
  const showDetailsWhenVisibleIsFale = { display: visible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const onUpdate = (blogObject, blogID) => {
    return blogService
      .updateBlog(blogObject, blogID)
  }

  const handleDelete = (id, title) => {
    if (window.confirm('Remove blog ' + title)) {
      blogService
        .deleteBlog(id)
        .then(response => {
          dispatch(deleteBlog(blog.id))
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

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

  return (
    <div>
      <div style={hideDetailsWhenVisibleIsTrue}>
        <div className='blog-nodetails' data-testid="blogDetailsoff" style={blogStyle}>
          <div>
            {blog.title}
          </div>
          <div>
            {blog.author}
          </div>
          <button onClick={toggleVisibility}>view</button>
        </div>
      </div>
      <div style={showDetailsWhenVisibleIsFale}>
        <div className='blog-withdetails' data-testid="blogDetailson" style={blogStyle}>
          <div>
            {blog.title}
          </div>

          <div>
            {blog.author}
          </div>

          <div>
              likes : {blog.likes}
            <button onClick={handleBlogUpdate}>like</button>
          </div>

          <div>
            {blog.url}
          </div>

          <button onClick={toggleVisibility}>hide</button>
          <br></br>
          <button onClick={() => handleDelete(blog.id, blog.title)}>Remove</button>
        </div>
      </div>
    </div>
  )
}

export default Blog