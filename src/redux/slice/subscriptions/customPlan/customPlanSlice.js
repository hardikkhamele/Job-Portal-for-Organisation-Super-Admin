import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Import Base URL from environment variables
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const API = axios.create({
  baseURL: BASE_URL,
});

// Helper to get token and set headers consistently
const getAuthHeaders = () => {
  const token = localStorage.getItem("token"); // Standardized token key
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// ─── ASYNC THUNKS ────────────────────────────────────────────────────────────

// ✅ Fetch custom plans (List view with pagination & filter)
export const fetchCustomPlans = createAsyncThunk(
  "customPlan/fetchCustomPlans",
  async ({ page = 1, limit = 10, status = "" } = {}, { rejectWithValue }) => {
    try {
      const params = { page, limit };

      if (status && status !== "All" && status !== "Status") {
        params.status = status.toLowerCase();
      }

      const response = await API.get("/api/admin/custom-plans", {
        headers: getAuthHeaders(),
        params,
      });

      return response.data; // Expected: { data: [], pagination: {} }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch custom plans",
      );
    }
  },
);

// ✅ Fetch a single custom plan by ID (Detail view)
export const fetchCustomPlanById = createAsyncThunk(
  "customPlan/fetchCustomPlanById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await API.get(`/api/admin/custom-plans/${id}`, {
        headers: getAuthHeaders(),
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch plan details",
      );
    }
  },
);

// ✅ Create Custom Plan Payment (POST)
export const createCustomPlanPayment = createAsyncThunk(
  "customPlan/createCustomPlanPayment",
  async (planData, { rejectWithValue }) => {
    try {
      const response = await API.post(
        "/api/admin/custom-plans/create-payment",
        planData,
        {
          headers: getAuthHeaders(),
        },
      );
      return response.data; // { success, data: { paymentLink, paymentLinkId } }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create payment link",
      );
    }
  },
);
// ✅ Update an existing custom plan by ID
export const updateCustomPlan = createAsyncThunk(
  "customPlan/updateCustomPlan",
  async ({ id, updateData }, { rejectWithValue }) => {
    try {
      const response = await API.put(
        `/api/admin/custom-plans/${id}`,
        updateData,
        {
          headers: getAuthHeaders(),
        },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update custom plan",
      );
    }
  },
);
// ✅ Fetch Custom Plan Status options (Enum)
export const fetchCustomPlanStatusDropdown = createAsyncThunk(
  "customPlan/fetchCustomPlanStatusDropdown",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get(
        "/api/admin/custom-plans/get-custom-plans-status-dropdown",
        {
          headers: getAuthHeaders(),
        },
      );
      return response.data.data; // [{ label: "Active", value: "active" }, ...]
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch status options",
      );
    }
  },
);

// ✅ Fetch Custom Plan Status options (Enums - Array of strings)
export const fetchCustomPlanEnums = createAsyncThunk(
  "customPlan/fetchCustomPlanEnums",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get(
        "/api/admin/custom-plans/get-custom-plans-enums",
        {
          headers: getAuthHeaders(),
        },
      );
      return response.data.data; // ["active", "inactive", "Expired"]
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch status enums",
      );
    }
  },
);

// ✅ Delete a custom plan by ID
export const deleteCustomPlan = createAsyncThunk(
  "customPlan/deleteCustomPlan",
  async (id, { rejectWithValue }) => {
    try {
      await API.delete(`/api/admin/custom-plans/${id}`, {
        headers: getAuthHeaders(),
      });
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete custom plan"
      );
    }
  }
);

// ─── SLICE ───────────────────────────────────────────────────────────────────

const customPlanSlice = createSlice({
  name: "customPlan",
  initialState: {
    plans: [], // For the table list
    selectedPlan: null, // For the detail view
    pagination: null,
    loading: false, // List loading
    detailLoading: false, // Detail loading
    deleteLoading: false,
    error: null,
    createLoading: false,
    statusOptions: [],
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetSelectedPlan: (state) => {
      state.selectedPlan = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ─── Fetch All Plans ───
      .addCase(fetchCustomPlans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomPlans.fulfilled, (state, action) => {
        state.loading = false;
        state.plans = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchCustomPlans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ─── Fetch Single Plan ───
      .addCase(fetchCustomPlanById.pending, (state) => {
        state.detailLoading = true;
        state.selectedPlan = null;
        state.error = null;
      })
      .addCase(fetchCustomPlanById.fulfilled, (state, action) => {
        state.detailLoading = false;
        state.selectedPlan = action.payload;
      })
      .addCase(fetchCustomPlanById.rejected, (state, action) => {
        state.detailLoading = false;
        state.error = action.payload;
      })

      // ─── Delete Plan ───
      .addCase(deleteCustomPlan.pending, (state) => {
        state.deleteLoading = true;
        state.error = null;
      })
      .addCase(deleteCustomPlan.fulfilled, (state, action) => {
        state.deleteLoading = false;
        // Optimistically remove from state
        state.plans = state.plans.filter((plan) => plan._id !== action.payload);
      })
      .addCase(deleteCustomPlan.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.payload;
      })
      .addCase(createCustomPlanPayment.pending, (state) => {
        state.createLoading = true;
        state.error = null;
      })
      .addCase(createCustomPlanPayment.fulfilled, (state) => {
        state.createLoading = false;
      })
      .addCase(createCustomPlanPayment.rejected, (state, action) => {
        state.createLoading = false;
        state.error = action.payload;
      })
      // Update Custom Plan
      .addCase(updateCustomPlan.pending, (state) => {
        state.createLoading = true;
        state.error = null;
      })
      .addCase(updateCustomPlan.fulfilled, (state) => {
        state.createLoading = false;
      })
      .addCase(updateCustomPlan.rejected, (state, action) => {
        state.createLoading = false;
        state.error = action.payload;
      })
      // Fetch Custom Plan Status Dropdown
      .addCase(fetchCustomPlanStatusDropdown.fulfilled, (state, action) => {
        state.statusOptions = action.payload;
      });
      // Fetch Custom Plan Enums
    builder.addCase(fetchCustomPlanEnums.fulfilled, (state, action) => {
      state.statusOptions = action.payload;
    });
  },
});

export const { clearError, resetSelectedPlan } = customPlanSlice.actions;
export default customPlanSlice.reducer;
