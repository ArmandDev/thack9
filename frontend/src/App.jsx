import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Box } from '@mui/material'
import { useAuth } from './hooks/useAuth'

// Layouts
import Layout from './components/Layout'

// Pages
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Expenses from './pages/Expenses'
import SickLeave from './pages/SickLeave'
import Education from './pages/Education'
import Assets from './pages/Assets'
import Maintenance from './pages/Maintenance'
import Travel from './pages/Travel'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? children : <Navigate to="/login" />
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="expenses" element={<Expenses />} />
        <Route path="sick-leave" element={<SickLeave />} />
        <Route path="education" element={<Education />} />
        <Route path="assets" element={<Assets />} />
        <Route path="maintenance" element={<Maintenance />} />
        <Route path="travel" element={<Travel />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App