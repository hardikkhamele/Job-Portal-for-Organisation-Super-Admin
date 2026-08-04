import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchTransferredCandidates = createAsyncThunk(
  "employer/fetchTransferredCandidates",
  async (employerId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/api/admin/employer/${employerId}/transferred-candidates`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch transferred candidates"
      );
    }
  }
);

const getTransferredCandidatesSlice = createSlice({
  name: "transferredCandidates",
  initialState: {
    candidates: [],
    loading: false,
    error: null,
    rawResponse: null,
  },
  reducers: {
    clearTransferredCandidates: (state) => {
      state.candidates = [];
      state.loading = false;
      state.error = null;
      state.rawResponse = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransferredCandidates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransferredCandidates.fulfilled, (state, action) => {
        state.loading = false;
        state.rawResponse = action.payload;

        const payload = action.payload;
        let list = [];

        if (Array.isArray(payload)) {
          list = payload;
        } else if (Array.isArray(payload?.data)) {
          list = payload.data;
        } else if (Array.isArray(payload?.candidates)) {
          list = payload.candidates;
        } else if (Array.isArray(payload?.transferredCandidates)) {
          list = payload.transferredCandidates;
        } else if (Array.isArray(payload?.data?.candidates)) {
          list = payload.data.candidates;
        } else if (Array.isArray(payload?.data?.transferredCandidates)) {
          list = payload.data.transferredCandidates;
        }

        state.candidates = list;
      })
      .addCase(fetchTransferredCandidates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearTransferredCandidates } = getTransferredCandidatesSlice.actions;
export default getTransferredCandidatesSlice.reducer;
