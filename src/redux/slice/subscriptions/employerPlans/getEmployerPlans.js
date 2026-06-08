import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// 1. Fetch All Plans
export const fetchEmployerPlans = createAsyncThunk(
  "employerPlans/fetchEmployerPlans",
  async ({ page, limit, planType }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const typeParam = planType && planType !== "" ? `&planType=${planType}` : "";
      const response = await axios.get(
        `${BASE_URL}/api/admin/employer-plan?page=${page + 1}&limit=${limit}${typeParam}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch plans");
    }
  }
);

// 2. Get Single Plan By ID
export const fetchEmployerPlanById = createAsyncThunk(
  "employerPlans/fetchEmployerPlanById",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/api/admin/employer-plan/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch plan details");
    }
  }
);

// ✅ 3. Update Plan Function
export const updateEmployerPlans = createAsyncThunk(
  "employerPlans/updateEmployerPlans",
  async ({ id, updateData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${BASE_URL}/api/admin/employer-plan/${id}`,
        updateData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Update failed");
    }
  }
);

// ✅ 4. Delete Plan Function
export const deleteEmployerPlan = createAsyncThunk(
  "employerPlans/deleteEmployerPlan",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `${BASE_URL}/api/admin/employer-plan/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Delete failed");
    }
  }
);

export const createEmployerPlan = createAsyncThunk(
  "employerPlans/createPlan",
  async (planData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${BASE_URL}/api/admin/employer-plan`,
        planData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to create plan");
    }
  }
);

const employerPlansSlice = createSlice({
  name: "employerPlans",
  initialState: { 
    plans: [], 
    singlePlan: null, 
    loading: false, 
    isUpdating: false,
    total: 0, 
    totalPages: 1 
  },
  reducers: {
    clearSinglePlan: (state) => {
      state.singlePlan = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployerPlans.pending, (state) => { state.loading = true; })
      .addCase(fetchEmployerPlans.fulfilled, (state, action) => {
        state.loading = false;
        state.plans = action.payload.data;
        state.total = action.payload.pagination?.total || 0;
        state.totalPages = action.payload.pagination?.totalPages || 1;
      })
      .addCase(fetchEmployerPlans.rejected, (state) => { state.loading = false; })
      
      .addCase(fetchEmployerPlanById.pending, (state) => { state.loading = true; })
      .addCase(fetchEmployerPlanById.fulfilled, (state, action) => {
        state.loading = false;
        state.singlePlan = action.payload;
      })
      .addCase(fetchEmployerPlanById.rejected, (state) => { state.loading = false; })

      // Update Handling
      .addCase(updateEmployerPlans.pending, (state) => { state.isUpdating = true; })
      .addCase(updateEmployerPlans.fulfilled, (state) => { state.isUpdating = false; toast.success("Plan updated successfully!" || state.message); })
      .addCase(updateEmployerPlans.rejected, (state) => { state.isUpdating = false; })

      // Create Handling
      .addCase(createEmployerPlan.pending, (state) => { state.loading = true; })
      .addCase(createEmployerPlan.fulfilled, (state) => { 
        state.loading = false;
        toast.success("Plan created successfully"||state.message) 
      })
      .addCase(createEmployerPlan.rejected, (state) => { state.loading = false; })

      // ✅ Delete Handling
      .addCase(deleteEmployerPlan.fulfilled, (state, action) => {
        state.plans = state.plans.filter((plan) => plan._id !== action.payload);
        state.total -= 1;
        toast.success("Plan deleted successfully!");
      })
      .addCase(deleteEmployerPlan.rejected, (state, action) => {
        toast.error(action.payload?.message || "Failed to delete plan");
      })
  },
});

export const { clearSinglePlan } = employerPlansSlice.actions;
export default employerPlansSlice.reducer;