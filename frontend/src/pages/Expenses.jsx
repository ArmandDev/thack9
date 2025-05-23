import { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'

// Sample data for expenses
const sampleExpenses = [
  {
    id: 1,
    amount: 250.50,
    category: 'Travel',
    description: 'Taxi to airport',
    status: 'approved',
    createdAt: '2023-07-01',
  },
  {
    id: 2,
    amount: 75.25,
    category: 'Meals',
    description: 'Lunch with client',
    status: 'pending',
    createdAt: '2023-07-05',
  },
  {
    id: 3,
    amount: 899.99,
    category: 'Equipment',
    description: 'New laptop bag',
    status: 'rejected',
    createdAt: '2023-07-10',
  },
  {
    id: 4,
    amount: 25.00,
    category: 'Office Supplies',
    description: 'Notebooks and pens',
    status: 'pending',
    createdAt: '2023-07-12',
  },
]

export default function Expenses() {
  const [expenses, setExpenses] = useState([])
  const [loading, setLoading] = useState(true)
  const [openDialog, setOpenDialog] = useState(false)
  const [newExpense, setNewExpense] = useState({
    amount: '',
    category: '',
    description: '',
  })

  useEffect(() => {
    // This would typically fetch data from the API
    const timer = setTimeout(() => {
      setExpenses(sampleExpenses)
      setLoading(false)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])

  const handleOpenDialog = () => {
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewExpense({
      ...newExpense,
      [name]: value,
    })
  }

  const handleAddExpense = () => {
    // This would typically call the API to create the expense
    const expense = {
      id: expenses.length + 1,
      ...newExpense,
      status: 'pending',
      createdAt: new Date().toISOString().slice(0, 10),
    }
    
    setExpenses([...expenses, expense])
    setNewExpense({
      amount: '',
      category: '',
      description: '',
    })
    handleCloseDialog()
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'approved':
        return 'success'
      case 'pending':
        return 'warning'
      case 'rejected':
        return 'error'
      default:
        return 'default'
    }
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Expense Reports
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
        >
          New Expense
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="expenses table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses.map((expense) => (
              <TableRow
                key={expense.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {expense.id}
                </TableCell>
                <TableCell align="right">${expense.amount.toFixed(2)}</TableCell>
                <TableCell>{expense.category}</TableCell>
                <TableCell>{expense.description}</TableCell>
                <TableCell>
                  <Chip 
                    label={expense.status} 
                    color={getStatusColor(expense.status)} 
                    size="small" 
                  />
                </TableCell>
                <TableCell>{expense.createdAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Expense Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add New Expense</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill out the details of your expense.
          </DialogContentText>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoFocus
                margin="dense"
                name="amount"
                label="Amount"
                type="number"
                fullWidth
                variant="outlined"
                value={newExpense.amount}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="dense">
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  name="category"
                  value={newExpense.category}
                  label="Category"
                  onChange={handleInputChange}
                >
                  <MenuItem value="Travel">Travel</MenuItem>
                  <MenuItem value="Meals">Meals</MenuItem>
                  <MenuItem value="Equipment">Equipment</MenuItem>
                  <MenuItem value="Office Supplies">Office Supplies</MenuItem>
                  <MenuItem value="Software">Software</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                name="description"
                label="Description"
                type="text"
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                value={newExpense.description}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleAddExpense} variant="contained">Add</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}