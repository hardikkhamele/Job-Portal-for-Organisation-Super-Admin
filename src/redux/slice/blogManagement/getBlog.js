import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// Environment variable se base URL access kar rahe hain
const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/admin/blog`;

const getHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

// 1. Fetch All Blogs (with Pagination)
export const fetchBlogs = createAsyncThunk(
  "blogs/fetchAll",
  async (page = 1, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/all?page=${page}&limit=10`,
        { headers: getHeaders() }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// 2. Fetch Single Blog (for View/Edit)
export const fetchBlogById = createAsyncThunk(
  "blogs/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/all/${id}`, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// 3. Update Blog (Multipart/Form-Data)
export const updateBlog = createAsyncThunk(
  "blogs/update",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${BASE_URL}/update/${id}`, formData, {
        headers: { ...getHeaders(), "Content-Type": "multipart/form-data" },
      });
      toast.success("Blog updated successfully!");
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
      return rejectWithValue(error.response?.data);
    }
  }
);

// 4. Delete Blog
export const deleteBlog = createAsyncThunk(
  "blogs/delete",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      await axios.delete(`${BASE_URL}/delete/${id}`, { headers: getHeaders() });
      toast.success("Blog deleted successfully!");
      dispatch(fetchBlogs());
      return id;
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
      return rejectWithValue(error.response?.data);
    }
  }
);

const blogSlice = createSlice({
  name: "getblog",
  initialState: {
    blogs: [],
    singleBlog: null,
    loading: false,
    pagination: { current: 1, total: 0, pages: 1 },
  },
  reducers: {
    setSingleBlogFromState: (state, action) => {
      state.singleBlog = state.blogs.find((b) => b._id === action.payload);
    },
    clearSingleBlog: (state) => {
      state.singleBlog = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      // Fetch Single
      .addCase(fetchBlogById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBlogById.fulfilled, (state, action) => {
        state.loading = false;
        state.singleBlog = action.payload.data;
      })
      // Update
      .addCase(updateBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateBlog.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateBlog.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setSingleBlogFromState, clearSingleBlog } = blogSlice.actions;
export const getreducer = blogSlice.reducer;