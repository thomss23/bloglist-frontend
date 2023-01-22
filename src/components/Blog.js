import { useState } from "react"
import blogService from "../services/blogs"

const Blog = ({blog}) => {

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
      user: blog.user.id,
      title: blog.title,
      author: blog.author,
      likes: likes + 1
    }
    event.preventDefault()
    blogService
      .updateBlog(blogObject, blog.id)
      .then(returnedBlog => {
        setLikes(returnedBlog.likes)
      })
  }

  return (
    <div>
      <div style={hideDetailsWhenVisibleIsTrue}>
        <div style={blogStyle}>
          {blog.title}
          <button onClick={toggleVisibility}>view</button>
        </div>
      </div>
      <div style={showDetailsWhenVisibleIsFale}>
        <div style={blogStyle}>
            {blog.title}
            <br></br>
            {blog.author}
            <br></br>
            <div>
              likes : {likes}
              <button onClick={handleBlogUpdate}>like</button>
            </div>
            {blog.url}
            <br></br>
            <button onClick={toggleVisibility}>hide</button>
        </div>
      </div>
    </div>
  )
}

export default Blog