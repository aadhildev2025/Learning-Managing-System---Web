import React, { useContext, useState } from 'react'
import TopBar from '../../components/common/TopBar'
import AuthContext from '../../contexts/AuthContext'
import { Paper, Typography, Box, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'
import { PieChart, Pie, Cell, Legend } from 'recharts'

export default function AdminDashboard() {
  const { users, updateUser, deleteUser } = useContext(AuthContext)
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ name: '', email: '', role: 'Student' })

  const openEdit = (u) => { setEditing(u); setForm({ ...u }); setOpen(true) }
  const close = () => { setOpen(false); setEditing(null) }

  const save = () => {
    updateUser(form)
    close()
  }

  // simple role distribution pie data
  const roleCounts = users.reduce((acc, u) => (acc[u.role] = (acc[u.role] || 0) + 1, acc), {})
  const pieData = Object.keys(roleCounts).map(k => ({ name: k, value: roleCounts[k] }))
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

  return (
    <div>
      <TopBar />
      <div className="p-6 space-y-6">
        <Paper className="p-4">
          <Typography variant="h6">Platform Analytics</Typography>
          <div className="mt-4 flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3">
              <PieChart width={300} height={250}>
                <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Legend />
              </PieChart>
            </div>

            <div className="flex-1">
              <Typography variant="subtitle1">Users</Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map(u => (
                    <TableRow key={u.id}>
                      <TableCell>{u.name}</TableCell>
                      <TableCell>{u.email}</TableCell>
                      <TableCell>{u.role}</TableCell>
                      <TableCell>
                        <Button size="small" onClick={() => openEdit(u)}>Edit</Button>
                        <Button size="small" color="error" onClick={() => deleteUser(u.id)}>Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </Paper>
      </div>

      <Dialog open={open} onClose={close}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent className="space-y-4">
          <TextField fullWidth label="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
          <TextField fullWidth label="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
          <TextField fullWidth label="Role" value={form.role} onChange={e => setForm({...form, role: e.target.value})} />
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>Cancel</Button>
          <Button onClick={save} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
