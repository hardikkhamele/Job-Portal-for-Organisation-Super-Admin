import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { addNotification } from "../../../utils/notificationHelper";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const approveCandidate = createAsyncThunk(
  "candidate/approve",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const cleanBase = (BASE_URL || "").replace(/\/$/, "");
      const response = await axios.put(
        `${cleanBase}/api/admin/accept-reject/approveCandidateDatabase/${id}`,
        {}, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data?.message || "Candidate Approved Successfully!", {
        position: "top-right",
        autoClose: 10000,
      });

      addNotification(
        "Candidate Approved",
        `Candidate (ID: ${id}) has been approved in the database.`,
        "success"
      );

      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Something went wrong";
      
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 10000,
      });

      return rejectWithValue(errorMessage);
    }
  }
);

const acceptCandidateSlice = createSlice({
  name: "acceptCandidate",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetAcceptState: (state) => {
      state.success = false;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(approveCandidate.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(approveCandidate.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(approveCandidate.rejected, (state) => {
        state.loading = false;
        state.error = state.payload;
        state.success = false;
      });
  },
});

export const { resetAcceptState } = acceptCandidateSlice.actions;
export default acceptCandidateSlice.reducer;