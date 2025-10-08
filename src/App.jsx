import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import AdminDashboard from './pages/admin/AdminDashboard'
import InstructorDashboard from './pages/instructor/InstructorDashboard'
import StudentDashboard from './pages/student/StudentDashboard'
import CourseDetail from './components/course/CourseDetail'
import ProtectedRoute from './components/common/ProtectedRoute'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/admin" element={<ProtectedRoute allowedRoles={['Admin']}><AdminDashboard /></ProtectedRoute>} />
      <Route path="/instructor" element={<ProtectedRoute allowedRoles={['Instructor']}><InstructorDashboard /></ProtectedRoute>} />
      <Route path="/student" element={<ProtectedRoute allowedRoles={['Student']}><StudentDashboard /></ProtectedRoute>} />

      <Route path="/course/:id" element={<ProtectedRoute allowedRoles={['Student','Instructor','Admin']}><CourseDetail /></ProtectedRoute>} />

      <Route path="*" element={<div className="p-6">Page Not Found</div>} />
    </Routes>
  )
}
