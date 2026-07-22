import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const deleteEmployer = createAsyncThunk(
  "employer/delete",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `${BASE_URL}/api/admin/employer/deleteEmployer/${id}`,
        { 
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message || "Employer deleted successfully!");
      return id;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to delete employer";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

const deleteEmployeeSlice = createSlice({
  name: "deleteEmployee",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetDeleteState: (state) => {
      state.success = false;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteEmployer.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteEmployer.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(deleteEmployer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { resetDeleteState } = deleteEmployeeSlice.actions;
export default deleteEmployeeSlice.reducer;