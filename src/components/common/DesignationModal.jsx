import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CloudUpload, Loader2 } from "lucide-react";
import {
  createDesignation,
  updateDesignation,
} from "../../redux/slice/category/categorySlice";

function DesignationModal({
  open,
  setOpen,
  mode = "create",
  initialData = null,
  categoryId,
  subCategoryId,
}) {
  const dispatch = useDispatch();
  const { designationActionLoading } = useSelector((state) => state.category);
  const isEdit = mode === "edit";

  const formik = useFormik({
    initialValues: {
      name: initialData?.designationName || "",
      description: initialData?.description || "",
      icon: null,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string()
        .matches(/^[A-Za-z\s&\-]+$/, "Only alphabets, spaces, '&', and '-' are allowed")
        .min(2, "Must be at least 2 characters")
        .max(50, "Must be 50 characters or less")
        .required("Designation name is required"),
      description: Yup.string()
        .matches(/^[A-Za-z\s.,&'\-]+$/, "Only alphabets and basic punctuation are allowed")
        .min(5, "Must be at least 5 characters")
        .max(250, "Must be 250 characters or less")
        .required("Description is required"),
      icon: isEdit
        ? Yup.mixed().nullable()
        : Yup.mixed().required("Icon is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description);
      if (categoryId) formData.append("categoryId", categoryId);
      if (subCategoryId) formData.append("subCategoryId", subCategoryId);
      if (values.icon) formData.append("image", values.icon);

      if (isEdit) {
        dispatch(updateDesignation({ id: initialData.id, formData })).then(
          (res) => {
            if (!res.error) { resetForm(); setOpen(false); }
          }
        );
      } else {
        dispatch(createDesignation(formData)).then((res) => {
          if (!res.error) { resetForm(); setOpen(false); }
        });
      }
    },
  });

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white w-[420px] rounded-lg border border-purple-500 shadow-lg relative p-6">
        <button
          onClick={() => { formik.resetForm(); setOpen(false); }}
          className="absolute -top-4 -right-4 bg-purple-200 text-purple-700 w-8 h-8 rounded-full flex items-center justify-center"
        >
          ✕
        </button>

        <h2 className="text-purple-700 font-semibold text-lg mb-4">
          {isEdit ? "Edit Designation" : "Create Designation"}
        </h2>

        <form onSubmit={formik.handleSubmit}>
          {/* Name */}
          <div className="mb-4">
            <label className="text-sm font-medium">Designation Name</label>
            <input
              type="text"
              name="name"
              placeholder="e.g. Sales Growth Associate"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full mt-1 px-3 py-3 border rounded bg-[#F7F8F9] text-sm outline-none focus:border-purple-400 ${
                formik.touched.name && formik.errors.name
                  ? "border-red-400"
                  : "border-[#D3D3D3]"
              }`}
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.name}</p>
            )}
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="text-sm font-medium">Description</label>
            <input
              type="text"
              name="description"
              placeholder="e.g. Responsible for driving sales growth..."
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full mt-1 px-3 py-3 border rounded bg-[#F7F8F9] text-sm outline-none focus:border-purple-400 ${
                formik.touched.description && formik.errors.description
                  ? "border-red-400"
                  : "border-[#D3D3D3]"
              }`}
            />
            {formik.touched.description && formik.errors.description && (
              <p className="text-red-500 text-xs mt-1">
                {formik.errors.description}
              </p>
            )}
          </div>

          {/* Upload */}
          <div className="mb-6">
            <label className="text-sm font-medium">Upload Icon</label>
            <div
              className={`flex items-center justify-between border rounded bg-[#F7F8F9] px-3 py-3 mt-1 text-sm text-gray-500 ${
                formik.touched.icon && formik.errors.icon
                  ? "border-red-400"
                  : "border-[#D3D3D3]"
              }`}
            >
              <input
                type="file"
                accept="image/*,.svg"
                id="designationUpload"
                className="hidden"
                onChange={(e) =>
                  formik.setFieldValue("icon", e.currentTarget.files[0])
                }
              />
              <label
                htmlFor="designationUpload"
                className="cursor-pointer w-full truncate"
              >
                {formik.values.icon
                  ? formik.values.icon.name
                  : isEdit
                  ? "Upload new icon (optional)"
                  : "Upload file (.svg / image)"}
              </label>
              <CloudUpload size={20} className="text-purple-600 flex-shrink-0" />
            </div>
            {formik.touched.icon && formik.errors.icon && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.icon}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => { formik.resetForm(); setOpen(false); }}
              disabled={designationActionLoading}
              className="w-full py-2 rounded-md bg-purple-200 text-purple-700 font-medium disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={designationActionLoading}
              className="w-full py-2 rounded-md bg-gradient-to-r from-purple-600 to-purple-800 text-white font-medium flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {designationActionLoading ? (
                <><Loader2 size={16} className="animate-spin" /> {isEdit ? "Saving..." : "Creating..."}</>
              ) : isEdit ? "Save" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DesignationModal;