import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CloudUpload } from "lucide-react";

function SubCategoryModal({
  open,
  setOpen,
  mode = "create", // "create" | "edit"
  initialData = null,
}) {
  if (!open) return null;

  const isEdit = mode === "edit";

  const formik = useFormik({
    initialValues: {
      name: initialData?.name || "",
      icon: null,
    },
    enableReinitialize: true, 
    validationSchema: Yup.object({
      name: Yup.string().required("Sub-category name is required"),
      icon: isEdit
        ? Yup.mixed().nullable()
        : Yup.mixed().required("Icon is required"),
    }),
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      if (values.icon) formData.append("icon", values.icon);

      if (isEdit) {
        console.log("UPDATE SubCategory", values);
      } else {
        console.log("CREATE SubCategory", values);
      }

      setOpen(false);
    },
  });

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      
      <div className="bg-white w-[420px] rounded-lg border border-purple-500 shadow-lg relative p-6">
        
        {/* Close */}
        <button
          onClick={() => setOpen(false)}
          className="absolute -top-4 -right-4 bg-purple-200 text-purple-700 w-8 h-8 rounded-full flex items-center justify-center"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-purple-700 font-semibold text-lg mb-4">
          {isEdit ? "Edit Sub-Category" : "Create Sub-Category"}
        </h2>

        <form onSubmit={formik.handleSubmit}>
          
          {/* Name */}
          <div className="mb-4">
            <label className="text-sm">Sub-Category Name</label>
            <input
              type="text"
              name="name"
              placeholder="Developer"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full mt-1 px-3 py-3 border border-[#D3D3D3] rounded bg-[#F7F8F9] text-sm"
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500 text-xs mt-1">
                {formik.errors.name}
              </p>
            )}
          </div>

          {/* Upload */}
          <div className="mb-6">
            <label className="text-sm">Upload Icon</label>

            <div className="flex items-center justify-between border border-[#D3D3D3] rounded bg-[#F7F8F9] px-3 py-3 mt-1 text-sm text-gray-500">
              
              <input
                type="file"
                accept=".svg"
                id="subFileUpload"
                className="hidden"
                onChange={(e) => {
                  formik.setFieldValue("icon", e.currentTarget.files[0]);
                }}
              />

              <label htmlFor="subFileUpload" className="cursor-pointer w-full">
                {formik.values.icon
                  ? formik.values.icon.name
                  : "Upload file (.svg)"}
              </label>

              <CloudUpload size={20} className="text-purple-600" />
            </div>

            {formik.touched.icon && formik.errors.icon && (
              <p className="text-red-500 text-xs mt-1">
                {formik.errors.icon}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="w-full py-2 rounded-md bg-purple-200 text-purple-700 font-medium"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="w-full py-2 rounded-md bg-gradient-to-r from-purple-600 to-purple-800 text-white font-medium"
            >
              {isEdit ? "Save" : "Create"}
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}

export default SubCategoryModal;