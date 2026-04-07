import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const fetchJobById = createAsyncThunk(
  "job/fetchJobById",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${BASE_URL}/api/admin/employer/getJobById/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      return response.data.data;
    } catch (error) {
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