import { useState } from 'react'

const Blog = ({ blog, onDelete, onUpdate, userid }) => {

  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

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

  const handleBlogUpdate = (event) => {
    let blogObject = {
      title: blog.title,
      author: blog.author,
      likes: likes + 1
    }

    onUpdate(blogObject, blog.id)
      .then(returnedBlog => {
        setLikes(returnedBlog.likes)
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
              likes : {likes}
            <button onClick={handleBlogUpdate}>like</button>
          </div>

          <div>
            {blog.url}
          </div>

          <button onClick={toggleVisibility}>hide</button>
          <br></br>
          <button onClick={() => onDelete(blog.id, blog.title)}>Remove</button>
        </div>
      </div>
    </div>
  )
}

export default Blog