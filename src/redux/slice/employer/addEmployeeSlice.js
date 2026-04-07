import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify'; 
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const createEmployer = createAsyncThunk(
  'employer/create',
  async (formData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${BASE_URL}/api/admin/employer/createEmployer`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success('Employer added successfully!');
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Something went wrong';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

const addEmployeeSlice = createSlice({
  name: 'addEmployee',
  initialState: { loading: false, success: false, error: null },
  reducers: {
    resetState: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createEmployer.pending, (state) => {
        state.loading = true;
      })
      .addCase(createEmployer.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createEmployer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetState } = addEmployeeSlice.actions;
export default addEmployeeSlice.reducer;