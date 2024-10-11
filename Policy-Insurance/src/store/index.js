import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../reducer/userSlice';
import policySlice from '../reducer/policySlice';
export const Store = configureStore({
  reducer: {
    user: userSlice,
    policy: policySlice,
  },
});
