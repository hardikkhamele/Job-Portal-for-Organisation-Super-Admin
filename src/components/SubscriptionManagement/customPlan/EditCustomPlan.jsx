import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CircleChevronLeft, Loader2, Save } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { 
  fetchCustomPlanById, 
  updateCustomPlan,
  fetchCustomPlanEnums, // Using the string array API
  clearError 
} from "../../../redux/slice/subscriptions/customPlan/customPlanSlice";
import { 
  fetchDurationDropdown, 
  fetchPlanTypesDropdown 
} from "../../../redux/slice/subscriptions/employerPlans/getAllEmployerDropdown";
import { toast } from "react-toastify";

const EditCustomPlan = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux State
  const { selectedPlan, detailLoading, createLoading, statusOptions } = useSelector((state) => state.customPlan);
  const { durations, planTypes } = useSelector((state) => state.employer);

  useEffect(() => {
    if (id) {
      dispatch(fetchCustomPlanById(id));
      dispatch(fetchDurationDropdown());
      dispatch(fetchPlanTypesDropdown());
      dispatch(fetchCustomPlanEnums()); // Fetches ["active", "inactive", "Expired"]
    }
  }, [dispatch, id]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      employerPlanId: selectedPlan?.employerPlanId || "",
      employerId: selectedPlan?.employerId || "",
      planType: selectedPlan?.planType || "",
      duration: selectedPlan?.duration || "",
      price: selectedPlan?.price || "",
      discount: selectedPlan?.discount || "",
      useCreditsIn: selectedPlan?.useCreditsIn || "",
      jobCredits: selectedPlan?.jobCredits || 0,
      databaseCredits: selectedPlan?.databaseCredits || 0,
      jobActiveFor: selectedPlan?.jobActiveFor || "30",
      status: selectedPlan?.status || ""
    },
    validationSchema: Yup.object({
      planType: Yup.string().required("Plan Type is required"),
      duration: Yup.number().required("Duration is required"),
      price: Yup.number().min(0, "No negative values").required("Required"),
      discount: Yup.number().min(0).max(100).required("Required"),
      jobCredits: Yup.number().min(0).required("Required"),
      databaseCredits: Yup.number().min(0).required("Required"),
      useCreditsIn: Yup.number().min(0).required("Required"),
      jobActiveFor: Yup.number().required("Required"),
      status: Yup.string().required("Status is required")
    }),
    onSubmit: async (values) => {
      const resultAction = await dispatch(updateCustomPlan({ id, updateData: values }));
      if (updateCustomPlan.fulfilled.match(resultAction)) {
        toast.success("Custom plan updated successfully!");
        navigate("/custom-plans");
      }
    },
  });

  const handleNoNegative = (e) => {
    if (e.key === "-" || e.key === "e") e.preventDefault();
  };

  const isJobCreditDisabled = formik.values.planType === "Database";
  const isDatabaseCreditDisabled = formik.values.planType === "Job_Posting";

  if (detailLoading) return (
    <div className="flex h-screen items-center justify-center bg-[#F8F9FD]">
      <Loader2 className="animate-spin text-purple-600" size={40} />
    </div>
  );

  return (
    <div className="p-4 bg-[#F8F9FD] min-h-screen font-sans text-sm">
      <div className="max-w-7xl mx-auto bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate(-1)} className="text-slate-400 hover:text-purple-600 transition-all">
            <CircleChevronLeft size={32} strokeWidth={1.5} />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Edit Custom Plan</h2>
            <p className="text-sm text-slate-500 font-medium">
              Modifying details for: <span className="text-purple-600 font-bold">{selectedPlan?.companyName || "Loading..."}</span>
            </p>
          </div>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          
          {/* STEP 1: Plan Configuration */}
          <div className="p-6 rounded-2xl border border-slate-100 bg-slate-50/50">
            <h3 className="text-xs font-bold text-purple-600 mb-6 ">Step 1: Plan Configuration</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-2 block">Plan Type (Category)</label>
                <select
                  name="planType"
                  className="w-full p-3 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
                  {...formik.getFieldProps("planType")}
                >
                  <option value="">Select Plan Type</option>
                  {planTypes?.map((type) => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700 mb-2 block">Plan Status</label>
                <select
                  name="status"
                  className="w-full p-3 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-purple-500/20 outline-none transition-all capitalize"
                  {...formik.getFieldProps("status")}
                >
                  <option value="">Select Status</option>
                  {/* ✅ FIXED: Correctly mapping dynamic array of strings ["active", "inactive", "Expired"] */}
                  {Array.isArray(statusOptions) && statusOptions.map((status) => {
                    const optionValue = status?.value ?? status;
                    const optionLabel = status?.label ?? status;
                    return (
                      <option key={optionValue} value={optionValue}>
                        {optionLabel}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700 mb-2 block">Assigned Company</label>
                <input
                  type="text"
                  readOnly
                  className="w-full p-3 rounded-xl border border-slate-200 bg-slate-100 text-slate-500 cursor-not-allowed"
                  value={selectedPlan?.companyName || ""}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* STEP 2: Pricing Section */}
            <div className="p-6 rounded-2xl border border-slate-100 bg-slate-50/50">
              <h3 className="text-xs font-bold text-purple-600 mb-6 ">Step 2: Pricing & Duration</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-slate-700 mb-2 block">Price (₹)</label>
                    <input 
                      type="number" 
                      min="0"
                      onKeyDown={handleNoNegative}
                      className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-500/20 outline-none" 
                      {...formik.getFieldProps("price")} 
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-slate-700 mb-2 block">Discount (%)</label>
                    <input 
                      type="number" 
                      min="0"
                      max="100"
                      onKeyDown={handleNoNegative}
                      className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-500/20 outline-none" 
                      {...formik.getFieldProps("discount")} 
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700 mb-2 block">Validity (Duration)</label>
                  <select 
                    className="w-full p-3 rounded-xl border border-slate-200 bg-white outline-none" 
                    {...formik.getFieldProps("duration")}
                  >
                    <option value="">Select Duration</option>
                    {durations?.map((d) => (
                      <option key={d.value} value={d.value}>{d.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* STEP 3: Allocation Section */}
            <div className="p-6 rounded-2xl border border-slate-100 bg-slate-50/50">
              <h3 className="text-xs font-bold text-purple-600 mb-6 ">Step 3: Feature Allocation</h3>
              <div className="grid grid-cols-2 gap-4">
                
                <div className={isJobCreditDisabled ? "opacity-40" : ""}>
                  <label className="text-sm font-semibold text-slate-700 mb-2 block">Job Credits</label>
                  <input
                    type="number"
                    min="0"
                    onKeyDown={handleNoNegative}
                    disabled={isJobCreditDisabled}
                    className="w-full p-3 rounded-xl border border-slate-200 outline-none disabled:bg-slate-100"
                    {...formik.getFieldProps("jobCredits")}
                  />
                </div>

                <div className={isDatabaseCreditDisabled ? "opacity-40" : ""}>
                  <label className="text-sm font-semibold text-slate-700 mb-2 block">Database Credits</label>
                  <input
                    type="number"
                    min="0"
                    onKeyDown={handleNoNegative}
                    disabled={isDatabaseCreditDisabled}
                    className="w-full p-3 rounded-xl border border-slate-200 outline-none disabled:bg-slate-100"
                    {...formik.getFieldProps("databaseCredits")}
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700 mb-2 block">Use Credits In (Days)</label>
                  <input 
                    type="number" 
                    min="0"
                    onKeyDown={handleNoNegative}
                    className="w-full p-3 rounded-xl border border-slate-200 outline-none" 
                    {...formik.getFieldProps("useCreditsIn")} 
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700 mb-2 block">Job Active Duration</label>
                  <select className="w-full p-3 rounded-xl border border-slate-200 outline-none bg-white" {...formik.getFieldProps("jobActiveFor")}>
                    <option value="15">15 Days</option>
                    <option value="30">30 Days</option>
                    <option value="60">60 Days</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-4 pt-6 border-t border-slate-100">
            <button 
              type="button" 
              onClick={() => navigate(-1)} 
              className="px-8 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-50 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={createLoading}
              className="px-10 py-3 rounded-xl bg-purple-600 text-white font-bold shadow-lg shadow-purple-100 hover:bg-purple-700 disabled:opacity-50 transition-all flex items-center justify-center gap-2 min-w-[200px]"
            >
              {createLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCustomPlan;