import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// const BASE_URL = "https://new-job-portal-be-2f6y.onrender.com/api/admin";
const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/admin`;

// Helper to get auth header
const getAuthHeader = (getState) => {
  const token = getState().auth?.token || localStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
};

// GET credits
export const fetchCredits = createAsyncThunk(
  "creditManagement/fetchCredits",
  async (_, { getState, rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/credit-management`, {
        headers: getAuthHeader(getState),
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch credits"
      );
    }
  }
);

// PUT update credits
export const updateCredits = createAsyncThunk(
  "creditManagement/updateCredits",
  async (creditData, { getState, rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/credit-management`,
        creditData,
        {
          headers: {
            ...getAuthHeader(getState),
            "Content-Type": "application/json",
          },
        }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update credits"
      );
    }
  }
);

const initialState = {
  credits: null,
  loading: false,
  updateLoading: false,
  error: null,
  updateError: null,
  updateSuccess: false,
};

const creditManagementSlice = createSlice({
  name: "creditManagement",
  initialState,
  reducers: {
    clearUpdateStatus: (state) => {
      state.updateSuccess = false;
      state.updateError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchCredits.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCredits.fulfilled, (state, action) => {
        state.loading = false;
        state.credits = action.payload;
      })
      .addCase(fetchCredits.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update
      .addCase(updateCredits.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
        state.updateSuccess = false;
      })
      .addCase(updateCredits.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.credits = action.payload;
        state.updateSuccess = true;
      })
      .addCase(updateCredits.rejected, (state, action) => {
        state.updateLoading = false;
        state.updateError = action.payload;
      });
  },
});

export const { clearUpdateStatus } = creditManagementSlice.actions;
export default creditManagementSlice.reducer;