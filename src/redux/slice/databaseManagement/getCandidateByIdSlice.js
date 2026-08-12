import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const fetchCandidateById = createAsyncThunk(
  "candidate/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      // const token = localStorage.getItem("token");
      // const response = await axios.get(`${BASE_URL}/api/admin/candidate-database/${id}`, {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });
      // return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch candidate");
    }
  }
);

const getCandidateByIdSlice = createSlice({
  name: "candidateById",
  initialState: {
    candidate: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearCandidateDetails: (state) => {
      state.candidate = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCandidateById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCandidateById.fulfilled, (state, action) => {
        state.loading = false;
        state.candidate = action.payload;
      })
      .addCase(fetchCandidateById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCandidateDetails } = getCandidateByIdSlice.actions;
export default getCandidateByIdSlice.reducer;