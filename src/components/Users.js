import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setUsers } from '../reducers/usersReducer'
import { getAllUsers } from '../services/users'

const Users = ({ handleLogOut }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    getAllUsers().then(result => dispatch(setUsers(result)))
  }, [dispatch])

  const users = useSelector(state => state.users)
  const loggedInUser = useSelector(state => state.userInfo)

  return(
    <div>
      <h1>Blogs</h1>

      <div>
        {loggedInUser.username} logged in
      </div>

      <button onClick={handleLogOut}>logout</button>

      <table>
        <thead>
          <tr>
            <th>Users</th>
            <th>Blogs</th>
          </tr>
        </thead>

        <tbody>
          {users.map(user => {
            return (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.username}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Users