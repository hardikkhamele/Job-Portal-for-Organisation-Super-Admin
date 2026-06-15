import { useNavigate } from "react-router-dom";
import { CircleChevronLeft } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

const CreateJobSeekerPlan = () => {
  const navigate = useNavigate();

  // ✅ Validation Schema
  const validationSchema = Yup.object({
    name: Yup.string()
      .matches(/^[A-Za-z\s]+$/, "Only alphabetic characters are allowed")
      .min(2, "Plan Name must be at least 2 characters")
      .max(50, "Plan Name cannot exceed 50 characters")
      .required("Plan name is required"),
    tag: Yup.string()
      .matches(/^[A-Za-z\s]+$/, "Only alphabetic characters are allowed")
      .min(2, "Plan Tag must be at least 2 characters")
      .max(50, "Plan Tag cannot exceed 50 characters")
      .required("Plan tag is required"),
    validity: Yup.string().required("Validity is required"),
    price: Yup.number()
      .typeError("Must be a number")
      .required("Price is required"),
    discount: Yup.number()
      .typeError("Must be a number")
      .required("Discount is required"),
    applyLimit: Yup.number()
      .typeError("Must be a number")
      .required("Apply limit is required"),
  });

  // ✅ Formik Setup
  const formik = useFormik({
    initialValues: {
      name: "",
      tag: "",
      validity: "1 Month",
      price: "",
      discount: "",
      applyLimit: "",
      profileBoost: "Yes",
      jobAlert: "Yes",
      support: "Yes",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form Data:", values);
      try {
        const stored = localStorage.getItem("jobSeekerPlans");
        let currentPlans = [];
        if (stored) {
          currentPlans = JSON.parse(stored);
        } else {
          currentPlans = [
            {
              id: 1,
              name: "Basic",
              tag: "For Active Job Seekers",
              validity: "1 Month",
              price: 199,
              discount: 35,
              applyLimit: 10,
              profileBoost: "Yes",
              jobAlert: "Yes",
              support: "Yes",
            },
            {
              id: 2,
              name: "Premium",
              tag: "Most Popular",
              validity: "1 Month",
              price: 299,
              discount: 35,
              applyLimit: 20,
              profileBoost: "Yes",
              jobAlert: "Yes",
              support: "Yes",
            },
            {
              id: 3,
              name: "Premium",
              tag: "Most Popular",
              validity: "1 Month",
              price: 399,
              discount: 35,
              applyLimit: 30,
              profileBoost: "Yes",
              jobAlert: "Yes",
              support: "Yes",
            },
            {
              id: 4,
              name: "Premium",
              tag: "Most Popular",
              validity: "1 Month",
              price: 499,
              discount: 35,
              applyLimit: 40,
              profileBoost: "Yes",
              jobAlert: "Yes",
              support: "Yes",
            },
            {
              id: 5,
              name: "Premium",
              tag: "Most Popular",
              validity: "1 Month",
              price: 599,
              discount: 35,
              applyLimit: 50,
              profileBoost: "Yes",
              jobAlert: "Yes",
              support: "Yes",
            },
          ];
        }

        const newPlan = {
          id: Date.now(),
          name: values.name,
          tag: values.tag,
          validity: values.validity,
          price: Number(values.price),
          discount: Number(values.discount),
          applyLimit: Number(values.applyLimit),
          profileBoost: values.profileBoost,
          jobAlert: values.jobAlert,
          support: values.support,
        };

        currentPlans.push(newPlan);
        localStorage.setItem("jobSeekerPlans", JSON.stringify(currentPlans));
      } catch (err) {
        console.error("Failed to save plan to localStorage:", err);
      }

      toast.success("Job Seeker Plan Created Successfully!", { autoClose: 1000 });
      setTimeout(() => {
        navigate("/job-seeker-plans");
      }, 1000);
    },
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded-xl shadow">
        
        {/* 🔹 Header */}
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate(-1)}>
            <CircleChevronLeft size={30} />
          </button>
          <h2 className="text-2xl font-semibold">
            Create Job Seeker Plan
          </h2>
        </div>

        <hr className="border-gray-300 mb-5" />
        <form onSubmit={formik.handleSubmit} className="max-h-[80vh] overflow-y-auto pr-2 no-scrollbar">
          
          {/* 🔹 Plan Info */}
          <div className="border border-gray-300 rounded-lg p-5 mb-6">
            <h3 className="font-semibold mb-4">Plan Info</h3>

            <div className="grid grid-cols-2 gap-4">
              
              {/* Plan Name */}
              <div>
                <input
                  name="name"
                  placeholder="Plan Name"
                  className="bg-[#F7F8F9] border border-[#D3D3D3] p-3 rounded-md w-full"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
                {formik.errors.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.name}
                  </p>
                )}
              </div>

              {/* Plan Tag */}
              <div>
                <input
                  name="tag"
                  placeholder="Plan Tag"
                  className="bg-[#F7F8F9] border border-[#D3D3D3] p-3 rounded-md w-full"
                  onChange={formik.handleChange}
                  value={formik.values.tag}
                />
                {formik.errors.tag && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.tag}
                  </p>
                )}
              </div>

              {/* Validity */}
              <div>
                <select
                  name="validity"
                  className="bg-[#F7F8F9] border border-[#D3D3D3] p-3 rounded-md w-full"
                  onChange={formik.handleChange}
                  value={formik.values.validity}
                >
                  <option>1 Month</option>
                  <option>3 Months</option>
                  <option>6 Months</option>
                </select>
              </div>

              {/* Price */}
              <div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-700">₹</span>
                  <input
                    name="price"
                    type="number"
                    placeholder="0.00"
                    className="bg-[#F7F8F9] border border-[#D3D3D3] p-3 pl-9 rounded-md w-full"
                    onChange={formik.handleChange}
                    value={formik.values.price}
                  />
                </div>
                {formik.errors.price && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.price}
                  </p>
                )}
              </div>

              {/* Discount */}
              <div className="col-span-2">
                <input
                  name="discount"
                  placeholder="Discount"
                  className="bg-[#F7F8F9] border border-[#D3D3D3] p-3 rounded-md w-113"
                  onChange={formik.handleChange}
                  value={formik.values.discount}
                />
                {formik.errors.discount && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.discount}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* 🔹 Plan Features */}
          <div className="border border-gray-300 rounded-lg p-5 mb-6">
            <h3 className="font-semibold mb-4">Plan Features</h3>

            <div className="grid grid-cols-2 gap-4">

              {/* Apply Limit */}
              <div>
                <input
                  name="applyLimit"
                  placeholder="Can Apply Jobs/Month"
                  className="bg-[#F7F8F9] border border-[#D3D3D3] p-3 rounded-md w-full"
                  onChange={formik.handleChange}
                  value={formik.values.applyLimit}
                />
                {formik.errors.applyLimit && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.applyLimit}
                  </p>
                )}
              </div>

              {/* Profile Boost */}
              <select
                name="profileBoost"
                className="bg-[#F7F8F9] border border-[#D3D3D3] p-3 rounded-md w-full"
                onChange={formik.handleChange}
                value={formik.values.profileBoost}
              >
                <option>Yes</option>
                <option>No</option>
              </select>

              {/* Job Alert */}
              <select
                name="jobAlert"
                className="bg-[#F7F8F9] border border-[#D3D3D3] p-3 rounded-md w-full"
                onChange={formik.handleChange}
                value={formik.values.jobAlert}
              >
                <option>Yes</option>
                <option>No</option>
              </select>

              {/* Support */}
              <select
                name="support"
                className="bg-[#F7F8F9] border border-[#D3D3D3] p-3 rounded-md w-full"
                onChange={formik.handleChange}
                value={formik.values.support}
              >
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>
          </div>

          {/* 🔹 Buttons */}
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

export default CreateJobSeekerPlan;