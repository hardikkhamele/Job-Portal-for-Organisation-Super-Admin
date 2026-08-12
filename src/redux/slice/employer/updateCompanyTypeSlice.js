import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const updateCompanyType = createAsyncThunk(
  "employer/updateCompanyType",
  async ({ id, companyType }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `${BASE_URL}/api/admin/employer/${id}/company-type`,
        { companyType, typeOfCompany: companyType },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(
        `Company type updated to "${companyType}" successfully!`,
        { position: "top-right", autoClose: 3000 }
      );
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to update company type";
      toast.error(message, { position: "top-right", autoClose: 4000 });
      return rejectWithValue(message);
    }
  }
);

const updateCompanyTypeSlice = createSlice({
  name: "updateCompanyType",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetCompanyTypeState: (state) => {
      state.success = false;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateCompanyType.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(updateCompanyType.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateCompanyType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { resetCompanyTypeState } = updateCompanyTypeSlice.actions;
export default updateCompanyTypeSlice.reducer;
