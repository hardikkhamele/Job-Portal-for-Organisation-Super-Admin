import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchCandidateProfile = createAsyncThunk(
  "candidate/fetchProfile",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      // Transferred candidates come from the candidate-database collection.
      // Try that endpoint first, then fall back to the HR-specific one.
      const endpointsToTry = [
        // `${BASE_URL}/api/admin/candidate-database/getCandidateById/${id}`,
        `${BASE_URL}/api/admin/candidate-database/${id}`,
        `${BASE_URL}/api/admin/hr/getCandidateProfile/${id}`,
      ];

      for (const url of endpointsToTry) {
        try {
          const response = await axios.get(url, { headers });
          // Normalise: accept any shape that has actual data
          const payload = response.data?.data || response.data;
          if (payload && typeof payload === "object" && !Array.isArray(payload)) {
            // Normalise field names so CandidateProfile.jsx can render them
            const normalised = {
              ...payload,
              candidateName:
                payload.candidateName ||
                payload.fullName ||
                payload.name ||
                payload.candidateInfo?.name ||
                "N/A",
              email:
                payload.email ||
                payload.mailId ||
                payload.candidateEmail ||
                payload.candidateInfo?.email ||
                "N/A",
              phoneNumber:
                payload.phoneNumber ||
                payload.phone ||
                payload.mobileNumber ||
                payload.mobile ||
                payload.candidateInfo?.phone ||
                "N/A",
              candidateStatus:
                payload.candidateStatus ||
                payload.status ||
                "N/A",
              interactionType:
                payload.interactionType ||
                payload.interaction ||
                payload.assignedToType ||
                "N/A",
            };
            return { data: normalised };
          }
        } catch {
          // try next endpoint
        }
      }

      return rejectWithValue("Candidate not found");
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch candidate profile"
      );
    }
  }
);

const candidateProfileSlice = createSlice({
  name: "candidateProfile",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearProfile: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCandidateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCandidateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchCandidateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProfile } = candidateProfileSlice.actions;
export default candidateProfileSlice.reducer;