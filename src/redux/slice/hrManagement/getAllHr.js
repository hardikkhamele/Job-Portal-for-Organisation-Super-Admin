import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const fetchAllHr = createAsyncThunk(
  "hr/fetchAllHr",
  async ({ page, limit, search }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/api/admin/hr/gethr?page=${page}&limit=${limit}&search=${search}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch HRs");
    }
  }
);

const getAllHrSlice = createSlice({
  name: "getAllHr",
  initialState: {
    hrList: [],
    total: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllHr.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllHr.fulfilled, (state, action) => {
        state.loading = false;
        state.hrList = action.payload.data || [];
        state.total = action.payload.total || 0;
      })
      .addCase(fetchAllHr.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default getAllHrSlice.reducer;