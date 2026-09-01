import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const fetchEmployers = createAsyncThunk(
  "employer/fetchEmployers",
  async ({ page, limit, search, fetchAll = false }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const requestPage = (pageNumber) => axios.get(`${BASE_URL}/api/admin/employer/getEmployers`, {
        params: { page: pageNumber, limit, search },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const response = await requestPage(page);
      const result = response.data;

      // The endpoint may cap the requested limit. Gather every server page so
      // the management cards and client-side search use the complete list.
      const totalPages = Number(result?.pagination?.pages) || 1;
      if (!fetchAll || search || page !== 1 || totalPages <= 1) {
        return result;
      }

      const remainingPages = await Promise.all(
        Array.from({ length: totalPages - 1 }, (_, index) => requestPage(index + 2)),
      );
      const employers = [
        ...(Array.isArray(result.data) ? result.data : []),
        ...remainingPages.flatMap((pageResponse) =>
          Array.isArray(pageResponse.data?.data) ? pageResponse.data.data : [],
        ),
      ];

      return {
        ...result,
        data: employers,
        pagination: { ...result.pagination, pages: 1 },
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Something went wrong");
    }
  }
);

const getAllEmployerSlice = createSlice({
  name: "getAllEmployer",
  initialState: {
    employers: [],
    total: 0,
    pages: 1,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmployers.fulfilled, (state, action) => {
        state.loading = false;
        state.employers = action.payload.data;
        state.total = action.payload?.pagination?.total || 0;
        state.pages = action.payload?.pagination?.pages;
      })
      .addCase(fetchEmployers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default getAllEmployerSlice.reducer;
