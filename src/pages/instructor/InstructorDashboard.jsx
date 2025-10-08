import React, { useContext, useState } from 'react'
import TopBar from '../../components/common/TopBar'
import DataContext from '../../contexts/DataContext'
import AuthContext from '../../contexts/AuthContext'
import { Paper, Typography, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText } from '@mui/material'
import CourseCard from '../../components/course/CourseCard'

export default function InstructorDashboard() {
  const { courses, addCourse, updateCourse, deleteCourse } = useContext(DataContext)
  const { user } = useContext(AuthContext)
  const myCourses = courses.filter(c => c.instructorId === user?.id)
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ title: '', description: '', category: '' })

  const submit = () => {
    addCourse({ ...form, instructorId: user.id, modules: [] })
    setForm({ title: '', description: '', category: '' })
    setOpen(false)
  }

  return (
    <div>
      <TopBar />
      <div className="p-6">
        <Paper className="p-4">
          <div className="flex items-center justify-between mb-4">
            <Typography variant="h6">Instructor Dashboard</Typography>
            <Button variant="contained" onClick={() => setOpen(true)}>Create Course</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {myCourses.map(c => <CourseCard key={c.id} course={c} />)}
            {myCourses.length === 0 && <Typography>No courses yet. Create one!</Typography>}
          </div>
        </Paper>
      </div>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Create Course</DialogTitle>
        <DialogContent className="space-y-4">
          <TextField label="Title" fullWidth value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
          <TextField label="Description" fullWidth value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
          <TextField label="Category" fullWidth value={form.category} onChange={e => setForm({...form, category: e.target.value})} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={submit}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
