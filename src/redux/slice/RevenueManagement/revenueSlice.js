import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Get Base URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ;

// Thunk to fetch all transactions (with optional pagination)
export const fetchAllTransactions = createAsyncThunk(
  'revenue/fetchAll',
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/admin/employer-billing-transactions`, {
        params,
        headers: {
          // Typically handles the Bearer token logic here or via an axios interceptor
          Authorization: `Bearer ${localStorage.getItem('token')}` 
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchTransactionById = createAsyncThunk(
  'revenue/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/admin/employer-billing-transactions/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  transactions: [],
  pagination: {},
  selectedTransaction: null,
  loading: false,
  error: null,
};

const revenueSlice = createSlice({
  name: 'revenue',
  initialState,
  reducers: {
    clearSelectedTransaction: (state) => {
      state.selectedTransaction = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(fetchAllTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchAllTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch transactions';
      })
      // Fetch By ID
      .addCase(fetchTransactionById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTransactionById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedTransaction = action.payload.data;
      })
      .addCase(fetchTransactionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch transaction details';
      });
  },
});

export const { clearSelectedTransaction } = revenueSlice.actions;
export default revenueSlice.reducer;