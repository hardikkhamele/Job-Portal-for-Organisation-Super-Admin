import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const toggleHrStatus = createAsyncThunk(
  "hrStatus/toggle",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      
      if (!token) return rejectWithValue({ message: "No token found in storage" });

      const response = await axios.patch(
        `${BASE_URL}/api/admin/hr/toggle/${id}`,
        {},
        {   
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return { id, data: response.data };
    } catch (err) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);
const updateStatusSlice = createSlice({
  name: "updateStatus",
  initialState: {
    loadingId: null,
    success: false,
    error: null,
  },
  reducers: {
    resetStatusState: (state) => {
      state.success = false;
      state.error = null;
      state.loadingId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(toggleHrStatus.pending, (state, action) => {
        state.loadingId = action.meta.arg;
      })
      .addCase(toggleHrStatus.fulfilled, (state, action) => {
        state.loadingId = null;
        state.success = true;
        
        const status = action.payload.data.data?.isActive;
        if (status === false) {
          toast.warn("HR Account has been Inactivated");
        } else {
          toast.success("HR Account is now Active");
        }
      })
      .addCase(toggleHrStatus.rejected, (state, action) => {
        state.loadingId = null;
        state.error = action.payload;
        toast.error(action.payload?.message || "Failed to update status");
      });
  },
});

export const { resetStatusState } = updateStatusSlice.actions;
export default updateStatusSlice.reducer;