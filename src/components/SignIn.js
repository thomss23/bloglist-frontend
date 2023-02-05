import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'

import { useDispatch } from 'react-redux'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { clearNotificationMessage, setNotificationMessage } from '../reducers/notificationReducer'
import { setUser } from '../reducers/userInfoReducer'
import { useNavigate } from 'react-router-dom'

import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme()


export default function SignIn() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleSubmit = async (event) => {

    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value

    try {
      const user = await loginService.login({
        username, password,
      })
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      dispatch(setUser({
        username: username,
        token: user.token
      }))

      event.target.username.value = ''
      event.target.password.value = ''

      dispatch(setNotificationMessage('Succesfully logged in'))
      setTimeout(() => {
        dispatch(clearNotificationMessage())
      }, 5000)

      navigate('/')
    } catch (exception) {
      event.target.username.value = ''
      event.target.password.value = ''

      dispatch(setNotificationMessage('Wrong credentials'))
      setTimeout(() => {
        dispatch(clearNotificationMessage())
      }, 5000)
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="username"
              type="text"
              name="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}