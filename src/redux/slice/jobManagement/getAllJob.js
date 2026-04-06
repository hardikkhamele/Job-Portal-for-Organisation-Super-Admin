// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// const BASE_URL = import.meta.env.VITE_API_BASE_URL;
// export const fetchAllJobs = createAsyncThunk(
//   "jobs/fetchAll",
//   async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get(
//         `${BASE_URL}/api/admin/jobs/getAllJobs?page=${page}&limit=${limit}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || "Failed to fetch jobs");
//     }
//   }
// );

// const getAllJobSlice = createSlice({
//   name: "getAllJob",
//   initialState: {
//     jobs: [],
//     pagination: {
//       totalJobs: 0,
//       totalPages: 0,
//       currentPage: 1,
//       limit: 10,
//     },
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchAllJobs.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchAllJobs.fulfilled, (state, action) => {
//         state.loading = false;
//         state.jobs = action.payload.data;
//         // Sync pagination state with API response
//         state.pagination.totalJobs = action.payload.totalJobs;
//         state.pagination.totalPages = action.payload.totalPages;
//         state.pagination.currentPage = action.payload.page;
//         state.pagination.limit = action.payload.limit;
//       })
//       .addCase(fetchAllJobs.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default getAllJobSlice.reducer;






import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchAllJobs = createAsyncThunk(
  "jobs/fetchAll",
  async ({ page = 1, limit = 10, search = "", category = "All" }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      // Search aur Category ko query params mein add kiya
      let url = `${BASE_URL}/api/admin/jobs/getAllJobs?page=${page}&limit=${limit}&search=${search}`;
      
      if (category !== "All") {
        url += `&category=${category}`;
      }

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch jobs");
    }
  }
);

const getAllJobSlice = createSlice({
  name: "getAllJob",
  initialState: {
    jobs: [],
    pagination: {
      totalJobs: 0,
      totalPages: 0,
      currentPage: 1,
      limit: 10,
    },
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload.data;
        state.pagination.totalJobs = action.payload.totalJobs;
        state.pagination.totalPages = action.payload.totalPages;
        state.pagination.currentPage = action.payload.page;
        state.pagination.limit = action.payload.limit;
      })
      .addCase(fetchAllJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default getAllJobSlice.reducer;