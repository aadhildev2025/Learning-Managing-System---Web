import React, { useContext } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import Button from '@mui/material/Button'
import AuthContext from '../../contexts/AuthContext'
import { ThemeContextCustom } from '../../contexts/ThemeContext'

export default function TopBar() {
  const { user, logout } = useContext(AuthContext)
  const { mode, toggleMode } = React.useContext(ThemeContextCustom)

  return (
    <AppBar position="static" color="primary" sx={{ mb: 2 }}>
      <Toolbar className="px-4">
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          LMS Dashboard
        </Typography>
        <IconButton onClick={toggleMode} color="inherit">
          {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
        </IconButton>
        {user ? (
          <>
            <Typography variant="body2" sx={{ mx: 2 }}>{user.name} ({user.role})</Typography>
            <Button color="inherit" onClick={logout}>Logout</Button>
          </>
        ) : null}
      </Toolbar>
    </AppBar>
  )
}
