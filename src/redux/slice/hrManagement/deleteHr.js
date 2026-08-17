import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { addNotification } from "../../../utils/notificationHelper";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const deleteHr = createAsyncThunk(
  "hr/deleteHr",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`${BASE_URL}/api/admin/hr/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (response.data.success) {
        toast.success(response.data.message || "HR Deleted Successfully");
        addNotification(
          "HR Account Deleted",
          `HR Recruiter account (ID: ${id}) was deleted successfully.`,
          "success"
        );
      }
      return id;
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Delete failed";
      toast.error(errorMsg);
      return rejectWithValue(errorMsg);
    }
  }
);

const deleteHrSlice = createSlice({
  name: "deleteHr",
  initialState: {
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetDeleteState: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteHr.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteHr.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(deleteHr.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetDeleteState } = deleteHrSlice.actions;
export default deleteHrSlice.reducer;