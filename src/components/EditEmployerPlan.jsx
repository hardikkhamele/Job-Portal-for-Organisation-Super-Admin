import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CircleChevronLeft } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addNotification } from "../utils/notificationHelper";

import { updateEmployerPlans, fetchEmployerPlanById, clearSinglePlan } from "../redux/slice/subscriptions/employerPlans/getEmployerPlans";
const EditEmployerPlan = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams(); 

  const { singlePlan, loading, isUpdating } = useSelector((state) => state.employerPlans);

  // 1. Fetch Plan Details on Load
  useEffect(() => {
    if (id) {
      dispatch(fetchEmployerPlanById(id));
    }
    return () => dispatch(clearSinglePlan());
  }, [dispatch, id]);

  // 2. Validation Schema
  const validationSchema = Yup.object({
    category: Yup.string().required("Plan category is required"),
    name: Yup.string()
      .matches(/^[A-Za-z\s]+$/, "Only alphabetic characters are allowed")
      .min(2, "Plan Name must be at least 2 characters")
      .max(50, "Plan Name cannot exceed 50 characters")
      .required("Plan name is required"),
    tag: Yup.string()
      .matches(/^[A-Za-z\s]*$/, "Only alphabetic characters are allowed")
      .max(50, "Plan Tag cannot exceed 50 characters"),
    validity: Yup.string().required("Validity is required"),
    price: Yup.number()
      .typeError("Must be a number")
      .required("Price is required")
      .min(0, "Price cannot be negative"),
    discount: Yup.number()
      .typeError("Must be a number")
      .min(0, "Discount cannot be negative")
      .max(100, "Discount cannot exceed 100%"),
    jobCredits: Yup.number()
      .typeError("Must be a number")
      .min(0, "Credits cannot be negative"),
    databaseCredit: Yup.number()
      .typeError("Must be a number")
      .min(0, "Credits cannot be negative"),
  });

  // 3. Formik Setup
  const formik = useFormik({
    initialValues: {
      category: singlePlan?.planType || "",
      name: singlePlan?.title || "",
      tag: singlePlan?.planTag || "",
      validity: String(singlePlan?.duration) || "30",
      price: singlePlan?.price || "",
      discount: singlePlan?.discount || "",
      jobCredits: singlePlan?.jobCredits || "",
      databaseCredit: singlePlan?.databaseCredits || "",
      creditValidity: String(singlePlan?.useCreditsIn) || "30",
      jobActive: "30",
      accountManager: false,
      branding: false,
    },
    validationSchema,
    enableReinitialize: true, // Data aane par form fields fill karne ke liye
    onSubmit: (values) => {
      const updateData = {
        title: values.name,
        price: Number(values.price),
        discount: Number(values.discount),
        planType: values.category,
        duration: Number(values.validity),
        planTag: values.tag,
        jobCredits: Number(values.jobCredits),
        databaseCredits: Number(values.databaseCredit),
        useCreditsIn: Number(values.creditValidity),
      };

      dispatch(updateEmployerPlans({ id, updateData }))
        .unwrap()
        .then(() => {
          addNotification(
            "Plan Created Successfully",
            `Employer Plan "${formik.values.name}" has been updated successfully.`,
            "success"
          );
          navigate(-1);
        })
        .catch((err) => toast.error(err || "Update failed"));
    },
  });

  if (loading) return <div className="p-10 text-center">Loading Data...</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded-xl shadow">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate(-1)}>
            <CircleChevronLeft size={30} />
          </button>
          <h2 className="text-2xl font-semibold">Edit Employer Plan</h2>
        </div>

        <hr className="border-gray-300 mb-5" />

        <form onSubmit={formik.handleSubmit} className="max-h-[80vh] overflow-y-auto pr-2 no-scrollbar">
          {/* Plan Info Section */}
          <div className="border border-gray-300 rounded-lg p-5 mb-6">
            <h3 className="font-semibold mb-4">Plan Info</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Plan Category</label>
                <input
                  name="category"
                  className="bg-[#F7F8F9] border border-[#D3D3D3] p-3 rounded-md w-full"
                  {...formik.getFieldProps("category")}
                />
                {formik.touched.category && formik.errors.category && <p className="text-red-500 text-xs">{formik.errors.category}</p>}
              </div>

              <div>
                <label className="text-sm text-gray-600 mb-1 block">Plan Name</label>
                <input
                  name="name"
                  className="bg-[#F7F8F9] border border-[#D3D3D3] p-3 rounded-md w-full"
                  {...formik.getFieldProps("name")}
                />
                {formik.touched.name && formik.errors.name && <p className="text-red-500 text-xs">{formik.errors.name}</p>}
              </div>

              <div>
                <label className="text-sm text-gray-600 mb-1 block">Plan Tag</label>
                <input
                  name="tag"
                  className="bg-[#F7F8F9] border border-[#D3D3D3] p-3 rounded-md w-full"
                  {...formik.getFieldProps("tag")}
                />
                {formik.touched.tag && formik.errors.tag && (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.tag}</p>
                )}
              </div>

              <div>
                <label className="text-sm text-gray-600 mb-1 block">Validity</label>
                <select name="validity" className="bg-[#F7F8F9] border border-[#D3D3D3] p-3 rounded-md w-full" {...formik.getFieldProps("validity")}>
                  <option value="30">1 Month</option>
                  <option value="90">3 Months</option>
                  <option value="180">6 Months</option>
                </select>
                {formik.touched.validity && formik.errors.validity && (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.validity}</p>
                )}
              </div>

              <div>
                <label className="text-sm text-gray-600 mb-1 block">Price</label>
                <input name="price" className="bg-[#F7F8F9] border border-[#D3D3D3] p-3 rounded-md w-full" {...formik.getFieldProps("price")} />
                {formik.touched.price && formik.errors.price && (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.price}</p>
                )}
              </div>

              <div>
                <label className="text-sm text-gray-600 mb-1 block">Discount (%)</label>
                <input name="discount" className="bg-[#F7F8F9] border border-[#D3D3D3] p-3 rounded-md w-full" {...formik.getFieldProps("discount")} />
                {formik.touched.discount && formik.errors.discount && (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.discount}</p>
                )}
              </div>
            </div>
          </div>

          {/* Plan Features Section */}
          <div className="border border-gray-300 rounded-lg p-5 mb-6">
            <h3 className="font-semibold mb-4">Plan Features</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Job Credit</label>
                <input name="jobCredits" className="bg-[#F7F8F9] border border-[#D3D3D3] p-3 rounded-md w-full" {...formik.getFieldProps("jobCredits")} />
                {formik.touched.jobCredits && formik.errors.jobCredits && (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.jobCredits}</p>
                )}
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Database Credit</label>
                <input name="databaseCredit" className="bg-[#F7F8F9] border border-[#D3D3D3] p-3 rounded-md w-full" {...formik.getFieldProps("databaseCredit")} />
                {formik.touched.databaseCredit && formik.errors.databaseCredit && (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.databaseCredit}</p>
                )}
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-4">
            <button type="button" onClick={() => navigate(-1)} className="bg-[#DCBDED] px-10 py-2 rounded-md text-purple-700 font-medium">
              Cancel
            </button>
            <button type="submit" disabled={isUpdating} className="px-10 py-2 cursor-pointer rounded-md bg-purple-600 text-white font-medium">
              {isUpdating ? "Updating..." : "Update Plan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEmployerPlan;