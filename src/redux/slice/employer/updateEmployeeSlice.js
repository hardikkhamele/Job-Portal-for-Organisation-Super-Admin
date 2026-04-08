import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const updateEmployer = createAsyncThunk(
  "employer/updateEmployer",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${BASE_URL}/api/admin/employer/updateEmployer/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Update failed");
    }
  }
);

const updateEmployeeSlice = createSlice({
  name: "updateEmployee",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetUpdateState: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateEmployer.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateEmployer.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        toast.success("Employer updated successfully!");
      })
      .addCase(updateEmployer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload || "Something went wrong");
      });
  },
});

export const { resetUpdateState } = updateEmployeeSlice.actions;
export default updateEmployeeSlice.reducer;