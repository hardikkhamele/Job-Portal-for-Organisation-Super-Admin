import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify"; 
import { addNotification } from "../../../utils/notificationHelper";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const updateEmployerStatus = createAsyncThunk(
  "employer/updateStatus",
  async ({ id, status, reason, email }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token"); 
      const headers = { Authorization: `Bearer ${token}` };
      let response;

      if (status === "accepted") {
        response = await axios.patch(
          `${BASE_URL}/api/admin/employer/${id}/accepted`,
          { status: "accepted", isApproved: true, email },
          { headers }
        );
      } else if (status === "rejected") {
        response = await axios.patch(
          `${BASE_URL}/api/admin/employer/${id}/reject`,
          { status: "rejected", reason, email },
          { headers }
        );
      } else if (status === "reapprove") {
        response = await axios.patch(
          `${BASE_URL}/api/admin/employer/${id}/reapprove`,
          { email },
          { headers }
        );
      } else if (status === "active" || status === "approved") {
        const endpoints = [
          { method: "patch", url: `${BASE_URL}/api/admin/employer/${id}/accepted` },
          { method: "patch", url: `${BASE_URL}/api/admin/employer/${id}/approve` },
          { method: "put", url: `${BASE_URL}/api/admin/employer/updateStatus/${id}`, data: { status } },
        ];

        let lastErr;
        for (const ep of endpoints) {
          try {
            if (ep.method === "patch") {
              response = await axios.patch(ep.url, { status: "active", isApproved: true }, { headers });
            } else {
              response = await axios.put(ep.url, ep.data, { headers });
            }
            if (response?.data) break;
          } catch (err) {
            lastErr = err;
          }
        }
        if (!response && lastErr) throw lastErr;
      } else {
        response = await axios.put(
          `${BASE_URL}/api/admin/employer/updateStatus/${id}`,
          { status },
          { headers }
        );
      }

      toast.success(`Employer status updated successfully!`);
      addNotification(
        "Employer Status Updated",
        `Employer (ID: ${id}) status has been updated to "${status}".`,
        status === "rejected" || status === "blocked" ? "warning" : "success"
      );
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to update employer status";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

const updateStatusSlice = createSlice({
  name: "updateStatus",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetUpdateStatus: (state) => {
      state.success = false;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateEmployerStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateEmployerStatus.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateEmployerStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { resetUpdateStatus } = updateStatusSlice.actions;
export default updateStatusSlice.reducer;