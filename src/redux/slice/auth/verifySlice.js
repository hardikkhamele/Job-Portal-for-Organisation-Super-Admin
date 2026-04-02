import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const verifyOtp = createAsyncThunk(
  "verify/verifyOtp",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/admin/verify-otp`, { 
        email, 
        otp 
      });
      toast.success(response.data.message || "OTP Verified Successfully!");
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || "Invalid OTP or Expired";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

const verifySlice = createSlice({
  name: "verify",
  initialState: {
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetVerifyState: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetVerifyState } = verifySlice.actions;
export default verifySlice.reducer;