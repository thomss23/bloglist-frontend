// import { useSelector } from 'react-redux'

// const User = ({ selectedUser }) => {
//   const loggedInUser = useSelector(state => state.userInfo)
//   return (
//     <div>
//       <h2>Blogs</h2>

//       <div>
//         {loggedInUser.username} logged in
//       </div>

//       <h1>{selectedUser.username}</h1>

//       <h3>added blogs</h3>

//       <ul>
//         {selectedUser.blogs.map(blog => {
//           return <li key={blog.id}>{blog.title}</li>
//         })}
//       </ul>
//     </div>
//   )
// }

// export default User


import { Grid, List, ListItem, ListItemText, Typography } from '@mui/material'
import { useSelector } from 'react-redux'

const User = ({ selectedUser }) => {
  const loggedInUser = useSelector(state => state.userInfo)
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h2">Blogs</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>{loggedInUser.username} logged in</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h3">Added blogs:</Typography>
        <List>
          {selectedUser.blogs.map(blog => (
            <ListItem key={blog.id}>
              <ListItemText primary={blog.title} />
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  )
}

export default User