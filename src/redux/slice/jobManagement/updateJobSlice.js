import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const updateJob = createAsyncThunk(
  "job/updateJob",
  async ({ jobId, jobData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const requestConfig = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        // An update-route permission error must be shown in the editor. It is
        // not evidence that the admin's login session has expired.
        skipAuthLogout: true,
      };

      // The employer-admin route matches the job detail route used by this
      // panel. `/api/job/...` is reserved for the employer-panel token.
      const updateEndpoints = [
        `/api/admin/jobs/updateJob/${jobId}`,
        `/api/job/updatejob/${jobId}`,
      ];

      let response;
      let lastError;
      for (const endpoint of updateEndpoints) {
        try {
          response = await axios.put(`${BASE_URL}${endpoint}`, jobData, requestConfig);
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
