import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token
    ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
    : {};
};

// ✅ Create a new FAQ
// POST /api/admin/faqs/create
// Body: { question, answer, userType }
export const createFAQ = createAsyncThunk(
  "faqs/createFAQ",
  async ({ question, answer, userType }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/admin/faqs/create`,
        { question, answer, userType },
        { headers: getAuthHeaders() }
      );
      toast.success("FAQ created successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to create FAQ";
      toast.error(message, { position: "top-right", autoClose: 4000 });
      return rejectWithValue(message);
    }
  }
);

const faqSlice = createSlice({
  name: "faqs",
  initialState: {
    loading: false,
    success: false,
    error: null,
    createdFaq: null,
  },
  reducers: {
    resetFaqState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.createdFaq = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createFAQ.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(createFAQ.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.createdFaq = action.payload?.data || action.payload;
      })
      .addCase(createFAQ.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const { resetFaqState } = faqSlice.actions;
export default faqSlice.reducer;
