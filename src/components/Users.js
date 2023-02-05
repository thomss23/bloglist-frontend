import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setUsers } from '../reducers/usersReducer'
import { getAllUsers } from '../services/users'

const Users = () => {
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


      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Users</TableCell>
              <TableCell>Blogs</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.username}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Link to={`/users/${user.id}`}>{user.username}</Link>
                </TableCell>
                <TableCell >{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Users