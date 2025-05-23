import { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Grid,
  Paper,
  CircularProgress,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material'
import { useAuth } from '../hooks/useAuth'

export default function Dashboard() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // This would typically fetch data from the API
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Welcome back, {user?.first_name || 'User'}!
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {/* Expense Summary */}
        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardHeader title="Expense Summary" />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                You have 3 pending expenses totaling $1,250.00
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemText primary="Approved" secondary="$2,500.00" />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText primary="Pending" secondary="$1,250.00" />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText primary="Rejected" secondary="$500.00" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Leave Balance */}
        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardHeader title="Leave Balance" />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Your current sick leave balance
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemText primary="Annual Leave" secondary="15 days remaining" />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText primary="Sick Leave" secondary="10 days remaining" />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText primary="Used This Year" secondary="5 days" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Upcoming Activities */}
        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardHeader title="Upcoming Activities" />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Your registered activities
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemText 
                    primary="Team Building Workshop" 
                    secondary="July 15, 2023 • 2:00 PM" 
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText 
                    primary="Python Training" 
                    secondary="July 22, 2023 • 10:00 AM" 
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText 
                    primary="Company Picnic" 
                    secondary="August 5, 2023 • 11:00 AM" 
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Asset Bookings */}
        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardHeader title="My Asset Bookings" />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Your upcoming asset bookings
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemText 
                    primary="Meeting Room A" 
                    secondary="Today • 3:00 PM - 4:00 PM" 
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText 
                    primary="Projector" 
                    secondary="Tomorrow • 9:00 AM - 11:00 AM" 
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText 
                    primary="Conference Room" 
                    secondary="July 20, 2023 • 1:00 PM - 3:00 PM" 
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Maintenance Issues */}
        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardHeader title="Maintenance Issues" />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Reported maintenance issues
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemText 
                    primary="Broken Light in Meeting Room" 
                    secondary="Status: In Progress" 
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText 
                    primary="AC Not Working in Office 203" 
                    secondary="Status: Reported" 
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText 
                    primary="Water Leak in Kitchen" 
                    secondary="Status: Resolved" 
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Travel Requests */}
        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardHeader title="Travel Requests" />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Your travel requests
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemText 
                    primary="New York Client Meeting" 
                    secondary="Status: Approved • Aug 10-15, 2023" 
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText 
                    primary="San Francisco Conference" 
                    secondary="Status: Pending • Sep 5-10, 2023" 
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText 
                    primary="London Office Visit" 
                    secondary="Status: Draft • Oct 12-20, 2023" 
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}