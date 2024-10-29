import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  Paper,
  IconButton,
  InputAdornment,
} from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { loginStart, loginSuccess, loginFailure } from '../../store/slices/authSlice';
import Navigation from '../common/Navigation';

const validationSchema = Yup.object({
  username: Yup.string()
    .required('Username is required'),
  password: Yup.string()
    .required('Password is required'),
});

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      rememberMe: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        dispatch(loginStart());
        // Mock API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        dispatch(loginSuccess({ username: values.username }));
        navigate('/profile');
      } catch (error) {
        dispatch(loginFailure('Invalid username or password'));
      }
    },
  });

  return (
    <Box sx={{ 
      minHeight: '100vh',
      bgcolor: '#1a1a1a',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Navigation />
      
      <Box sx={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2
      }}>
        <Paper sx={{
          width: '100%',
          maxWidth: 480,
          p: 4,
          borderRadius: 2,
          bgcolor: 'white'
        }}>
          <Typography variant="h5" sx={{ color: 'black', mb: 1 }}>
            Welcome !
          </Typography>
          
          <Typography variant="h4" sx={{ color: 'black', mb: 4 }}>
            Sign in to
          </Typography>
          
          <Typography variant="subtitle1" sx={{ color: 'black', mb: 3 }}>
            QuizQuest
          </Typography>

          <form onSubmit={formik.handleSubmit}>
            <Typography sx={{ color: 'black', mb: 1 }}>
              User name
            </Typography>
            <TextField
              fullWidth
              id="username"
              name="username"
              placeholder="Enter your user name"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
              sx={{ mb: 3 }}
              InputProps={{
                sx: { bgcolor: 'white', color: 'black' }
              }}
            />

            <Typography sx={{ color: 'black', mb: 1 }}>
              Password
            </Typography>
            <TextField
              fullWidth
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              sx={{ mb: 2 }}
              InputProps={{
                sx: { bgcolor: 'white', color: 'black' },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              mb: 3
            }}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="rememberMe"
                    checked={formik.values.rememberMe}
                    onChange={formik.handleChange}
                    sx={{ color: 'black' }}
                  />
                }
                label={
                  <Typography sx={{ color: 'black' }}>
                    Remember me
                  </Typography>
                }
              />
              <Link 
                to="/forgot-password"
                style={{ 
                  textDecoration: 'none',
                  color: 'black'
                }}
              >
                Forgot Password ?
              </Link>
            </Box>

            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{
                bgcolor: 'black',
                color: 'white',
                py: 1.5,
                '&:hover': {
                  bgcolor: '#333',
                },
                mb: 3
              }}
            >
              Login
            </Button>

            <Box sx={{ textAlign: 'center' }}>
              <Typography sx={{ color: 'black', display: 'inline' }}>
                Don'y have an Account ?{' '}
              </Typography>
              <Link
                to="/register"
                style={{
                  textDecoration: 'none',
                  color: 'black',
                  fontWeight: 'bold'
                }}
              >
                Register
              </Link>
            </Box>
          </form>
        </Paper>
      </Box>
    </Box>
  );
}

export default Login; 