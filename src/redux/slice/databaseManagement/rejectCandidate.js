import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const rejectCandidate = createAsyncThunk(
  "candidate/reject",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `${BASE_URL}/api/admin/candidate-database/rejectCandidateDatabase/${id}`,
        {}, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data?.message || "Candidate Rejected!", {
        position: "top-right",
        autoClose: 2500,
      });

      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Rejection failed";
      
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
      });

      return rejectWithValue(errorMessage);
    }
  }
);

const rejectCandidateSlice = createSlice({
  name: "rejectCandidate",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetRejectState: (state) => {
      state.success = false;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(rejectCandidate.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(rejectCandidate.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(rejectCandidate.rejected, (state) => {
        state.loading = false;
        state.error = state.payload;
      });
  },
});

export const { resetRejectState } = rejectCandidateSlice.actions;
export default rejectCandidateSlice.reducer;