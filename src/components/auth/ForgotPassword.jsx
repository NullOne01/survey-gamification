import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Paper,
} from '@mui/material';
import { Link } from 'react-router-dom';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
});

function ForgotPassword() {
  const [status, setStatus] = useState(null);

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        // Mock API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setStatus({
          type: 'success',
          message: 'Password reset link has been sent to your email',
        });
      } catch (error) {
        setStatus({
          type: 'error',
          message: 'Failed to send reset link. Please try again.',
        });
      }
    },
  });

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4, p: 2 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Forgot Password
        </Typography>

        {status && (
          <Alert severity={status.type} sx={{ mb: 2 }}>
            {status.message}
          </Alert>
        )}

        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            margin="normal"
          />
          <Button
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
            sx={{ mt: 2 }}
          >
            Send Reset Link
          </Button>
        </form>

        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <Typography color="primary">
              Back to Login
            </Typography>
          </Link>
        </Box>
      </Paper>
    </Box>
  );
}

export default ForgotPassword; 