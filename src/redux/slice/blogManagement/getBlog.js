import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { addNotification } from "../../../utils/notificationHelper";

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
      const blogTitle = formData.get ? formData.get('title') : (formData.title || 'Blog');
      addNotification(
        "Blog Updated Successfully",
        `Blog post "${blogTitle}" has been updated successfully.`,
        "success"
      );
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
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/delete/${id}`, { headers: getHeaders() });
      toast.success("Blog deleted successfully!");
      addNotification(
        "Blog Deleted Successfully",
        `Blog post (ID: ${id}) has been deleted successfully.`,
        "success"
      );
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
    error: null,
    // Matches API response: { currentPage, pageSize, totalRecords, totalPages, hasNextPage, hasPrevPage }
    pagination: {
      currentPage: 1,
      pageSize: 10,
      totalRecords: 0,
      totalPages: 1,
      hasNextPage: false,
      hasPrevPage: false,
    },
  },
  reducers: {
    setSingleBlogFromState: (state, action) => {
      state.singleBlog = state.blogs.find((b) => b._id === action.payload) || null;
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
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload.data;
        // API returns pagination nested object — store it directly
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Single
      .addCase(fetchBlogById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBlogById.fulfilled, (state, action) => {
        state.loading = false;
        state.singleBlog = action.payload.data;
      })
      .addCase(fetchBlogById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
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
      })

      // Delete — optimistically remove from local list
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.blogs = state.blogs.filter((b) => b._id !== action.payload);
        if (state.pagination.totalRecords > 0) {
          state.pagination.totalRecords -= 1;
        }
      });
  },
});

export const { setSingleBlogFromState, clearSingleBlog } = blogSlice.actions;
export const getreducer = blogSlice.reducer;
export default blogSlice.reducer;