import React, { createContext, useEffect, useState } from 'react'
import coursesSeed from '../data/courses.json'

const DataContext = createContext()

export const DataProvider = ({ children }) => {
  const [courses, setCourses] = useState(() => {
    const raw = localStorage.getItem('lms_courses')
    return raw ? JSON.parse(raw) : coursesSeed
  })

  useEffect(() => {
    localStorage.setItem('lms_courses', JSON.stringify(courses))
  }, [courses])

  const addCourse = (course) => {
    setCourses(prev => [...prev, { ...course, id: Date.now(), enrolledStudents: [], modules: course.modules || [] }])
  }

  const updateCourse = (updated) => {
    setCourses(prev => prev.map(c => c.id === updated.id ? updated : c))
  }

  const deleteCourse = (id) => {
    setCourses(prev => prev.filter(c => c.id !== id))
  }

  const enrollStudent = (courseId, studentId) => {
    setCourses(prev => prev.map(c => {
      if (c.id !== courseId) return c
      if (!c.enrolledStudents.includes(studentId)) return { ...c, enrolledStudents: [...c.enrolledStudents, studentId] }
      return c
    }))
  }

  const unenrollStudent = (courseId, studentId) => {
    setCourses(prev => prev.map(c => {
      if (c.id !== courseId) return c
      return { ...c, enrolledStudents: c.enrolledStudents.filter(s => s !== studentId) }
    }))
  }

  const toggleModuleComplete = (courseId, moduleId, studentId) => {
    setCourses(prev => prev.map(c => {
      if (c.id !== courseId) return c
      const modules = c.modules.map(m => {
        if (m.id !== moduleId) return m
        const completed = new Set(m.completedBy || [])
        if (completed.has(studentId)) completed.delete(studentId)
        else completed.add(studentId)
        return { ...m, completedBy: Array.from(completed) }
      })
      return { ...c, modules }
    }))
  }

  return (
    <DataContext.Provider value={{
      courses,
      addCourse,
      updateCourse,
      deleteCourse,
      enrollStudent,
      unenrollStudent,
      toggleModuleComplete
    }}>
      {children}
    </DataContext.Provider>
  )
}

export default DataContext
