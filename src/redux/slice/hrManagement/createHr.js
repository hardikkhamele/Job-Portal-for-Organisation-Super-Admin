import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { addNotification } from "../../../utils/notificationHelper";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const createHRAction = createAsyncThunk(
  "hr/createHR",
  async (formData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const data = new FormData();
      data.append("hrName", formData.hrName);
      data.append("designation", formData.designation);
      data.append("email", formData.email);
      data.append("password", formData.password);
      data.append("mobileNumber", formData.mobileNumber);
      // if (formData.image) {
      //   data.append("image", formData.image);
      // }

      const response = await axios.post(
        `${BASE_URL}/api/admin/hr/createhr`,
        data,
        {
          headers: { 
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}` 
          },
        }
      );

      toast.success("HR Created Successfully!");
      addNotification(
        "HR Registered Successfully",
        `HR Recruiter "${formData.hrName}" (${formData.designation}) has been registered.`,
        "success"
      );
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

const createHrSlice = createSlice({
  name: "createHr",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createHRAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(createHRAction.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createHRAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetState } = createHrSlice.actions;
export default createHrSlice.reducer;