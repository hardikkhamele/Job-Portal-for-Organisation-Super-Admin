import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { addNotification } from "../../../utils/notificationHelper";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token
    ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
    : {};
};

// ✅ GET Social Links
// GET /api/admin/social/links
export const fetchSocialLinks = createAsyncThunk(
  "socialLinks/fetchSocialLinks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/admin/social/links`, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch social links"
      );
    }
  }
);

// ✅ PUT Social Links
// PUT /api/admin/social/links
// Body: { officialWebsite, facebook, instagram, whatsapp, twitter }
export const updateSocialLinks = createAsyncThunk(
  "socialLinks/updateSocialLinks",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/api/admin/social/links`,
        payload,
        { headers: getAuthHeaders() }
      );
      toast.success("Social links updated successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      addNotification(
        "Social Links Updated",
        "System help & support social links were updated successfully.",
        "success"
      );
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to update social links";
      toast.error(message, { position: "top-right", autoClose: 4000 });
      return rejectWithValue(message);
    }
  }
);

const socialLinksSlice = createSlice({
  name: "socialLinks",
  initialState: {
    data: null,        // { _id, officialWebsite, facebook, instagram, whatsapp, twitter }
    fetchLoading: false,
    updateLoading: false,
    updateSuccess: false,
    error: null,
  },
  reducers: {
    resetSocialLinksState: (state) => {
      state.updateLoading = false;
      state.updateSuccess = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ─── Fetch ───
      .addCase(fetchSocialLinks.pending, (state) => {
        state.fetchLoading = true;
        state.error = null;
      })
      .addCase(fetchSocialLinks.fulfilled, (state, action) => {
        state.fetchLoading = false;
        state.data = action.payload?.data || action.payload;
      })
      .addCase(fetchSocialLinks.rejected, (state, action) => {
        state.fetchLoading = false;
        state.error = action.payload;
      })

      // ─── Update ───
      .addCase(updateSocialLinks.pending, (state) => {
        state.updateLoading = true;
        state.updateSuccess = false;
        state.error = null;
      })
      .addCase(updateSocialLinks.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.updateSuccess = true;
        state.data = action.payload?.data || state.data;
      })
      .addCase(updateSocialLinks.rejected, (state, action) => {
        state.updateLoading = false;
        state.updateSuccess = false;
        state.error = action.payload;
      });
  },
});

export const { resetSocialLinksState } = socialLinksSlice.actions;
export default socialLinksSlice.reducer;
