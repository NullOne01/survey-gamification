import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  surveys: [],
  currentSurvey: null,
  loading: false,
  error: null,
};

const surveySlice = createSlice({
  name: 'survey',
  initialState,
  reducers: {
    setSurveys: (state, action) => {
      state.surveys = action.payload;
    },
    setCurrentSurvey: (state, action) => {
      state.currentSurvey = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setSurveys, setCurrentSurvey, setLoading, setError } = surveySlice.actions;
export default surveySlice.reducer; 