import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchAllCredits = createAsyncThunk(
  "credits/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/api/admin/credit-management/GetallCredit`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch credits");
    }
  }
);

export const updateCredit = createAsyncThunk(
  "credits/update",
  async ({ id, credits }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${BASE_URL}/api/admin/credit-management/updateCredit/${id}`,
        { credits: Number(credits) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Credit updated successfully!");
      return response.data.data;
    } catch (error) {
      const errMsg = error.response?.data?.message || "Failed to update credit";
      toast.error(errMsg);
      return rejectWithValue(errMsg);
    }
  }
);

const getCreditSlice = createSlice({
  name: "getCredit",
  initialState: {
    credits: [],
    loading: false,
    error: null,
    updateLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCredits.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllCredits.fulfilled, (state, action) => {
        state.loading = false;
        state.credits = action.payload;
      })
      .addCase(fetchAllCredits.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCredit.pending, (state) => {
        state.updateLoading = true;
      })
      .addCase(updateCredit.fulfilled, (state, action) => {
        state.updateLoading = false;
        const index = state.credits.findIndex((c) => c._id === action.payload._id);
        if (index !== -1) {
          state.credits[index] = action.payload;
        }
      })
      .addCase(updateCredit.rejected, (state) => {
        state.updateLoading = false;
      });
  },
});

export default getCreditSlice.reducer;