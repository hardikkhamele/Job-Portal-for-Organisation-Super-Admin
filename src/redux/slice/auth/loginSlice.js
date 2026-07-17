import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const adminLogin = createAsyncThunk(
  "auth/adminLogin",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/auth/admin/verify-phone-otp`,
        { phone: credentials.mobile, otp: credentials.otp }
      );
      
      console.log("adminLogin API raw response:", response.data);
      
      if (response.data.success === false) {
        throw new Error(response.data.message || "Login failed");
      }
      
      const token = response.data.token || (response.data.data && response.data.data.token);
      console.log("Extracted Token:", token);
      if (token) {
        localStorage.setItem("token", token);
      }
      return response.data;
    } catch (error) {
      console.error("adminLogin API error:", error);
      return rejectWithValue(
        error.response?.data?.message || error.message || "Something went wrong"
      );
    }
  }
);

export const adminSendOtp = createAsyncThunk(
  "auth/adminSendOtp",
  async (mobileData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/auth/admin/login`,
        { phone: mobileData.mobile }
      );
      
      console.log("adminSendOtp API raw response:", response.data);
      
      // If backend sends HTTP 200 but success is false, throw it as an error
      if (response.data.success === false) {
        throw new Error(response.data.message || "Failed to send OTP");
      }
      
      return response.data;
    } catch (error) {
      console.error("adminSendOtp API error:", error);
      return rejectWithValue(
        error.response?.data?.message || error.message || "Something went wrong"
      );
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState: {
    admin: null,
    loading: false,
    error: null,
    success: false,
    otpSent: false,
    otpFromServer: null, // OTP returned by the backend (for dev/display)
  },
  reducers: {
    logout: (state) => {
      state.admin = null;
      state.success = false;
      state.otpSent = false;
      localStorage.removeItem("token");
      toast.success("Logout Successfully!",{
        autoClose:1000
      })
    },
    clearError: (state) => {
      state.error = null;
    },
    resetOtpState: (state) => {
      state.otpSent = false;
      state.error = null;
      state.success = false;
      state.otpFromServer = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // adminLogin
      .addCase(adminLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.admin = action.payload;
        toast.success("Login Successfully!",{
          autoClose:1500
        })
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // adminSendOtp
      .addCase(adminSendOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminSendOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.otpSent = true;
        // Store OTP if backend returns it (common in dev/test environments)
        state.otpFromServer =
          action.payload.otp ??
          action.payload.data?.otp ??
          null;
        toast.success(action.payload.message || "OTP Sent Successfully!", {
          autoClose: 1500
        })
      })
      .addCase(adminSendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError, resetOtpState } = loginSlice.actions;
export default loginSlice.reducer;