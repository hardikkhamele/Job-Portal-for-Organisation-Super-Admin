import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const fetchDurationDropdown = createAsyncThunk(
  "duration/fetchDropdown",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/api/admin/employer-plan/duration-dropdown`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch durations");
    }
  }
);

const durationSlice = createSlice({
  name: "durationDropdown",
  initialState: { options: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDurationDropdown.pending, (state) => { state.loading = true; })
      .addCase(fetchDurationDropdown.fulfilled, (state, action) => {
        state.loading = false;
        state.options = action.payload;
      })
      .addCase(fetchDurationDropdown.rejected, (state) => { state.loading = false; });
  },
});

export default durationSlice.reducer;