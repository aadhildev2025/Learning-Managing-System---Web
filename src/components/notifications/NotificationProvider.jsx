import React, { createContext, useState } from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'

export const NotificationContext = createContext()

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export default function NotificationProvider({ children }) {
  const [snack, setSnack] = useState({ open: false, message: '', severity: 'info' })

  const notify = (message, severity = 'info') => {
    setSnack({ open: true, message, severity })
  }

  const handleClose = () => setSnack(s => ({ ...s, open: false }))

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      <Snackbar open={snack.open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert onClose={handleClose} severity={snack.severity} sx={{ width: '100%' }}>
          {snack.message}
        </Alert>
      </Snackbar>
    </NotificationContext.Provider>
  )
}
