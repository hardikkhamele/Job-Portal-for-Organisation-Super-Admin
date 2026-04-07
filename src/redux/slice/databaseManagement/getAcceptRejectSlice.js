import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const fetchAcceptRejectData = createAsyncThunk(
  "acceptReject/fetchData",
  async (page = 1, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/api/admin/candidate-database/getCandidateDatabases?page=${page}&pageSize=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Something went wrong");
    }
  }
);

const getAcceptRejectSlice = createSlice({
  name: "acceptReject",
  initialState: {
    list: [],
    pagination: {
      current: 1,
      total: 0,
      pages: 1,
    },
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAcceptRejectData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAcceptRejectData.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data;
        state.pagination = {
          current: action.payload.pagination.current,
          total: action.payload.pagination.total,
          pages: action.payload.pagination.pages,
        };
      })
      .addCase(fetchAcceptRejectData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default getAcceptRejectSlice.reducer;