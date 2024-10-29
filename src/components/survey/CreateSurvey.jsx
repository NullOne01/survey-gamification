import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import Navigation from '../common/Navigation';

function CreateSurvey() {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const [googleFormUrl, setGoogleFormUrl] = useState('');
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  const handleSubmit = async () => {
    if (!isAuthenticated) {
      setShowAuthDialog(true);
      return;
    }

    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/survey-info/new-survey');
    } catch (error) {
      console.error('Failed to create survey:', error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, height: '100vh', bgcolor: '#1a1a1a' }}>
      <Navigation />

      {/* Main Content */}
      <Container maxWidth="md">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 15,
            gap: 2
          }}
        >
          <Typography
            color="primary"
            sx={{
              color: '#4a90e2',
              mb: 2
            }}
          >
            Your google form link:
          </Typography>
          <TextField
            fullWidth
            value={googleFormUrl}
            onChange={(e) => setGoogleFormUrl(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#4a4a4a',
                },
                '&:hover fieldset': {
                  borderColor: '#6a6a6a',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#4a90e2',
                },
              },
              '& .MuiInputBase-input': {
                color: 'white',
              },
              bgcolor: '#2a2a2a',
              borderRadius: 1,
            }}
            placeholder="https://docs.google.com/forms/d/e/..."
          />
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              mt: 2,
              bgcolor: '#4a4a4a',
              '&:hover': {
                bgcolor: '#5a5a5a'
              },
            }}
          >
            Create your survey
          </Button>
        </Box>
      </Container>

      {/* Authentication Dialog */}
      <Dialog
        open={showAuthDialog}
        onClose={() => setShowAuthDialog(false)}
      >
        <DialogTitle>Authentication Required</DialogTitle>
        <DialogContent>
          <Typography>
            You need to be registered and logged in to create a survey.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAuthDialog(false)}>Cancel</Button>
          <Button 
            onClick={() => navigate('/register')} 
            variant="contained" 
            color="primary"
          >
            Register
          </Button>
          <Button 
            onClick={() => navigate('/login')}
            variant="contained"
          >
            Sign In
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default CreateSurvey; 