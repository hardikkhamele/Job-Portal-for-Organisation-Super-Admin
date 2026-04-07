import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify"; 
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const updateEmployerStatus = createAsyncThunk(
  "employer/updateStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token"); 
      const response = await axios.put(
        `${BASE_URL}/api/admin/employer/updateStatus/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(`Employer status updated to ${status} successfully!`);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
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