import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  policyData: [],
  status: '',
  filterPolicy: [],
  isFilter: false,
  selectedPolicies: [],
};

export const fetchData = createAsyncThunk('policy/fetchPolicies', async () => {
  const response = await fetch('/data.json');
  if (!response.ok) {
    throw new Error('Failed to fetch policies');
  }
  const data = await response.json();
  return data;
});

const PolicySlice = createSlice({
  name: 'policy',
  initialState,
  reducers: {
    fetchPolicyData: (state, action) => {
      return {
        ...state,
        policyData: action.payload,
      };
    },
    filterData: (state, action) => {
      state.isFilter = true;
      state.status = 'Pending';
      state.filterPolicy = state.policyData.filter((policy) => {
        const claimType = policy.claim_type
          .toLowerCase()
          .includes(action.payload.toLowerCase());
        const coverAmount = policy.coverage_amount
          .toString()
          .includes(action.payload);

        return claimType || coverAmount;
      });

      state.status = 'Success';
    },
    clearFilter: (state) => {
      state.isFilter = false;
      state.filterPolicy = [];
      console.log('ecleartes');
    },
    addToCompare: (state, action) => {
      const policyId = action.payload;
      if (!state.selectedPolicies.includes(policyId)) {
        state.selectedPolicies.push(policyId);
      }
    },
    removeToCompare: (state, action) => {
      state.selectedPolicies = state.selectedPolicies.filter(
        (policyId) => policyId != action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = 'Pending';
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = 'Success';
        state.policyData = action.payload;
      })
      .addCase(fetchData.rejected, (state) => {
        state.status = 'Error';
      });
  },
});

export const {
  fetchPolicyData,
  filterData,
  clearFilter,
  addToCompare,
  removeToCompare,
} = PolicySlice.actions;
export default PolicySlice.reducer;
