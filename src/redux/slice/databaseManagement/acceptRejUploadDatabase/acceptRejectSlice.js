import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const getAuthHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

// API Calls
export const fetchAllCategories = createAsyncThunk(
  "dropdown/fetchAllCategories",
  async () => {
    const response = await axios.get(`${BASE_URL}/api/admin/jobSeeker/getAllCategory`, getAuthHeader());
    return response.data.data;
  }
);

export const fetchSubCategoriesByCategory = createAsyncThunk(
  "dropdown/fetchSubCategoriesByCategory",
  async (categoryId) => {
    const response = await axios.get(`${BASE_URL}/api/admin/jobSeeker/getSubCategoryByCategoryId/${categoryId}`, getAuthHeader());
    return { categoryId, data: response.data.data };
  }
);

export const fetchDesignationsBySubCategory = createAsyncThunk(
  "dropdown/fetchDesignationsBySubCategory",
  async (subCategoryId) => {
    const response = await axios.get(`${BASE_URL}/api/admin/jobSeeker/getDesignationBySubCategoryId/${subCategoryId}`, getAuthHeader());
    return { subCategoryId, data: response.data.data };
  }
);

export const uploadCandidateDatabase = createAsyncThunk(
  "dropdown/uploadCandidateDatabase",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/admin/candidate-database/uploadCandidateDatabase`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Something went wrong");
    }
  }
);

const allDropdownSlice = createSlice({
  name: "allDropdown",
  initialState: {
    categories: [],
    subCategories: {}, // { categoryId: [subCategories] }
    designations: {},  // { subCategoryId: [designations] }
    loading: false,
    uploadLoading: false,
    uploadSuccess: false,
    uploadError: null,
  },
  reducers: {
    resetUploadState: (state) => {
      state.uploadSuccess = false;
      state.uploadError = null;
    },
    clearSubCategories: (state, action) => {
      delete state.subCategories[action.payload];
    },
    clearDesignations: (state, action) => {
      delete state.designations[action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Categories
      .addCase(fetchAllCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchAllCategories.rejected, (state) => {
        state.loading = false;
      })
      
      // Fetch SubCategories
      .addCase(fetchSubCategoriesByCategory.fulfilled, (state, action) => {
        state.subCategories[action.payload.categoryId] = action.payload.data;
      })
      
      // Fetch Designations
      .addCase(fetchDesignationsBySubCategory.fulfilled, (state, action) => {
        state.designations[action.payload.subCategoryId] = action.payload.data;
      })
      
      // Upload Candidate Database
      .addCase(uploadCandidateDatabase.pending, (state) => {
        state.uploadLoading = true;
        state.uploadSuccess = false;
        state.uploadError = null;
      })
      .addCase(uploadCandidateDatabase.fulfilled, (state) => {
        state.uploadLoading = false;
        state.uploadSuccess = true;
        toast.success("Upload Database successfully!",{
          autoClose:1500
        })
      })
      .addCase(uploadCandidateDatabase.rejected, (state, action) => {
        state.uploadLoading = false;
        state.uploadError = action.payload;
        toast.error(action.payload || "Failed to upload database", {
          autoClose: 3000
        });
      });
  },
});

export const { resetUploadState, clearSubCategories, clearDesignations } = allDropdownSlice.actions;
export default allDropdownSlice.reducer;