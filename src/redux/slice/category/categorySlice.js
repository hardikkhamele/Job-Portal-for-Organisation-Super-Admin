import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
};

// ─── CATEGORY ───────────────────────────────────────────────
export const createCategory = createAsyncThunk(
  "category/createCategory",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/admin/jobSeeker/createCategory`,
        formData,
        { headers: { ...getAuthHeader(), "Content-Type": "multipart/form-data" } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Something went wrong");
    }
  }
);

export const getAllCategories = createAsyncThunk(
  "category/getAllCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/admin/jobSeeker/getAllCategory`,
        { headers: getAuthHeader() }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Something went wrong");
    }
  }
);

export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/api/admin/jobSeeker/updateCategory/${id}`,
        formData,
        { headers: { ...getAuthHeader(), "Content-Type": "multipart/form-data" } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Something went wrong");
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (id, { dispatch, rejectWithValue }) => {
    const endpointsToTry = [
      `${BASE_URL}/api/admin/jobSeeker/deleteCategory/${id}`,
      `${BASE_URL}/api/admin/jobSeeker/category/${id}`,
      `${BASE_URL}/api/admin/jobSeeker/deleteCategory?id=${id}`,
      `${BASE_URL}/api/admin/category/deleteCategory/${id}`,
    ];

    let lastErr = null;
    for (const url of endpointsToTry) {
      try {
        await axios.delete(url, { headers: getAuthHeader() });
        dispatch(getAllCategories());
        return id;
      } catch (err) {
        lastErr = err;
      }
    }
    return rejectWithValue(
      lastErr?.response?.data?.message || lastErr?.message || "Failed to delete category"
    );
  }
);

// ─── SUBCATEGORY ─────────────────────────────────────────────
export const createSubCategory = createAsyncThunk(
  "category/createSubCategory",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/admin/jobSeeker/createSubCategory`,
        formData,
        { headers: { ...getAuthHeader(), "Content-Type": "multipart/form-data" } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Something went wrong");
    }
  }
);

export const getSubCategoriesByCategoryId = createAsyncThunk(
  "category/getSubCategoriesByCategoryId",
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/admin/jobSeeker/getSubCategoryByCategoryId/${categoryId}`,
        { headers: getAuthHeader() }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Something went wrong");
    }
  }
);

export const updateSubCategory = createAsyncThunk(
  "category/updateSubCategory",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/api/admin/jobSeeker/updateSubCategory/${id}`,
        formData,
        { headers: { ...getAuthHeader(), "Content-Type": "multipart/form-data" } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Something went wrong");
    }
  }
);

export const deleteSubCategory = createAsyncThunk(
  "category/deleteSubCategory",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${BASE_URL}/api/admin/jobSeeker/deleteSubCategory/${id}`,
        { headers: getAuthHeader() }
      );
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Something went wrong");
    }
  }
);

// ─── DESIGNATION ─────────────────────────────────────────────
export const createDesignation = createAsyncThunk(
  "category/createDesignation",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/admin/jobSeeker/createDesignation`,
        formData,
        { headers: { ...getAuthHeader(), "Content-Type": "multipart/form-data" } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Something went wrong");
    }
  }
);

export const getDesignationsBySubCategoryId = createAsyncThunk(
  "category/getDesignationsBySubCategoryId",
  async (subCategoryId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/admin/jobSeeker/getDesignationBySubCategoryId/${subCategoryId}`,
        { headers: getAuthHeader() }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Something went wrong");
    }
  }
);

export const updateDesignation = createAsyncThunk(
  "category/updateDesignation",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/api/admin/jobSeeker/updateDesignation/${id}`,
        formData,
        { headers: { ...getAuthHeader(), "Content-Type": "multipart/form-data" } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Something went wrong");
    }
  }
);

