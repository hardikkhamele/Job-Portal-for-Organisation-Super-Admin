import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const fetchJobById = createAsyncThunk(
  "job/fetchJobById",
  async (id, { rejectWithValue }) => {
    try {
      // 1. Get the token from localStorage (replace 'token' with your actual key)
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${BASE_URL}/api/admin/employer/getJobById/${id}`,
        {
          headers: {
            // 2. Add the Authorization header
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      return response.data.data;
    } catch (error) {
      // Return the error message from the backend if available
      return rejectWithValue(
        error.response && error.response.data 
          ? error.response.data 
          : "An unexpected error occurred"
      );
    }
  }
);

const jobByIdSlice = createSlice({
  name: "jobById",
  initialState: {
    job: null,
    loading: false,
    error: null,
  },
  reducers: {
    // Optional: Clear job state when leaving the page
    clearJobDetail: (state) => {
      state.job = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobById.fulfilled, (state, action) => {
        state.loading = false;
        state.job = action.payload;
      })
      .addCase(fetchJobById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearJobDetail } = jobByIdSlice.actions;
export default jobByIdSlice.reducer;