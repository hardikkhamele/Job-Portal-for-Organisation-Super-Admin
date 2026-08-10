import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchCategories = createAsyncThunk(
  "dropdown/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/api/admin/jobSeeker/getAllCategory`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data?.data || response.data?.categories || (Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchDesignations = createAsyncThunk(
  "dropdown/fetchDesignations",
  async (categoryId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const isValidObjectId = (id) => typeof id === "string" && /^[0-9a-fA-F]{24}$/.test(id);
      const params = {};
      if (categoryId && isValidObjectId(String(categoryId))) {
        params.categoryId = String(categoryId);
      }
      const response = await axios.get(
        `${BASE_URL}/api/admin/candidate-database/getallDesignation`,
        { 
          params, 
          headers: { Authorization: `Bearer ${token}` } 
        }
      );
      return response.data?.data || response.data?.designations || (Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const dropdownSlice = createSlice({
  name: "dropdown",
  initialState: {
    categories: [],
    designations: [],
    loading: false,
  },
  reducers: {
    clearDesignations: (state) => {
      state.designations = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchDesignations.fulfilled, (state, action) => {
        state.designations = Array.isArray(action.payload) ? action.payload : [];
      });
  },
});

export const { clearDesignations } = dropdownSlice.actions;
export default dropdownSlice.reducer;