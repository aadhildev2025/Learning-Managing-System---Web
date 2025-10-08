import React, { createContext, useEffect, useState } from 'react'
import usersSeed from '../data/users.json'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('lms_user')
    return raw ? JSON.parse(raw) : null
  })

  // use seed data or saved local users
  const [users, setUsers] = useState(() => {
    const raw = localStorage.getItem('lms_users')
    return raw ? JSON.parse(raw) : usersSeed
  })

  // keep users list in localStorage
  useEffect(() => {
    localStorage.setItem('lms_users', JSON.stringify(users))
  }, [users])

  // keep logged in user in localStorage
  useEffect(() => {
    if (user) localStorage.setItem('lms_user', JSON.stringify(user))
    else localStorage.removeItem('lms_user')
  }, [user])

  // ✅ fixed: return user object along with success
  const login = (email, password) => {
    const found = users.find(u => u.email === email && u.password === password)
    if (found) {
      setUser(found)
      return { success: true, user: found }
    }
    return { success: false, message: 'Invalid credentials' }
  }

  const register = (name, email, password, role = 'Student') => {
    if (users.some(u => u.email === email)) {
      return { success: false, message: 'Email already used' }
    }
    const newUser = { id: Date.now(), name, email, password, role }
    setUsers(prev => [...prev, newUser])
    setUser(newUser)
    return { success: true, user: newUser }
  }

  const logout = () => {
    setUser(null)
  }

  const updateUser = (updated) => {
    setUsers(prev => prev.map(u => u.id === updated.id ? updated : u))
    if (user?.id === updated.id) setUser(updated)
  }

  const deleteUser = (id) => {
    setUsers(prev => prev.filter(u => u.id !== id))
    if (user?.id === id) logout()
  }

  return (
    <AuthContext.Provider
      value={{ user, users, login, register, logout, updateUser, deleteUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
