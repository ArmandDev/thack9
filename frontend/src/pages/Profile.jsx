import { Typography, Box } from '@mui/material'

export default function Profile() {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        User Profile
      </Typography>
      <Typography variant="body1">
        This page will contain functionality for viewing and editing your user profile.
      </Typography>
    </Box>
  )
}