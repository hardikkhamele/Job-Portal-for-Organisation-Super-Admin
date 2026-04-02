import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {toast} from "react-toastify";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const getHrForEdit = createAsyncThunk("hr/getHrForEdit", async (id, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token"); 
    const response = await axios.get(`${BASE_URL}/api/admin/hr/gethr/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || "Something went wrong");
  }
});

export const updateHrDetails = createAsyncThunk("hr/updateHrDetails", async ({ id, formData }, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(`${BASE_URL}/api/admin/hr/updatehr/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data", 
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || "Update failed");
  }
});

const updateHrSlice = createSlice({
  name: "updateHr",
  initialState: {
    hrData: null,
    loading: false,
    updateLoading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetUpdateState: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get HR
      .addCase(getHrForEdit.pending, (state) => { 
        state.loading = true; 
        state.error = null;
      })
      .addCase(getHrForEdit.fulfilled, (state, action) => {
        state.loading = false;
        state.hrData = action.payload.data.hr;
      })
      .addCase(getHrForEdit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateHrDetails.pending, (state) => { 
        state.updateLoading = true; 
        state.error = null;
      })
      .addCase(updateHrDetails.fulfilled, (state) => {
        state.updateLoading = false;
        state.success = true;
        toast.success("HR Update Successfully!",{
          autoClose:1500
        })
      })
      .addCase(updateHrDetails.rejected, (state, action) => {
        state.updateLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetUpdateState } = updateHrSlice.actions;
export default updateHrSlice.reducer;