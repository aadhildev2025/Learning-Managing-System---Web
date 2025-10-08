import { useContext, useMemo, useState } from 'react'
import TopBar from '../../components/common/TopBar'
import DataContext from '../../contexts/DataContext'
import AuthContext from '../../contexts/AuthContext'
import { Paper, Typography, Grid, TextField, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import CourseCard from '../../components/course/CourseCard'



export default function StudentDashboard() {
  const { courses } = useContext(DataContext)
  const { user } = useContext(AuthContext)
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    if (!query) return courses
    return courses.filter(
      c =>
        c.title.toLowerCase().includes(query.toLowerCase()) ||
        c.category.toLowerCase().includes(query.toLowerCase())
    )
  }, [courses, query])

  return (
    <div className="min-h-screen bg-gray-100">
      <TopBar />

      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <Typography variant="h4" className="font-bold mb-4 text-gray-800">
          Welcome, {user?.name || 'Student'} 👋
        </Typography>
        <Typography variant="body1" className="mb-6 text-gray-600">
          Browse and enroll in courses to enhance your skills
        </Typography>

        {/* Search Bar */}
        <Paper className="p-3 mb-6" elevation={3}>
          <TextField
            label="Search courses"
            variant="outlined"
            fullWidth
            value={query}
            onChange={e => setQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Paper>

        {/* Courses Grid */}
        <Grid container spacing={4}>
          {filtered.length ? (
            filtered.map(course => (
              <Grid item xs={12} sm={6} md={4} key={course.id}>
                <CourseCard course={course} showEnrollActions />
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography variant="h6" align="center" className="text-gray-500">
                No courses found
              </Typography>
            </Grid>
          )}
        </Grid>
      </div>
    </div>
  )
}
