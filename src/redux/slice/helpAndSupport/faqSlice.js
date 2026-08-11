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

// ✅ Fetch FAQs — supports search, filter & pagination
// GET /api/admin/faqs/all
export const fetchFAQs = createAsyncThunk(
  "faqs/fetchFAQs",
  async ({ search = "", userType = "", page = 1, limit = 5 } = {}, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams();
      if (search.trim()) params.append("search", search.trim());
      if (userType)      params.append("userType", userType);
      params.append("page",  page);
      params.append("limit", limit);

      const response = await axios.get(
        `${BASE_URL}/api/admin/faqs/all?${params.toString()}`,
        { headers: getAuthHeaders() }
      );
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to fetch FAQs";
      return rejectWithValue(message);
    }
  }
);

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
      toast.success("FAQ created successfully!", { position: "top-right", autoClose: 3000 });
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to create FAQ";
      toast.error(message, { position: "top-right", autoClose: 4000 });
      return rejectWithValue(message);
    }
  }
);

// ✅ Update an FAQ by MongoDB _id
// PUT /api/admin/faqs/update/:id
// Body: { question, answer, userType }
export const updateFAQ = createAsyncThunk(
  "faqs/updateFAQ",
  async ({ id, question, answer, userType }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/api/admin/faqs/update/${id}`,
        { question, answer, userType },
        { headers: getAuthHeaders() }
      );
      toast.success("FAQ updated successfully!", { position: "top-right", autoClose: 3000 });
      return response.data?.data || response.data;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to update FAQ";
      toast.error(message, { position: "top-right", autoClose: 4000 });
      return rejectWithValue(message);
    }
  }
);

// ✅ Delete an FAQ by MongoDB _id
// DELETE /api/admin/faqs/delete/:id
export const deleteFAQ = createAsyncThunk(
  "faqs/deleteFAQ",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${BASE_URL}/api/admin/faqs/delete/${id}`,
        { headers: getAuthHeaders() }
      );
      toast.success("FAQ deleted successfully!", { position: "top-right", autoClose: 3000 });
      return id;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to delete FAQ";
      toast.error(message, { position: "top-right", autoClose: 4000 });
      return rejectWithValue(message);
    }
  }
);

const faqSlice = createSlice({
  name: "faqs",
  initialState: {
    // --- Fetch ---
    faqs: [],
    fetchLoading: false,
    fetchError: null,
    faqsPagination: { currentPage: 1, totalPages: 1, totalRecords: 0 },
    // --- Create ---
    loading: false,
    success: false,
    error: null,
    createdFaq: null,
    // --- Update ---
    updateLoading: false,
    updateSuccess: false,
    // --- Delete ---
    deleteLoading: false,
    deleteSuccess: false,
  },
  reducers: {
    resetFaqState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.createdFaq = null;
      state.updateLoading = false;
      state.updateSuccess = false;
      state.deleteLoading = false;
      state.deleteSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // --- Fetch FAQs ---
      .addCase(fetchFAQs.pending, (state) => {
        state.fetchLoading = true;
        state.fetchError = null;
      })
      .addCase(fetchFAQs.fulfilled, (state, action) => {
        state.fetchLoading = false;
        
        const payload = action.payload;
        const dataList =
          payload?.data ||
          payload?.faqs ||
          (Array.isArray(payload) ? payload : []);

        state.faqs = Array.isArray(dataList) ? dataList : [];

        // Extract total records & pages from potential backend structures
        const total =
          payload?.totalRecords ??
          payload?.total ??
          payload?.totalFaqs ??
          payload?.pagination?.totalRecords ??
          payload?.pagination?.total ??
          state.faqs.length;

        const pages =
          payload?.totalPages ??
          payload?.pagination?.totalPages ??
          Math.ceil(total / 5) ??
          1;

        const page =
          payload?.currentPage ??
          payload?.page ??
          payload?.pagination?.currentPage ??
          1;

        state.faqsPagination = {
          currentPage: Number(page) || 1,
          totalPages: Number(pages) > 0 ? Number(pages) : 1,
          totalRecords: Number(total) || 0,
        };
      })
      .addCase(fetchFAQs.rejected, (state, action) => {
        state.fetchLoading = false;
        state.fetchError = action.payload;
        state.faqs = [];
        state.faqsPagination = { currentPage: 1, totalPages: 1, totalRecords: 0 };
      })

      // --- Create FAQ ---
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
      })

      // --- Update FAQ ---
      .addCase(updateFAQ.pending, (state) => {
        state.updateLoading = true;
        state.updateSuccess = false;
      })
      .addCase(updateFAQ.fulfilled, (state) => {
        state.updateLoading = false;
        state.updateSuccess = true;
      })
      .addCase(updateFAQ.rejected, (state, action) => {
        state.updateLoading = false;
        state.updateSuccess = false;
        state.error = action.payload;
      })

      // --- Delete FAQ ---
      .addCase(deleteFAQ.pending, (state) => {
        state.deleteLoading = true;
        state.deleteSuccess = false;
      })
      .addCase(deleteFAQ.fulfilled, (state) => {
        state.deleteLoading = false;
        state.deleteSuccess = true;
      })
      .addCase(deleteFAQ.rejected, (state, action) => {
        state.deleteLoading = false;
        state.deleteSuccess = false;
        state.error = action.payload;
      });
  },
});

export const { resetFaqState } = faqSlice.actions;
export default faqSlice.reducer;
