import React from "react";
import { useNavigate } from "react-router-dom";
import { CircleChevronLeft } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";

const CreateCustomPlan = () => {
  const navigate = useNavigate();

  // ✅ Validation Schema
  const validationSchema = Yup.object({
    employerPlanId: Yup.string().required("employerPlanId is required"),
    employerId: Yup.string().required("Plan employerId is required"),
    duration: Yup.string().required("duration is required"),
    price: Yup.number()
      .typeError("Must be a number")
      .required("Price is required"),
    discount: Yup.number()
      .typeError("Must be a number")
      .required("Discount is required"),
    jobCredits: Yup.number()
      .typeError("Must be a number")
      .required("job credit is required"),
      useCreditsIn:Yup.number().required("Use credits in is Required"),
      jobActiveFor:Yup.number().required("Job Active is required"),
      databaseCredits:Yup.number().required("Database Credits is required")
  });

  const formik = useFormik({
    initialValues: {
      employerPlanId: "",
      employerId: "",
      duration: "",
      price: "",
      discount: "",
      useCreditsIn:"",
      jobCredits: "",
      databaseCredits:"",
      jobActiveFor:""
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form Data:", values);
    },
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded-xl shadow">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate(-1)}>
            <CircleChevronLeft size={30} />
          </button>
          <h2 className="text-2xl font-semibold">Create Custom Plan</h2>
        </div>

        <hr className="border-gray-300 mb-5" />

        <form
          onSubmit={formik.handleSubmit}
          className="max-h-[80vh] overflow-y-auto pr-2 no-scrollbar"
        >
          {/* Plan Info */}
          <div className="border border-gray-300 rounded-lg p-5 mb-6">
            <h3 className="font-semibold mb-4">Plan Info</h3>

            <div className="grid grid-cols-2 gap-4">
              {/* employerPlanId */}
              <div>
                <label className="text-sm text-gray-600 mb-1 block">
                  Employer plan name
                </label>
                <input
                  name="employerPlanId"
                  placeholder="Plan employerPlanId"
                  className="bg-[#F7F8F9] border border-[#D3D3D3] p-3 rounded-md w-full"
                  onChange={formik.handleChange}
                  value={formik.values.employerPlanId}
                />
                {formik.errors.employerPlanId && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.employerPlanId}
                  </p>)}
              </div>

              {/* Plan Name */}
              <div>
                <label className="text-sm text-gray-600 mb-1 block">
                   Employer name
                </label>
                <input
                  name="name"
                  placeholder="Plan Name"
                  className="bg-[#F7F8F9] border border-[#D3D3D3] p-3 rounded-md w-full"
                  onChange={formik.handleChange}
                  value={formik.values.employerId}
                />
                  {formik.errors.employerId && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.employerId}
                  </p>)}
              </div>

              {/* duration */}
              <div>
                <label className="text-sm text-gray-600 mb-1 block">
                  duration
                </label>
                <select
                  name="duration"
                  className="bg-[#F7F8F9] border border-[#D3D3D3] p-3 rounded-md w-full"
                  onChange={formik.handleChange}
                  value={formik.values.duration}
                >
                  <option>1 Month</option>
                  <option>3 Months</option>
                  <option>6 Months</option>
                </select>
                  {formik.errors.duration && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.duration}
                  </p>)}
              </div>

              {/* Price */}
              <div>
                <label className="text-sm text-gray-600 mb-1 block">
                  Plan Price
                </label>
                <input
                  name="price"
                  placeholder="Plan Price"
                  className="bg-[#F7F8F9] border border-[#D3D3D3] p-3 rounded-md w-full"
                  onChange={formik.handleChange}
                  value={formik.values.price}
                />
                  {formik.errors.jobCredits && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.price}
                  </p>)}
              </div>

              {/* Discount */}
              <div>
                <label className="text-sm text-gray-600 mb-1 block">
                  Discount
                </label>
                <input
                  name="discount"
                  placeholder="Discount"
                  className="bg-[#F7F8F9] border border-[#D3D3D3] p-3 rounded-md w-full"
                  onChange={formik.handleChange}
                  value={formik.values.discount}
                />
                 {formik.errors.jobCredits && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.discount}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Plan Features */}
          <div className="border border-gray-300 rounded-lg p-5 mb-6">
            <h3 className="font-semibold mb-4">Plan Features</h3>

            <div className="grid grid-cols-2 gap-4">
              {/* Job Credit */}
              <div>
                <label className="text-sm text-gray-600 mb-1 block">
                  Job Credit
                </label>
                <input
                  name="jobCredits"
                  type="number"
                  placeholder="Can Apply Jobs/Month"
                  className="bg-[#F7F8F9] border border-[#D3D3D3] p-3 rounded-md w-full"
                  onChange={formik.handleChange}
                  value={formik.values.jobCredits}
                />
                {formik.errors.jobCredits && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.jobCredits}
                  </p>
                )}
              </div>

              {/* Database Credit */}
              <div>
                <label className="text-sm text-gray-600 mb-1 block">
                  Database Credit
                </label>
                <input
                  name="databaseCredit"
                  type="number"
                  placeholder="Database Credit"
                  className="bg-[#F7F8F9] border border-[#D3D3D3] p-3 rounded-md w-full"
                  onChange={formik.handleChange}
                  value={formik.values.databaseCredits}
                />
                {formik.errors.jobCredits && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.databaseCredits}
                  </p>
                )}
              </div>

              {/* Use credit in */}
               <div>
                <label className="text-sm text-gray-600 mb-1 block">
                  Use CreditIn
                </label>
                <input
                  name="useCreditsIn"
                  type="number"
                  placeholder="Enter UseCreditIn"
                  className="bg-[#F7F8F9] border border-[#D3D3D3] p-3 rounded-md w-full"
                  onChange={formik.handleChange}
                  value={formik.values.useCreditsIn}
                />
                 {formik.errors.jobCredits && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.useCreditsIn}
                  </p>
                )}
              </div>

              {/* Credit duration */}
              {/* <div>
                <label className="text-sm text-gray-600 mb-1 block">
                  Credit duration
                </label>
                <select
                  name="creditduration"
                  className="bg-[#F7F8F9] border border-[#D3D3D3] p-3 rounded-md w-full"
                >
                  <option>30 Days</option>
                  <option>60 Days</option>
                  <option>90 Days</option>
                </select>
              </div> */}

              {/* Job Active For */}
              <div>
                <label className="text-sm text-gray-600 mb-1 block">
                  Job Active For
                </label>
                <select
                  name="jobActiveFor"
                  className="bg-[#F7F8F9] border border-[#D3D3D3] p-3 rounded-md w-full"
                  onChange={formik.handleChange}
                  value={formik.values.jobActiveFor}
                >
                  <option>15 Days</option>
                  <option>30 Days</option>
                  <option>60 Days</option>
                </select>
                 {formik.errors.jobActiveFor && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.jobActiveFor}
                  </p>
                )}
              </div>
            </div>
          </div>
          {/* Buttons */}
          <div className="flex justify-center gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className=" bg-[#DCBDED] px-10 py-2 rounded-md bg-purple-200 text-purple-700 font-medium"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-10 py-2 rounded-md bg-purple-600 text-white font-medium"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCustomPlan;


