import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const fetchCategories = createAsyncThunk(
  "dropdown/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/api/admin/candidate-database/getallCategory`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchDesignations = createAsyncThunk(
  "dropdown/fetchDesignations",
  async (categoryId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/api/admin/candidate-database/getallDesignation`,
        { 
          params: { categoryId: categoryId }, 
          headers: { Authorization: `Bearer ${token}` } 
        }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
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
        state.categories = action.payload;
      })
      .addCase(fetchDesignations.fulfilled, (state, action) => {
        state.designations = action.payload;
      });
  },
});

export const { clearDesignations } = dropdownSlice.actions;
export default dropdownSlice.reducer;