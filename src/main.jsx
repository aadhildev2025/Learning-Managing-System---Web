import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { AuthProvider } from './contexts/AuthContext'
import { DataProvider } from './contexts/DataContext'
import { ThemeProviderCustom } from './contexts/ThemeContext'
import NotificationProvider from './components/notifications/NotificationProvider'
import './index.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProviderCustom>
        <DataProvider>
          <NotificationProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </NotificationProvider>
        </DataProvider>
      </ThemeProviderCustom>
    </AuthProvider>
  </React.StrictMode>
)
