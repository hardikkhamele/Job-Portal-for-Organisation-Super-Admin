import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { addNotification } from "../../../utils/notificationHelper";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const deleteCandidateDatabase = createAsyncThunk(
  "candidateDatabase/delete",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `${BASE_URL}/api/admin/candidate-database/deleteCandidateDatabase/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data?.message || "Candidate database deleted successfully!");
      addNotification(
        "Candidate Record Deleted",
        `Candidate record (ID: ${id}) was deleted from the database.`,
        "success"
      );
      return id;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to delete candidate database";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

const deleteCandidateDatabaseSlice = createSlice({
  name: "deleteCandidateDatabase",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetDeleteState: (state) => {
      state.success = false;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteCandidateDatabase.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(deleteCandidateDatabase.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(deleteCandidateDatabase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { resetDeleteState } = deleteCandidateDatabaseSlice.actions;
export default deleteCandidateDatabaseSlice.reducer;
