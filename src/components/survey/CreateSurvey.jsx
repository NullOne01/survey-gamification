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
  Alert,
} from '@mui/material';
import Navigation from '../common/Navigation';

function CreateSurvey() {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const [googleFormUrl, setGoogleFormUrl] = useState('');
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const validateUrl = (url) => {
    return url.startsWith('https://docs.google.com/forms/');
  };

  const handleSubmit = async () => {
    if (!isAuthenticated) {
      setShowAuthDialog(true);
      return;
    }

    if (!googleFormUrl) {
      setError('Please enter a Google Form URL');
      return;
    }

    if (!validateUrl(googleFormUrl)) {
      setError('Please enter a valid Google Form URL');
      return;
    }

    try {
      setIsSubmitting(true);
      setError('');
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock survey ID
      const newSurveyId = 'survey-' + Date.now();
      
      // Redirect to take survey page
      navigate(`/take-survey/${newSurveyId}`);
    } catch (err) {
      setError('Failed to create survey. Please try again.');
      console.error('Failed to create survey:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      bgcolor: '#1a1a1a',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Navigation />

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
            variant="h6"
            sx={{
              color: '#4a90e2',
              mb: 2
            }}
          >
            Your google form link:
          </Typography>

          {error && (
            <Alert 
              severity="error" 
              sx={{ width: '100%', mb: 2 }}
              onClose={() => setError('')}
            >
              {error}
            </Alert>
          )}

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
            disabled={isSubmitting}
            error={!!error}
            helperText={error}
          />

          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={isSubmitting}
            sx={{
              mt: 2,
              bgcolor: '#4a4a4a',
              '&:hover': {
                bgcolor: '#5a5a5a'
              },
              minWidth: 200,
              py: 1.5
            }}
          >
            {isSubmitting ? 'Creating...' : 'Create your survey'}
          </Button>
        </Box>
      </Container>

      <Dialog
        open={showAuthDialog}
        onClose={() => setShowAuthDialog(false)}
        PaperProps={{
          sx: {
            bgcolor: 'white',
            color: 'black'
          }
        }}
      >
        <DialogTitle>Authentication Required</DialogTitle>
        <DialogContent>
          <Typography>
            You need to be registered and logged in to create a survey.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setShowAuthDialog(false)}
            sx={{ color: 'black' }}
          >
            Cancel
          </Button>
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
            sx={{ bgcolor: 'black' }}
          >
            Sign In
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default CreateSurvey;