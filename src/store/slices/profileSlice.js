import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  avatarSettings: {},
  achievements: [],
  statistics: {},
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updateProfile: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateProfile } = profileSlice.actions;
export default profileSlice.reducer; 