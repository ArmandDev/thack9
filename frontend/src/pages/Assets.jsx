import { Typography, Box } from '@mui/material'

export default function Assets() {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Internal Asset Booking
      </Typography>
      <Typography variant="body1">
        This page will contain functionality for booking and managing internal assets like meeting rooms, projectors, etc.
      </Typography>
    </Box>
  )
}