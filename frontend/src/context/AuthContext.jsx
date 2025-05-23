import { createContext, useState, useEffect } from 'react'
import axios from 'axios'

// Create the context
export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Check if the user is already logged in
    const checkAuth = async () => {
      const token = localStorage.getItem('token')
      
      if (token) {
        try {
          // Set the auth header for all future requests
          axios.defaults.headers.common['Authorization'] = `******          
          // Get the user data
          const response = await axios.get('/api/users/me')
          setUser(response.data)
        } catch (error) {
          console.error('Authentication error:', error)
          setError('Failed to authenticate')
          // Remove the token if invalid
          localStorage.removeItem('token')
          delete axios.defaults.headers.common['Authorization']
        }
      }
      
      setLoading(false)
    }
    
    checkAuth()
  }, [])

  const login = async (credentials) => {
    try {
      setLoading(true)
      setError(null)
      
      // This would be a real API call in production
      // For demo, just simulate a successful login
      const response = await axios.post('/api/users/token', credentials)
      const { access_token } = response.data
      
      // Save the token
      localStorage.setItem('token', access_token)
      
      // Set the auth header for all future requests
      axios.defaults.headers.common['Authorization'] = `******      
      // Get the user data
      const userResponse = await axios.get('/api/users/me')
      setUser(userResponse.data)
      
      return true
    } catch (error) {
      console.error('Login error:', error)
      setError(error.response?.data?.detail || 'Login failed')
      return false
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    // Remove the token
    localStorage.removeItem('token')
    
    // Remove the auth header
    delete axios.defaults.headers.common['Authorization']
    
    // Clear the user
    setUser(null)
  }

  const register = async (userData) => {
    try {
      setLoading(true)
      setError(null)
      
      // Call the registration API
      await axios.post('/api/users', userData)
      
      // After registration, log the user in
      return await login({
        username: userData.email,
        password: userData.password,
      })
    } catch (error) {
      console.error('Registration error:', error)
      setError(error.response?.data?.detail || 'Registration failed')
      return false
    } finally {
      setLoading(false)
    }
  }

  // The value to be provided to consumers of the context
  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    error,
    login,
    logout,
    register,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}