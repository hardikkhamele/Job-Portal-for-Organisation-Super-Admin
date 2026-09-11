import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { addNotification } from "../../../utils/notificationHelper";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Approve candidate database
export const approveCandidate = createAsyncThunk(
  "candidate/approve",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const cleanBase = (BASE_URL || "http://localhost:3000").replace(/\/$/, "");

      const response = await axios.put(
        `${cleanBase}/api/admin/candidate-database/approveCandidateDatabase/${id}`,
        {}, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data?.message || "Candidate Approved Successfully!", {
        position: "top-right",
        autoClose: 5000,
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
        autoClose: 5000,
      });

      return rejectWithValue(errorMessage);
    }
  }
);

// Accept individual candidate inside excel database
// Endpoint: PUT /api/admin/accept-reject/:databaseId/candidate/:candidateId/accept
export const acceptIndividualCandidate = createAsyncThunk(
  "candidate/acceptIndividual",
  async ({ databaseId, candidateId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const cleanBase = (BASE_URL || "http://localhost:3000").replace(/\/$/, "");
      const url = `${cleanBase}/api/admin/accept-reject/${databaseId}/candidate/${candidateId}/accept`;

      const response = await axios.put(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const message = response.data?.message || "Candidate accepted successfully!";
      toast.success(message, {
        position: "top-right",
        autoClose: 5000,
      });

      addNotification(
        "Candidate Accepted",
        `Candidate accepted successfully.`,
        "success"
      );

      return {
        databaseId,
        candidateId,
        data: response.data?.data || response.data,
        message,
      };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Failed to accept candidate";

      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
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
    individualLoading: false,
    individualSuccess: false,
    individualError: null,
  },
  reducers: {
    resetAcceptState: (state) => {
      state.success = false;
      state.error = null;
      state.loading = false;
      state.individualLoading = false;
      state.individualSuccess = false;
      state.individualError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Database level approve
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
      })
      // Individual candidate accept
      .addCase(acceptIndividualCandidate.pending, (state) => {
        state.individualLoading = true;
        state.individualSuccess = false;
        state.individualError = null;
      })
      .addCase(acceptIndividualCandidate.fulfilled, (state) => {
        state.individualLoading = false;
        state.individualSuccess = true;
      })
      .addCase(acceptIndividualCandidate.rejected, (state, action) => {
        state.individualLoading = false;
        state.individualError = action.payload;
      });
  },
});

export const { resetAcceptState } = acceptCandidateSlice.actions;
export default acceptCandidateSlice.reducer;