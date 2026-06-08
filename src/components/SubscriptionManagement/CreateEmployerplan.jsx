import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CircleChevronLeft } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchPlanTypeDropdown } from "../../redux/slice/subscriptions/employerPlans/plantypeDropdown";
import { fetchDurationDropdown } from "../../redux/slice/subscriptions/employerPlans/durationDropdown";
import { createEmployerPlan } from "../../redux/slice/subscriptions/employerPlans/getEmployerPlans";

const CreateEmployerplan = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get data from Redux Store
  const { options: planTypeOptions } = useSelector(
    (state) => state.planTypeDropdown,
  );
  const { options: durationOptions } = useSelector(
    (state) => state.durationDropdown,
  );

  useEffect(() => {
    dispatch(fetchPlanTypeDropdown());
    dispatch(fetchDurationDropdown());
  }, [dispatch]);

  // ✅ Validation Schema
  const validationSchema = Yup.object({
    title: Yup.string().required("Plan Type is required"),
    name: Yup.string().required("Plan name is required"),
    tag: Yup.string(),
    validity: Yup.string().required("Duration is required"),
    price: Yup.number()
      .typeError("Must be a number")
      .required("Price is required")
      .min(0, "Price cannot be negative"),
    discount: Yup.number()
      .typeError("Must be a number")
      .min(0, "Discount cannot be 0 or negative")
      .max(100, "Discount cannot exceed 100%"),
    jobCredits: Yup.number()
      .typeError("Must be a number")
      .min(0, "Credits cannot be negative"),
    databaseCredits: Yup.number()
      .typeError("Must be a number")
      .min(0, "Credits cannot be negative"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      name: "",
      tag: "",
      validity: "",
      price: "",
      discount: "",
      jobCredits: "",
      databaseCredits: "",
      // jobAlert: "",
      // support: "Yes",
    },
    validationSchema,
    onSubmit: (values) => {
      const payload = {
        title: values.name,
        planTag: values.tag,
        planType: values.title,
        duration: Number(values.validity),
        price: Number(values.price),
        discount: Number(values.discount),
        jobCredits: Number(values.jobCredits),
        databaseCredits: values.databaseCredits,
        // jobAlert: values.jobAlert,
        // support: values.support
      };

      dispatch(createEmployerPlan(payload))
        .unwrap()
        .then(() => {
          // toast.success("Employer Plan Created Successfully!");
          navigate(-1);
        })
        .catch((err) => {
          toast.error(err?.message || "Something went wrong");
        });
    },
  });

  const blockInvalidChar = (e) =>
    ["e", "E", "-", "+"].includes(e.key) && e.preventDefault();

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-5 rounded-xl shadow">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate(-1)}>
            <CircleChevronLeft size={25} />
          </button>
          <h2 className="text-2xl font-semibold">Create Employer Plan</h2>
        </div>

        <hr className="border-gray-300 mb-5" />

        <form
          onSubmit={formik.handleSubmit}
          className="max-h-[80vh] overflow-y-auto pr-2 no-scrollbar"
        >
          {/* Plan Info Section */}
          <div className="border border-gray-300 rounded-lg p-5 mb-6">
            <h3 className="font-semibold mb-4 text-purple-700">Plan Info</h3>
            <div className="grid grid-cols-2 gap-4">
              {/* Plan Name */}
              <div>
                <label className="text-sm text-gray-600 mb-1 block">
                  Plan Name
                </label>
                <input
                  name="name"
                  placeholder="e.g. Premium Plan"
                  className="bg-[#F7F8F9] border border-[#D3D3D3] p-3 rounded-md w-full focus:outline-purple-400"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.name}
                  </p>
                )}
              </div>

              {/* Plan Type (API Integration) */}
              <div>
                <label className="text-sm text-gray-600 mb-1 block">
                  Plan Type
                </label>
                <select
                  name="title"
                  className="bg-[#F7F8F9] border border-[#D3D3D3] p-3 rounded-md w-full"
                  onChange={formik.handleChange}
                  value={formik.values.title}
                >
                  <option value="">Select Plan Type</option>
                  {planTypeOptions?.map((opt, index) => (
                    <option key={index} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                {formik.touched.title && formik.errors.title && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.title}
                  </p>
                )}
              </div>

              {/* Plan Tag */}
              <div>
                <label className="text-sm text-gray-600 mb-1 block">
                  Plan Tag
                </label>
                <input
                  name="tag"
                  placeholder="e.g. Best Seller"
                  className="bg-[#F7F8F9] border border-[#D3D3D3] p-3 rounded-md w-full"
                  onChange={formik.handleChange}
                  value={formik.values.tag}
                />
                {formik.touched.tag && formik.errors.tag && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.tag}
                  </p>
                )}
              </div>

              {/* Duration (API Integration) */}
              {/* <div>
                <label className="text-sm text-gray-600 mb-1 block">Duration</label>
                <select
                  name="validity"
                  className="bg-[#F7F8F9] border border-[#D3D3D3] p-3 rounded-md w-full"
                  onChange={formik.handleChange}
                  value={formik.values.validity}
                >
                  <option value="">Select Duration</option>
                  {durationOptions?.map((opt, index) => (
                    <option key={index} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                {formik.touched.validity && formik.errors.validity && <p className="text-red-500 text-xs mt-1">{formik.errors.validity}</p>}
              </div> */}

              {/* Duration Select Box */}
              <div>
                <label className="text-sm text-gray-600 mb-1 block">
                  Duration
                </label>
                <select
                  name="validity"
                  className="bg-[#F7F8F9] border border-[#D3D3D3] p-3 rounded-md w-full"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.validity}
                >
                  <option value="">Select Duration</option>
                  {durationOptions?.map((opt, index) => (
                    // Yahan opt.value (e.g. 30) backend jayega aur opt.label (e.g. 1 months) UI mein dikhega
                    <option key={index} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                {formik.touched.validity && formik.errors.validity && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.validity}
                  </p>
                )}
              </div>

              {/* Price */}
              <div>
                <label className="text-sm text-gray-600 mb-1 block">
                  Plan Price (INR)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-700">₹</span>
                  <input
                    name="price"
                    type="number"
                    min="0"
                    onKeyDown={blockInvalidChar}
                    placeholder="0.00"
                    className="bg-[#F7F8F9] border border-[#D3D3D3] p-3 pl-9 rounded-md w-full"
                    onChange={formik.handleChange}
                    value={formik.values.price}
                  />
                </div>
                {formik.touched.price && formik.errors.price && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.price}
                  </p>
                )}
              </div>

              {/* Discount */}
              <div>
                <label className="text-sm text-gray-600 mb-1 block">
                  Discount (%)
                </label>
                <input
                  name="discount"
                  type="number"
                  placeholder="0"
                  min="0"
                  max="100"
                  onKeyDown={blockInvalidChar}
                  className="bg-[#F7F8F9] border border-[#D3D3D3] p-3 rounded-md w-full"
                  onChange={formik.handleChange}
                  value={formik.values.discount}
                />
                {formik.touched.discount && formik.errors.discount && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.discount}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Plan Features Section */}
          <div className="border border-gray-300 rounded-lg p-5 mb-6">
            <h3 className="font-semibold mb-4 text-purple-700">
              Plan Features
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600 mb-1 block">
                  Job Credit (Posts/Month)
                </label>
                <input
                  name="jobCredits"
                  type="number"
                  min="0"
                  onKeyDown={blockInvalidChar}
                  placeholder="e.g. 10"
                  className="bg-[#F7F8F9] border border-[#D3D3D3] p-3 rounded-md w-full"
                  onChange={formik.handleChange}
                  value={formik.values.jobCredits}
                />
                {formik.touched.jobCredits && formik.errors.jobCredits && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.jobCredits}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm text-gray-600 mb-1 block">
                  Database Credits
                </label>
                <input
                  name="databaseCredits"
                  type="number"
                  min="0"
                  onKeyDown={blockInvalidChar}
                  className="bg-[#F7F8F9] border border-[#D3D3D3] p-3 rounded-md w-full"
                  onChange={formik.handleChange}
                  value={formik.values.databaseCredits}
                />
                {formik.touched.jobCredits && formik.errors.jobCredits && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.jobCredits}
                  </p>
                )}
              </div>

              {/* <div>
                <label className="text-sm text-gray-600 mb-1 block">Support</label>
                <select 
                  name="support" 
                  className="bg-[#F7F8F9] border border-[#D3D3D3] p-3 rounded-md w-full"
                  onChange={formik.handleChange}
                  value={formik.values.support}
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div> */}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 mt-5 pb-4 mb-5">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-10 py-2 rounded-md bg-purple-100 text-purple-700 font-medium hover:bg-purple-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-10 py-2 rounded-md bg-purple-600 text-white font-medium hover:bg-purple-700 transition-colors"
            >
              Create Plan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEmployerplan;
