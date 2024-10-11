import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  token: '',
  isLoggedIn: false,
  currentUser: null,
  loginError: false,
  purchasedPolicy: [],
  claimRequest: [],
  formState: '',
};
//thunk function for submiting the purchase form
export const purchasePolicy = createAsyncThunk(
  'user/purchasePolicy',
  async (formData, { rejectWithValue }) => {
    try {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(formData);
        }, 1000);
      });
    } catch (error) {
      return rejectWithValue('Failed to purchase policy');
    }
  }
);
//thunk function for claim file
export const fileClaim = createAsyncThunk(
  'user/fileClaim',
  async (claimData, { rejectWithValue }) => {
    try {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(claimData);
        }, 1000);
      });
    } catch (error) {
      return rejectWithValue('Failed to claim filing');
    }
  }
);

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signUp: (state, action) => {
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    },
    login: (state, action) => {
        const data = action.payload
        state.currentUser = data.user;
        state.isLoggedIn = true;
        state.loginError = false;
        state.token = data.token
     
    },
    logout: (state) => {
      state.currentUser = null;
      state.isLoggedIn = false;
    },
    resetErrorState: (state) => {
      state.loginError = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(purchasePolicy.pending, (state, action) => {
        state.formState = 'Loading';
      })
      .addCase(purchasePolicy.fulfilled, (state, action) => {
        state.formState = 'Success';
        state.purchasedPolicy.push(action.payload);
      })
      .addCase(purchasePolicy.rejected, (state, action) => {
        state.formState = 'Error';
      })
      .addCase(fileClaim.pending, (state, action) => {
        state.formState = 'Loading';
      })
      .addCase(fileClaim.fulfilled, (state, action) => {
        state.formState = 'Success';
        state.claimRequest.push(action.payload);
      })
      .addCase(fileClaim.rejected, (state, action) => {
        state.formState = 'Error';
      });
  },
});

export const { signUp, login, logout, resetErrorState } = UserSlice.actions;

export default UserSlice.reducer;
