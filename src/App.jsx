import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Common components
import PrivateRoute from './components/common/PrivateRoute';

// Auth components
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';

// Main components
import ProfileInfo from './components/profile/ProfileInfo';
import CreateSurvey from './components/survey/CreateSurvey';
import SurveyInfo from './components/survey/SurveyInfo';
import TakeSurvey from './components/survey/TakeSurvey';
import YourSurveys from './components/survey/YourSurveys';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#4a90e2',
    },
    background: {
      default: '#1a1a1a',
      paper: '#2a2a2a',
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Navigate to="/create-survey" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/create-survey" element={<CreateSurvey />} />
            <Route path="/take-survey/:surveyId" element={<TakeSurvey />} />

            {/* Protected routes - will redirect to login if not authenticated */}
            <Route element={<PrivateRoute />}>
              <Route path="/profile" element={<ProfileInfo />} />
              <Route path="/your-surveys" element={<YourSurveys />} />
              <Route path="/survey-info/:surveyId" element={<SurveyInfo />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App; 