import React, { createContext, useEffect, useMemo, useState } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

export const ThemeContextCustom = createContext()

export const ThemeProviderCustom = ({ children }) => {
  const [mode, setMode] = useState(() => localStorage.getItem('lms_theme') || 'light')

  useEffect(() => {
    localStorage.setItem('lms_theme', mode)
  }, [mode])

  const toggleMode = () => setMode(prev => prev === 'light' ? 'dark' : 'light')

  const theme = useMemo(() => createTheme({
    palette: { mode }
  }), [mode])

  return (
    <ThemeContextCustom.Provider value={{ mode, toggleMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContextCustom.Provider>
  )
}
