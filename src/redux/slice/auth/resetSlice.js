import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const resetPasswordApi = createAsyncThunk(
  "reset/resetPasswordApi",
  async ({ email, newPassword }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/admin/reset-password`, {
        email,
        newPassword,
      });
      toast.success(response.data.message || "Password reset successful!");
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to reset password";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

const resetSlice = createSlice({
  name: "reset",
  initialState: {
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearResetState: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetPasswordApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPasswordApi.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(resetPasswordApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearResetState } = resetSlice.actions;
export default resetSlice.reducer;