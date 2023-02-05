import { useDispatch, useSelector } from 'react-redux'
import { updateBlog } from '../reducers/blogReducer'
import blogService from '../services/blogs'

const Blog = ({ blog, visible, handleLogOut }) => {
  const dispatch = useDispatch()
  const loggedInUser = useSelector(state => state.userInfo)

  const hideDetailsWhenVisibleIsTrue = { display: visible ? 'none' : '' }
  const showDetailsWhenVisibleIsFale = { display: visible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
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
  return (
    <div>
      <div style={hideDetailsWhenVisibleIsTrue}>
        <div className='blog-nodetails' data-testid="blogDetailsoff" style={blogStyle}>
          <div>
            {blog.title}
          </div>
        </div>
      </div>
      <div style={showDetailsWhenVisibleIsFale}>
        <div className='blog-withdetails' data-testid="blogDetailson" style={blogStyle}>

          <h2>Blogs</h2>

          <div>
            {loggedInUser.username} logged in
          </div>

          <button onClick={handleLogOut}>logout</button>

          <div>
            {blog.title}
          </div>
          <div>
              likes : {blog.likes}
            <button onClick={handleBlogUpdate}>like</button>
          </div>
          <div>
            {blog.url}
          </div>
          <div>
            added by {blog.author}
          </div>
          <br></br>
          {/* {loggedInUser.username === blog.user.username ?  <button onClick={() => handleDelete(blog.id, blog.title)}>Remove</button> : <></>} */}
          {/* <button onClick={() => handleDelete(blog.id, blog.title)}>Remove</button> */}
        </div>
      </div>
    </div>
  )
}

export default Blog