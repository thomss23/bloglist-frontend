import { useSelector } from 'react-redux'

const User = ({ selectedUser }) => {
  const loggedInUser = useSelector(state => state.userInfo)
  return (
    <div>
      <h2>Blogs</h2>

      <div>
        {loggedInUser.username} logged in
      </div>

      <h1>{selectedUser.username}</h1>

      <h3>added blogs</h3>

      <ul>
        {selectedUser.blogs.map(blog => {
          return <li key={blog.id}>{blog.title}</li>
        })}
      </ul>
    </div>
  )
}

export default User