export const deleteDesignation = createAsyncThunk(
  "category/deleteDesignation",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${BASE_URL}/api/admin/jobSeeker/deleteDesignation/${id}`,
        { headers: getAuthHeader() }
      );
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Something went wrong");
    }
  }
);

// ─── SLICE ────────────────────────────────────────────────────
const categorySlice = createSlice({
  name: "category",
  initialState: {
    // Category
    categories: [],
    categoriesLoading: false,
    categoryActionLoading: false,

    // SubCategory
    subCategories: [],
    subCategoriesLoading: false,
    subCategoryActionLoading: false,
    activeCategoryId: null,

    // Designation
    designations: [],
    designationsLoading: false,
    designationActionLoading: false,
    activeSubCategoryId: null,

    error: null,
  },
  reducers: {
    setActiveCategoryId: (state, action) => {
      state.activeCategoryId = action.payload;
      state.subCategories = [];
      state.designations = [];
    },
    setActiveSubCategoryId: (state, action) => {
      state.activeSubCategoryId = action.payload;
      state.designations = [];
    },
    clearCategoryError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ── getAllCategories
      .addCase(getAllCategories.pending, (state) => {
        state.categoriesLoading = true;
        state.error = null;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.categoriesLoading = false;
        const rawList = Array.isArray(action.payload?.data)
          ? action.payload.data
          : Array.isArray(action.payload)
          ? action.payload
          : [];
        state.categories = rawList.map((item) => ({
          ...item,
          id: item.id || item._id,
          _id: item._id || item.id,
          categoryName: item.categoryName || item.name || item.title || "Category",
          image: item.image || item.icon || item.categoryImage,
          description: item.description || item.desc,
        }));
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.categoriesLoading = false;
        state.error = action.payload;
        state.categories = [];
      })

      // ── createCategory
      .addCase(createCategory.pending, (state) => { state.categoryActionLoading = true; })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.categoryActionLoading = false;
        const d = action.payload.data;
        state.categories.push({
          id: d._id,
          categoryName: d.name,
          image: d.image,
          description: d.description,
        });
        toast.success("Category created successfully!", { autoClose: 1500 });
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.categoryActionLoading = false;
        state.error = action.payload;
        toast.error(action.payload, { autoClose: 2000 });
      })

      // ── updateCategory
      .addCase(updateCategory.pending, (state) => { state.categoryActionLoading = true; })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.categoryActionLoading = false;
        const d = action.payload.data;
        const idx = state.categories.findIndex((c) => c.id === d._id);
        if (idx !== -1) {
          state.categories[idx] = {
            id: d._id,
            categoryName: d.name,
            image: d.image,
            description: d.description,
          };
        }
        toast.success("Category updated successfully!", { autoClose: 1500 });
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.categoryActionLoading = false;
        toast.error(action.payload, { autoClose: 2000 });
      })

      // ── deleteCategory
      .addCase(deleteCategory.pending, (state) => { state.categoryActionLoading = true; })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categoryActionLoading = false;
        state.categories = state.categories.filter((c) => c.id !== action.payload && c._id !== action.payload);
        toast.success("Category deleted successfully!", { autoClose: 1500 });
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.categoryActionLoading = false;
        toast.error(action.payload, { autoClose: 2000 });
      })

      // ── getSubCategoriesByCategoryId
      .addCase(getSubCategoriesByCategoryId.pending, (state) => {
        state.subCategoriesLoading = true;
        state.error = null;
      })
      .addCase(getSubCategoriesByCategoryId.fulfilled, (state, action) => {
        state.subCategoriesLoading = false;
        state.subCategories = Array.isArray(action.payload?.data)
          ? action.payload.data
          : Array.isArray(action.payload)
          ? action.payload
          : [];
      })
      .addCase(getSubCategoriesByCategoryId.rejected, (state, action) => {
        state.subCategoriesLoading = false;
        state.error = action.payload;
        state.subCategories = [];
      })

      // ── createSubCategory
      .addCase(createSubCategory.pending, (state) => { state.subCategoryActionLoading = true; })
      .addCase(createSubCategory.fulfilled, (state, action) => {
        state.subCategoryActionLoading = false;
        const d = action.payload.data;
        state.subCategories.push({
          id: d._id,
          subCategoryName: d.name,
          image: d.image,
          description: d.description,
        });
        toast.success("Sub-category created successfully!", { autoClose: 1500 });
      })
      .addCase(createSubCategory.rejected, (state, action) => {
        state.subCategoryActionLoading = false;
        toast.error(action.payload, { autoClose: 2000 });
      })

      // ── updateSubCategory
      .addCase(updateSubCategory.pending, (state) => { state.subCategoryActionLoading = true; })
      .addCase(updateSubCategory.fulfilled, (state, action) => {
        state.subCategoryActionLoading = false;
        const d = action.payload.data;
        const idx = state.subCategories.findIndex((s) => s.id === d._id);
        if (idx !== -1) {
          state.subCategories[idx] = {
            id: d._id,
            subCategoryName: d.name,
            image: d.image,
            description: d.description,
          };
        }
        toast.success("Sub-category updated successfully!", { autoClose: 1500 });
      })
      .addCase(updateSubCategory.rejected, (state, action) => {
        state.subCategoryActionLoading = false;
        toast.error(action.payload, { autoClose: 2000 });
      })

      // ── deleteSubCategory
      .addCase(deleteSubCategory.pending, (state) => { state.subCategoryActionLoading = true; })
      .addCase(deleteSubCategory.fulfilled, (state, action) => {
        state.subCategoryActionLoading = false;
        state.subCategories = state.subCategories.filter((s) => s.id !== action.payload);
        toast.success("Sub-category deleted successfully!", { autoClose: 1500 });
      })
      .addCase(deleteSubCategory.rejected, (state, action) => {
        state.subCategoryActionLoading = false;
        toast.error(action.payload, { autoClose: 2000 });
      })

      // ── getDesignationsBySubCategoryId
      .addCase(getDesignationsBySubCategoryId.pending, (state) => {
        state.designationsLoading = true;
        state.error = null;
      })
      .addCase(getDesignationsBySubCategoryId.fulfilled, (state, action) => {
        state.designationsLoading = false;
        state.designations = action.payload.data;
      })
      .addCase(getDesignationsBySubCategoryId.rejected, (state, action) => {
        state.designationsLoading = false;
        state.error = action.payload;
      })

      // ── createDesignation
      .addCase(createDesignation.pending, (state) => { state.designationActionLoading = true; })
      .addCase(createDesignation.fulfilled, (state, action) => {
        state.designationActionLoading = false;
        const d = action.payload.data;
        state.designations.push({
          id: d._id,
          designationName: d.name,
          image: d.image,
          description: d.description,
        });
        toast.success("Designation created successfully!", { autoClose: 1500 });
      })
      .addCase(createDesignation.rejected, (state, action) => {
        state.designationActionLoading = false;
        toast.error(action.payload, { autoClose: 2000 });
      })

      // ── updateDesignation
      .addCase(updateDesignation.pending, (state) => { state.designationActionLoading = true; })
      .addCase(updateDesignation.fulfilled, (state, action) => {
        state.designationActionLoading = false;
        const d = action.payload.data;
        const idx = state.designations.findIndex((des) => des.id === d._id);
        if (idx !== -1) {
          state.designations[idx] = {
            id: d._id,
            designationName: d.name,
            image: d.image,
            description: d.description,
          };
        }
        toast.success("Designation updated successfully!", { autoClose: 1500 });
      })
      .addCase(updateDesignation.rejected, (state, action) => {
        state.designationActionLoading = false;
        toast.error(action.payload, { autoClose: 2000 });
      })

      // ── deleteDesignation
      .addCase(deleteDesignation.pending, (state) => { state.designationActionLoading = true; })
      .addCase(deleteDesignation.fulfilled, (state, action) => {
        state.designationActionLoading = false;
        state.designations = state.designations.filter((d) => d.id !== action.payload);
        toast.success("Designation deleted successfully!", { autoClose: 1500 });
      })
      .addCase(deleteDesignation.rejected, (state, action) => {
        state.designationActionLoading = false;
        toast.error(action.payload, { autoClose: 2000 });
      });
  },
});

export const { setActiveCategoryId, setActiveSubCategoryId, clearCategoryError } =
  categorySlice.actions;
export default categorySlice.reducer;