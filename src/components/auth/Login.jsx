import React, { useContext, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import AuthContext from '../../contexts/AuthContext'
import { TextField, Button, Paper, Typography, Divider, Stack } from '@mui/material'
import { motion } from 'framer-motion'
import TopBar from '../common/TopBar'

export default function Login() {
  const { login } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const submit = (e) => {
    e.preventDefault()

    if (!email || !password) {
      setError('Email and password are required.')
      return
    }

    const r = login(email.trim(), password.trim())

    if (r.success) {
      const user = r.user   // ✅ get user from login return
      if (user.role === 'Admin') navigate('/admin')
      else if (user.role === 'Instructor') navigate('/instructor')
      else navigate('/student')
    } else {
      setError(r.message || 'Invalid credentials')
    }
  }

  return (
    <>
      <TopBar />
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Paper elevation={6} className="p-8 rounded-2xl shadow-xl">
            <Typography variant="h4" className="text-center font-bold mb-4 text-blue-800">
              Welcome Back 👋
            </Typography>
            <Typography variant="body2" align="center" className="text-gray-500 mb-6">
              Login to your LMS account
            </Typography>

            <form onSubmit={submit}>
              <Stack spacing={3}>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
                <TextField
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />

                {error && (
                  <Typography color="error" variant="body2">
                    {error}
                  </Typography>
                )}

                <Button
                  variant="contained"
                  fullWidth
                  type="submit"
                  size="large"
                  sx={{
                    backgroundColor: '#3b82f6',
                    '&:hover': { backgroundColor: '#2563eb' },
                    borderRadius: '12px',
                    paddingY: '10px'
                  }}
                >
                  Login
                </Button>

                <Divider>OR</Divider>

                <Typography variant="body2" align="center">
                  No account?{' '}
                  <Link to="/register" className="text-blue-600 hover:underline">
                    Register here
                  </Link>
                </Typography>
              </Stack>
            </form>
          </Paper>
        </motion.div>
      </div>
    </>
  )
}
