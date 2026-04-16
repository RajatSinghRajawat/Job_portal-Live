import { configureStore } from '@reduxjs/toolkit';

// A basic setup for the Redux store
export const store = configureStore({
  reducer: {
    // Reducers will be added here (e.g. auth, jobs)
  },
});
