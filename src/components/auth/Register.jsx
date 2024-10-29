import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  IconButton,
  InputAdornment,
} from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Navigation from '../common/Navigation';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .required('Username is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        // Mock API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        navigate('/login', { 
          state: { message: 'Registration successful! Please check your email to verify your account.' } 
        });
      } catch (error) {
        console.error('Registration failed:', error);
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
          
          <Typography variant="h4" sx={{ color: 'black', mb: 1 }}>
            Sign up to
          </Typography>
          
          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>
            Lorem Ipsum is simply
          </Typography>

          <form onSubmit={formik.handleSubmit}>
            <Typography sx={{ color: 'black', mb: 1 }}>
              Email
            </Typography>
            <TextField
              fullWidth
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              sx={{ mb: 3 }}
              InputProps={{
                sx: { bgcolor: 'white', color: 'black' }
              }}
            />

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
              sx={{ mb: 3 }}
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

            <Typography sx={{ color: 'black', mb: 1 }}>
              Confirm Password
            </Typography>
            <TextField
              fullWidth
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm your Password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
              helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
              sx={{ mb: 3 }}
              InputProps={{
                sx: { bgcolor: 'white', color: 'black' },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

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
              Register
            </Button>

            <Box sx={{ textAlign: 'center' }}>
              <Typography sx={{ color: 'black', display: 'inline' }}>
                Already have an Account ?{' '}
              </Typography>
              <Link
                to="/login"
                style={{
                  textDecoration: 'none',
                  color: 'black',
                  fontWeight: 'bold'
                }}
              >
                Sign in
              </Link>
            </Box>
          </form>
        </Paper>
      </Box>
    </Box>
  );
}

export default Register; 