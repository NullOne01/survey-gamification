import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import profileReducer from './slices/profileSlice';
import surveyReducer from './slices/surveySlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    survey: surveyReducer,
  },
}); 