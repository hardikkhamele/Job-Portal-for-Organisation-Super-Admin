import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const API = axios.create({
  baseURL: BASE_URL,
});

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// ✅ Fetch Employers List
export const fetchEmployerDropdown = createAsyncThunk(
  "employerDropdown/fetchEmployerDropdown",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/api/admin/employer/get-employer-dropdown", {
        headers: getAuthHeaders(),
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch employers");
    }
  }
);

// ✅ Fetch Plan Types
export const fetchPlanTypesDropdown = createAsyncThunk(
  "employerDropdown/fetchPlanTypesDropdown",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/api/admin/employer-plan/plan-types-dropdown", {
        headers: getAuthHeaders(),
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch plan types");
    }
  }
);

// ✅ Fetch Employer Specific Plans
export const fetchEmployerPlansDropdown = createAsyncThunk(
  "employerDropdown/fetchEmployerPlansDropdown",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/api/admin/employer-plan/employer-plan-dropdown", {
        headers: getAuthHeaders(),
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch employer plans");
    }
  }
);

// ✅ Fetch Durations Dropdown
export const fetchDurationDropdown = createAsyncThunk(
  "employerDropdown/fetchDurationDropdown",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/api/admin/employer-plan/duration-dropdown", {
        headers: getAuthHeaders(),
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch durations");
    }
  }
);

const employerDropdownSlice = createSlice({
  name: "employerDropdown",
  initialState: {
    employers: [],
    planTypes: [],
    employerPlans: [],
    durations: [], // Added this
    loading: false,
    error: null,
  },
  reducers: {
    clearDropdownErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🟢 .addCase calls first
      .addCase(fetchEmployerDropdown.fulfilled, (state, action) => {
        state.loading = false;
        state.employers = action.payload;
      })
      .addCase(fetchPlanTypesDropdown.fulfilled, (state, action) => {
        state.loading = false;
        state.planTypes = action.payload;
      })
      .addCase(fetchEmployerPlansDropdown.fulfilled, (state, action) => {
        state.loading = false;
        state.employerPlans = action.payload;
      })
      .addCase(fetchDurationDropdown.fulfilled, (state, action) => {
        state.loading = false;
        state.durations = action.payload; // Added this
      })

      // 🟡 .addMatcher calls after
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { clearDropdownErrors } = employerDropdownSlice.actions;
export default employerDropdownSlice.reducer;