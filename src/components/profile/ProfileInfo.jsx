import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, Typography, Button } from '@mui/material';
import Navigation from '../common/Navigation';

function ProfileInfo() {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/profile' } });
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null; // or a loading spinner
  }

  return (
    <Box sx={{ flexGrow: 1, height: '100vh', bgcolor: '#1a1a1a' }}>
      <Navigation />
      <Box sx={{ p: 3 }}>
        <Typography variant="h4">Profile Information</Typography>
        {/* Profile content */}
      </Box>
    </Box>
  );
}

export default ProfileInfo; 