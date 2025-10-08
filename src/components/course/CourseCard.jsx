import React, { useContext } from 'react'
import { Paper, Typography, Button, Chip, Box } from '@mui/material'
import { Link } from 'react-router-dom'
import DataContext from '../../contexts/DataContext'
import AuthContext from '../../contexts/AuthContext'
import { calcCourseProgress } from '../../utils/progress'
import { motion } from 'framer-motion'

export default function CourseCard({ course, showEnrollActions = false }) {
  const { user } = useContext(AuthContext)
  const { enrollStudent, unenrollStudent } = useContext(DataContext)
  const enrolled = user && course.enrolledStudents.includes(user.id)
  const progress = user ? calcCourseProgress(course, user.id) : 0

  return (
    <motion.div whileHover={{ scale: 1.02 }} className="w-full">
      <Paper
        elevation={3}
        sx={{
          p: 3,
          borderRadius: 3,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
          transition: '0.3s',
          '&:hover': { boxShadow: 6 },
        }}
      >
        {/* Course Info */}
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            {course.title}
          </Typography>

          <Chip
            label={course.category}
            color="primary"
            size="small"
            sx={{ mb: 1, fontWeight: 500 }}
          />

          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              mb: 3,
              minHeight: 50, // consistent card height
            }}
          >
            {course.description}
          </Typography>

          {/* Progress Bar */}
          <Box sx={{ mb: 3 }}>
            <Box
              sx={{
                width: '100%',
                height: 8,
                borderRadius: 4,
                backgroundColor: 'grey.300',
                overflow: 'hidden',
              }}
            >
              <Box
                sx={{
                  width: `${progress}%`,
                  height: '100%',
                  background: 'linear-gradient(to right, #3b82f6, #6366f1)',
                  transition: '0.5s',
                }}
              />
            </Box>
            <Typography variant="caption" sx={{ color: 'text.secondary', mt: 0.5, display: 'block' }}>
              {progress}% complete
            </Typography>
          </Box>
        </Box>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Button
            component={Link}
            to={`/course/${course.id}`}
            variant="outlined"
            size="small"
            sx={{
              flex: 1,
              textTransform: 'none',
              borderColor: 'primary.main',
              color: 'primary.main',
              '&:hover': { backgroundColor: 'primary.light' },
            }}
          >
            Open
          </Button>

          {user && showEnrollActions && (
            enrolled ? (
              <Button
                variant="contained"
                color="error"
                size="small"
                sx={{ flex: 1, textTransform: 'none' }}
                onClick={() => unenrollStudent(course.id, user.id)}
              >
                Unenroll
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                size="small"
                sx={{ flex: 1, textTransform: 'none' }}
                onClick={() => enrollStudent(course.id, user.id)}
              >
                Enroll
              </Button>
            )
          )}
        </Box>
      </Paper>
    </motion.div>
  )
}
