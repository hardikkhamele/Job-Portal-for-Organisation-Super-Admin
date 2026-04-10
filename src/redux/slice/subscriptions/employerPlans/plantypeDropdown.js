import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const fetchPlanTypeDropdown = createAsyncThunk(
  "planType/fetchDropdown",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/api/admin/employer-plan/plan-types-dropdown`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch dropdown");
    }
  }
);

const planTypeSlice = createSlice({
  name: "planTypeDropdown",
  initialState: { options: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlanTypeDropdown.pending, (state) => { state.loading = true; })
      .addCase(fetchPlanTypeDropdown.fulfilled, (state, action) => {
        state.loading = false;
        state.options = action.payload;
      })
      .addCase(fetchPlanTypeDropdown.rejected, (state) => { state.loading = false; });
  },
});

export default planTypeSlice.reducer;