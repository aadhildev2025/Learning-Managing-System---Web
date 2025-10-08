import React, { useContext, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import AuthContext from '../../contexts/AuthContext'
import { TextField, Button, Paper, Typography, MenuItem, Divider, Stack } from '@mui/material'
import { motion } from 'framer-motion'
import TopBar from '../common/TopBar'

export default function Register() {
  const { register } = useContext(AuthContext)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('Student')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const submit = (e) => {
    e.preventDefault()
    const r = register(name, email, password, role)
    if (r.success) {
      if (role === 'Instructor') navigate('/instructor')
      else navigate('/student')
    } else {
      setError(r.message)
    }
  }

  return (
    <>
      <TopBar />
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Paper elevation={6} className="p-8 rounded-2xl shadow-xl">
            <Typography variant="h4" align="center" gutterBottom className="font-bold text-blue-800">
              Create Account 🚀
            </Typography>
            <Typography variant="body2" align="center" className="mb-6 text-gray-500">
              Join the LMS and start learning today
            </Typography>

            <form onSubmit={submit}>
              <Stack spacing={3}>
                <TextField
                  label="Full Name"
                  variant="outlined"
                  fullWidth
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
                <TextField
                  label="Email"
                  type="email"
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
                <TextField
                  select
                  label="Role"
                  value={role}
                  onChange={e => setRole(e.target.value)}
                  fullWidth
                >
                  <MenuItem value="Student">Student</MenuItem>
                  <MenuItem value="Instructor">Instructor</MenuItem>
                </TextField>

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
                  Register
                </Button>
              </Stack>
            </form>

            <Divider className="my-6">OR</Divider>

            <Typography variant="body2" align="center">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:underline">
                Login here
              </Link>
            </Typography>
          </Paper>
        </motion.div>
      </div>
    </>
  )
}
