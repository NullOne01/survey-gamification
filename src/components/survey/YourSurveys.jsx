import { Box, Typography } from '@mui/material';
import Navigation from '../common/Navigation';

function YourSurveys() {
  return (
    <Box sx={{ flexGrow: 1, height: '100vh', bgcolor: '#1a1a1a' }}>
      <Navigation />
      <Box sx={{ p: 3 }}>
        <Typography variant="h4">Your Surveys</Typography>
        <Typography>Your surveys will appear here...</Typography>
      </Box>
    </Box>
  );
}

export default YourSurveys; 