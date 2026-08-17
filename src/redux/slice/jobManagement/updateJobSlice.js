import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const updateJob = createAsyncThunk(
  "job/updateJob",
  async ({ jobId, jobData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const authHeader = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      // Jobs are updated by the job service. The admin routes remain as
      // fallbacks for older API deployments.
      const updateEndpoints = [
        `/api/job/updatejob/${jobId}`,
        `/api/admin/jobs/updateJob/${jobId}`,
        `/api/admin/employer/updateJob/${jobId}`,
      ];

      let response;
      let lastError;
      for (const endpoint of updateEndpoints) {
        try {
          response = await axios.put(`${BASE_URL}${endpoint}`, jobData, authHeader);
          break;
        } catch (error) {
          lastError = error;
          if (error.response?.status !== 404) throw error;
        }
      }

      if (!response) throw lastError;

      toast.success("Job updated successfully!", {
        position: "top-right",
        autoClose: 3000,
      });

      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to update job";
      toast.error(message, { position: "top-right", autoClose: 4000 });
      return rejectWithValue(message);
    }
  }
);

const updateJobSlice = createSlice({
  name: "updateJob",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetUpdateJobState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateJob.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(updateJob.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateJob.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const { resetUpdateJobState } = updateJobSlice.actions;
export default updateJobSlice.reducer;
