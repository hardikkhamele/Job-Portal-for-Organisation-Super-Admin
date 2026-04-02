import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchEmployerById = createAsyncThunk(
  "employer/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/api/admin/employer/getEmployer/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch details");
    }
  }
);

const getEmployeeByIdSlice = createSlice({
  name: "getEmployeeById",
  initialState: {
    employer: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearEmployerDetails: (state) => {
      state.employer = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployerById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmployerById.fulfilled, (state, action) => {
        state.loading = false;
        state.employer = action.payload;
      })
      .addCase(fetchEmployerById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearEmployerDetails } = getEmployeeByIdSlice.actions;
export default getEmployeeByIdSlice.reducer;