import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { logout } from '../../store/slices/authSlice';

function Navigation() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return (
    <AppBar position="static" sx={{ bgcolor: '#2a2a2a' }}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            flexGrow: 1,
            color: '#4a90e2',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
          onClick={() => navigate('/')}
        >
          QuizQuest
        </Typography>
        
        <Button 
          color="inherit" 
          onClick={() => navigate('/create-survey')}
        >
          Create a survey
        </Button>
        <Button 
          color="inherit"
          onClick={() => navigate('/profile')}
        >
          Profile
        </Button>
        
        {isAuthenticated ? (
          <>
            <Button 
              color="inherit"
              onClick={() => navigate('/your-surveys')}
            >
              Your surveys
            </Button>
            <Button 
              variant="contained"
              sx={{ 
                bgcolor: '#4a4a4a',
                '&:hover': {
                  bgcolor: '#5a5a5a'
                }
              }}
              onClick={() => {
                dispatch(logout());
                navigate('/login');
              }}
            >
              Sign out
            </Button>
          </>
        ) : (
          <>
            <Button 
              variant="contained"
              sx={{ 
                bgcolor: '#4a4a4a',
                '&:hover': {
                  bgcolor: '#5a5a5a'
                },
                mr: 1
              }}
              onClick={() => navigate('/login')}
            >
              Sign in
            </Button>
            <Button 
              variant="contained"
              sx={{ 
                bgcolor: '#4a90e2',
                '&:hover': {
                  bgcolor: '#357abd'
                }
              }}
              onClick={() => navigate('/register')}
            >
              Register
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navigation;