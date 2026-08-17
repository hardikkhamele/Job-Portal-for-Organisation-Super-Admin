import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { addNotification } from '../../../utils/notificationHelper';

// Base URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Thunk: Create Blog
export const createBlog = createAsyncThunk(
  'blog/createBlog',
  async (formData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');

      // Using the environment variable for the API endpoint
      const response = await axios.post(
        `${API_BASE_URL}/api/admin/blog/create`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      toast.success(response.data.message || 'Blog created successfully!');
      const blogTitle = formData.get ? formData.get('title') : (formData.title || 'New Blog');
      addNotification(
        "Blog Created Successfully",
        `Blog post "${blogTitle}" has been created and published.`,
        "success"
      );
      return response.data.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || 'Failed to create blog';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

const blogSlice = createSlice({
  name: 'blog',
  initialState: {
    blogs: [],
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearBlogState: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Blog
      .addCase(createBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs.push(action.payload);
        state.successMessage = 'Blog created successfully';
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearBlogState } = blogSlice.actions;
export default blogSlice.reducer;