import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import DataContext from '../../contexts/DataContext'
import AuthContext from '../../contexts/AuthContext'
import TopBar from '../common/TopBar'
import { Typography, Paper, Checkbox, Button, Stack, Chip } from '@mui/material'
import { calcCourseProgress } from '../../utils/progress'
import { motion } from 'framer-motion'

export default function CourseDetail() {
  const { courses, toggleModuleComplete, enrollStudent, unenrollStudent } = useContext(DataContext)
  const { user } = useContext(AuthContext)
  const { id } = useParams()
  const course = courses.find(c => String(c.id) === id)
  if (!course) return <div><TopBar /><div className="p-6">Course not found</div></div>

  const progress = user ? calcCourseProgress(course, user.id) : 0
  const enrolled = user && course.enrolledStudents.includes(user.id)

  return (
    <div>
      <TopBar />
      <div className="p-6 max-w-4xl mx-auto">
        <Paper elevation={4} className="p-6 rounded-2xl shadow-lg">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6">
            {/* Course Info */}
            <div className="flex-1">
              <Typography variant="h4" className="font-bold text-gray-800 mb-2">
                {course.title}
              </Typography>
              <Chip label={course.category} color="primary" size="small" className="mb-2" />
              <Typography variant="body1" className="text-gray-600 mb-4">{course.description}</Typography>

              {/* Progress Bar */}
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    style={{ width: `${progress}%` }}
                    className="h-3 bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500"
                  ></div>
                </div>
                <Typography variant="caption" className="text-gray-500 mt-1">
                  {progress}% complete
                </Typography>
              </div>
            </div>

            {/* Enroll / Unenroll Button */}
            {user && (
              enrolled ? (
                <Button
                  variant="contained"
                  color="error"
                  size="large"
                  onClick={() => unenrollStudent(course.id, user.id)}
                  className="self-start"
                >
                  Unenroll
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={() => enrollStudent(course.id, user.id)}
                  className="self-start"
                >
                  Enroll
                </Button>
              )
            )}
          </div>

          {/* Modules */}
          <div className="mt-8">
            <Typography variant="h6" className="font-semibold mb-3">Modules</Typography>
            <Stack spacing={2}>
              {course.modules.map(m => {
                const completed = (m.completedBy || []).includes(user?.id)
                return (
                  <motion.div
                    key={m.id}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-all"
                  >
                    <Checkbox
                      checked={completed}
                      onChange={() => toggleModuleComplete(course.id, m.id, user.id)}
                      color="primary"
                    />
                    <div>
                      <Typography className={completed ? 'line-through text-gray-400' : ''}>
                        {m.title}
                      </Typography>
                      <Typography variant="caption" className="text-gray-500">
                        ({m.type})
                      </Typography>
                    </div>
                  </motion.div>
                )
              })}
            </Stack>
          </div>
        </Paper>
      </div>
    </div>
  )
}
