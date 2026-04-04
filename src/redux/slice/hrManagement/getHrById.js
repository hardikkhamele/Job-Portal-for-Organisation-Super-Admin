import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const fetchHrById = createAsyncThunk(
  "hr/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/api/admin/hr/gethr/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error fetching HR");
    }
  }
);

const getHrByIdSlice = createSlice({
  name: "getHrById",
  initialState: {
    hrDetails: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearHrDetails: (state) => {
      state.hrDetails = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHrById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHrById.fulfilled, (state, action) => {
        state.loading = false;
        state.hrDetails = action.payload.data; 
      })
      .addCase(fetchHrById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { clearHrDetails } = getHrByIdSlice.actions;
export default getHrByIdSlice.reducer;