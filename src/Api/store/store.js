import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slice'; // Since you were working in Api/slice.jsx, we will use it for the main slice

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // Add other redcuers here 
    // jobs: jobReducer
  },
});
