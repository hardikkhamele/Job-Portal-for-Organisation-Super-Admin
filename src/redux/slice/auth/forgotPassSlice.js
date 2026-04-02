import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const sendOtp = createAsyncThunk(
  "forgotPass/sendOtp",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/admin/send-otp`, { email });
      
      // Response logic: Toast show karna 10 second ke liye
      if (response.data.otp) {
        toast.success(`OTP: ${response.data.otp} - ${response.data.message}`, {
          autoClose: 10000, // 10 Seconds
        });
      }
      
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

const forgotPassSlice = createSlice({
  name: "forgotPass",
  initialState: {
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetForgotState: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendOtp.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetForgotState } = forgotPassSlice.actions;
export default forgotPassSlice.reducer;