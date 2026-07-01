import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// 1. Fetch All Plans
export const fetchJobSeekerPlans = createAsyncThunk(
  "jobseekerPlans/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${BASE_URL}/api/admin/jobseeker-plan/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to fetch plans");
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


// 2. Create Plan
export const createJobSeekerPlan = createAsyncThunk(
  "jobseekerPlans/create",
  async (planData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${BASE_URL}/api/admin/jobseeker-plan/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(planData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to create plan");
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 3. Update Plan
export const updateJobSeekerPlan = createAsyncThunk(
  "jobseekerPlans/update",
  async ({ id, planData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${BASE_URL}/api/admin/jobseeker-plan/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(planData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to update plan");
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 4. Delete Plan
export const deleteJobSeekerPlan = createAsyncThunk(
  "jobseekerPlans/delete",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${BASE_URL}/api/admin/jobseeker-plan/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to delete plan");
      return { id };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const jobseekerPlansSlice = createSlice({
  name: "jobseekerPlans",
  initialState: {
    plans: [],
    loading: false,
    error: null,
    isCreating: false,
    isUpdating: false,
    isDeleting: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchJobSeekerPlans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobSeekerPlans.fulfilled, (state, action) => {
        state.loading = false;
        // The API returns { success: true, data: [...] } or just [...]
        state.plans = action.payload.data || action.payload || [];
      })
      .addCase(fetchJobSeekerPlans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create
      .addCase(createJobSeekerPlan.pending, (state) => {
        state.isCreating = true;
      })
      .addCase(createJobSeekerPlan.fulfilled, (state) => {
        state.isCreating = false;
      })
      .addCase(createJobSeekerPlan.rejected, (state) => {
        state.isCreating = false;
      })
      // Update
      .addCase(updateJobSeekerPlan.pending, (state) => {
        state.isUpdating = true;
      })
      .addCase(updateJobSeekerPlan.fulfilled, (state) => {
        state.isUpdating = false;
      })
      .addCase(updateJobSeekerPlan.rejected, (state) => {
        state.isUpdating = false;
      })
      // Delete
      .addCase(deleteJobSeekerPlan.pending, (state) => {
        state.isDeleting = true;
      })
      .addCase(deleteJobSeekerPlan.fulfilled, (state, action) => {
        state.isDeleting = false;
        state.plans = state.plans.filter((plan) => plan._id !== action.payload.id);
      })
      .addCase(deleteJobSeekerPlan.rejected, (state) => {
        state.isDeleting = false;
      });
  },
});

export default jobseekerPlansSlice.reducer;
