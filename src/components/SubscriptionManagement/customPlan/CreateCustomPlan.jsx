import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  CircleChevronLeft, 
  Loader2, 
  CheckCircle2, 
  Copy, 
  ExternalLink, 
  X 
} from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { 
  fetchEmployerDropdown, 
  fetchEmployerPlansDropdown,
  fetchDurationDropdown,
  fetchPlanTypesDropdown 
} from "../../../redux/slice/subscriptions/employerPlans/getAllEmployerDropdown";
import { createCustomPlanPayment } from "../../../redux/slice/subscriptions/customPlan/customPlanSlice";
import { fetchEmployerPlanById, clearSinglePlan } from "../../../redux/slice/subscriptions/employerPlans/getEmployerPlans";
import { toast } from "react-toastify";
import { addNotification } from "../../../utils/notificationHelper";

const CreateCustomPlan = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Local State for Success Popup
  const [showModal, setShowModal] = useState(false);
  const [paymentResponse, setPaymentResponse] = useState(null);

  // Redux State
  const { employers, employerPlans, durations, planTypes } = useSelector((state) => state.employer);
  const { createLoading } = useSelector((state) => state.customPlan);
  const { singlePlan } = useSelector((state) => state.employerPlans);

  useEffect(() => {
    dispatch(fetchEmployerDropdown());
    dispatch(fetchEmployerPlansDropdown());
    dispatch(fetchDurationDropdown());
    dispatch(fetchPlanTypesDropdown());
    return () => dispatch(clearSinglePlan());
  }, [dispatch]);

  useEffect(() => {
    if (singlePlan) {
      formik.setValues({
        ...formik.values,
        duration: singlePlan.duration || "",
        price: singlePlan.price || "",
        discount: singlePlan.discount || "",
        jobCredits: singlePlan.jobCredits || 0,
        databaseCredits: singlePlan.databaseCredits || 0,
        useCreditsIn: singlePlan.useCreditsIn || "",
        jobActiveFor: singlePlan.jobActiveFor || "30",
        planType: singlePlan.planType || "" 
      });
    }
  }, [singlePlan]);

  const formik = useFormik({
    initialValues: {
      employerPlanId: "",
      employerId: "",
      planType: "",
      duration: "",
      price: "",
      discount: "",
      useCreditsIn: "",
      jobCredits: 0,
      databaseCredits: 0,
      jobActiveFor: "30"
    },
    // Enforce strict validation to keep button disabled if any field is empty/negative
    validationSchema: Yup.object({
      employerPlanId: Yup.string().required("Base plan is required"),
      employerId: Yup.string().required("Employer is required"),
      planType: Yup.string().required("Plan Type is required"),
      duration: Yup.number().required("Duration is required"),
      price: Yup.number().min(0, "Min 0").required("Price is required"),
      discount: Yup.number().min(0, "Min 0").max(100, "Max 100").required("Discount is required"),
      jobCredits: Yup.number().min(0, "Min 0").required("Job credits required"),
      databaseCredits: Yup.number().min(0, "Min 0").required("DB credits required"),
      useCreditsIn: Yup.number().min(0, "Min 0").required("Required"),
      jobActiveFor: Yup.number().required("Required"),
    }),
    validateOnMount: true, // Check validity immediately on load
    onSubmit: async (values) => {
      const formattedValues = {
        ...values,
        duration: values.duration ? Number(values.duration) : "",
        price: values.price ? Number(values.price) : 0,
        discount: values.discount ? Number(values.discount) : 0,
        jobCredits: values.jobCredits ? Number(values.jobCredits) : 0,
        databaseCredits: values.databaseCredits ? Number(values.databaseCredits) : 0,
        useCreditsIn: values.useCreditsIn ? Number(values.useCreditsIn) : 0,
        jobActiveFor: values.jobActiveFor ? Number(values.jobActiveFor) : 30,
      };
      const resultAction = await dispatch(createCustomPlanPayment(formattedValues));
      if (createCustomPlanPayment.fulfilled.match(resultAction)) {
        setPaymentResponse(resultAction.payload.data);
        setShowModal(true);
        addNotification(
          "Payment Successful",
          `Custom plan payment link generated successfully for price ₹${values.price}.`,
          "success"
        );
        addNotification(
          "Plan Created Successfully",
          `Custom Plan has been initiated/created successfully.`,
          "success"
        );
        toast.success("Payment link generated successfully!");
      } else {
        toast.error(resultAction.payload || "Failed to generate payment link. Please verify payment gateway settings.");
      }
    },
  });

  const handleBasePlanChange = (e) => {
    const planId = e.target.value;
    formik.setFieldValue("employerPlanId", planId);
    if (planId) dispatch(fetchEmployerPlanById(planId));
  };

  const handleNoNegative = (e) => {
    if (e.key === "-" || e.key === "e") e.preventDefault();
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Payment link copied!");
  };

  const isJobCreditDisabled = formik.values.planType === "Database";
  const isDatabaseCreditDisabled = formik.values.planType === "Job_Posting";

  // Determine if the button should be inactive
  const isButtonDisabled = createLoading || !formik.isValid || !formik.dirty;

  return (
    <div className="p-4 bg-[#F8F9FD] min-h-screen relative font-sans">
      <div className="max-w-7xl mx-auto bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center bg-white hover:bg-slate-50 transition">
            <CircleChevronLeft size={20} strokeWidth={1.5} className="text-black" />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Create Custom Plan</h2>
            <p className="text-sm text-slate-500 font-medium">Configure customized pricing and credits for individual employers.</p>
          </div>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          
          {/* STEP 1: Plan Configuration */}
          <div className="p-6 rounded-2xl border border-slate-100 bg-slate-50/50">
            <h3 className="text-xs font-bold   text-purple-600 mb-6">Step 1: Plan Configuration</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-2 block">Base Employer Plan</label>
                <select
                  name="employerPlanId"
                  className="w-full p-3 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
                  value={formik.values.employerPlanId}
                  onChange={handleBasePlanChange}
                >
                  <option value="">Choose a base template</option>
                  {employerPlans?.map((plan) => (
                    <option key={plan.value} value={plan.value}>{plan.label}</option>
                  ))}
                </select>
                {formik.touched.employerPlanId && formik.errors.employerPlanId && (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.employerPlanId}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700 mb-2 block">Plan Type</label>
                <select
                  className="w-full p-3 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
                  {...formik.getFieldProps("planType")}
                >
                  <option value="">Select Type</option>
                  {planTypes?.map((type) => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
                {formik.touched.planType && formik.errors.planType && (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.planType}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700 mb-2 block">Assign Employer</label>
                <select
                  className="w-full p-3 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
                  {...formik.getFieldProps("employerId")}
                >
                  <option value="">Select Company</option>
                  {employers?.map((emp) => (
                    <option key={emp.value} value={emp.value}>{emp.label}</option>
                  ))}
                </select>
                {formik.touched.employerId && formik.errors.employerId && (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.employerId}</p>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* STEP 2: Pricing */}
            <div className="p-6 rounded-2xl border border-slate-100 bg-slate-50/50">
              <h3 className="text-xs font-bold   text-purple-600 mb-6">Step 2: Pricing & Duration</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-slate-700 mb-2 block">Price (₹)</label>
                    <input type="number" min="0" onKeyDown={handleNoNegative} className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-500/20 outline-none" {...formik.getFieldProps("price")} />
                    {formik.touched.price && formik.errors.price && (
                      <p className="text-red-500 text-xs mt-1">{formik.errors.price}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-slate-700 mb-2 block">Discount (%)</label>
                    <input type="number" min="0" max="100" onKeyDown={handleNoNegative} className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-500/20 outline-none" {...formik.getFieldProps("discount")} />
                    {formik.touched.discount && formik.errors.discount && (
                      <p className="text-red-500 text-xs mt-1">{formik.errors.discount}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700 mb-2 block">Duration</label>
                  <select className="w-full p-3 rounded-xl border border-slate-200 bg-white outline-none" {...formik.getFieldProps("duration")}>
                    <option value="">Select Duration</option>
                    {durations?.map((d) => <option key={d.value} value={d.value}>{d.label}</option>)}
                  </select>
                  {formik.touched.duration && formik.errors.duration && (
                    <p className="text-red-500 text-xs mt-1">{formik.errors.duration}</p>
                  )}
                </div>
              </div>
            </div>

            {/* STEP 3: Allocation */}
            <div className="p-6 rounded-2xl border border-slate-100 bg-slate-50/50">
              <h3 className="text-xs font-bold   text-purple-600 mb-6">Step 3: Allocation</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className={isJobCreditDisabled ? "opacity-40" : ""}>
                  <label className="text-sm font-semibold text-slate-700 mb-2 block">Job Credits</label>
                  <input type="number" min="0" onKeyDown={handleNoNegative} disabled={isJobCreditDisabled} className="w-full p-3 rounded-xl border border-slate-200 outline-none disabled:bg-slate-100" {...formik.getFieldProps("jobCredits")} />
                  {formik.touched.jobCredits && formik.errors.jobCredits && (
                    <p className="text-red-500 text-xs mt-1">{formik.errors.jobCredits}</p>
                  )}
                </div>
                <div className={isDatabaseCreditDisabled ? "opacity-40" : ""}>
                  <label className="text-sm font-semibold text-slate-700 mb-2 block">DB Credits</label>
                  <input type="number" min="0" onKeyDown={handleNoNegative} disabled={isDatabaseCreditDisabled} className="w-full p-3 rounded-xl border border-slate-200 outline-none disabled:bg-slate-100" {...formik.getFieldProps("databaseCredits")} />
                  {formik.touched.databaseCredits && formik.errors.databaseCredits && (
                    <p className="text-red-500 text-xs mt-1">{formik.errors.databaseCredits}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700 mb-2 block">Use Credits In (Days)</label>
                  <input type="number" min="0" onKeyDown={handleNoNegative} className="w-full p-3 rounded-xl border border-slate-200 outline-none" {...formik.getFieldProps("useCreditsIn")} />
                  {formik.touched.useCreditsIn && formik.errors.useCreditsIn && (
                    <p className="text-red-500 text-xs mt-1">{formik.errors.useCreditsIn}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700 mb-2 block">Job Active For</label>
                  <select className="w-full p-3 rounded-xl border border-slate-200 bg-white outline-none" {...formik.getFieldProps("jobActiveFor")}>
                    <option value="15">15 Days</option>
                    <option value="30">30 Days</option>
                    <option value="60">60 Days</option>
                  </select>
                  {formik.touched.jobActiveFor && formik.errors.jobActiveFor && (
                    <p className="text-red-500 text-xs mt-1">{formik.errors.jobActiveFor}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-4 pt-6 border-t border-slate-100">
            <button type="button" onClick={() => navigate(-1)} className="px-8 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-50 transition-all">Cancel</button>
            <button
              type="submit"
              disabled={isButtonDisabled}
              className={`px-10 py-3 rounded-xl font-bold shadow-lg transition-all flex items-center justify-center gap-2 min-w-[240px] 
                ${isButtonDisabled 
                  ? "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none" 
                  : "bg-purple-600 text-white hover:bg-purple-700 shadow-purple-100"}`}
            >
              {createLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> 
                  Processing...
                </>
              ) : (
                "Generate Payment Link"
              )}
            </button>
          </div>
        </form>
      </div>

      {/* SUCCESS MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-[32px] p-8 max-w-md w-full shadow-2xl relative animate-in zoom-in duration-300">
            <button onClick={() => setShowModal(false)} className="absolute right-6 top-6 text-slate-400 hover:text-slate-600">
              <X size={24} />
            </button>
            <div className="flex flex-col items-center text-center">
              <div className="h-20 w-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 size={44} />
              </div>
              <h3 className="text-2xl font-bold text-slate-800">Payment Link Ready</h3>
              <p className="text-slate-500 mt-2 text-sm">The custom plan has been created. You can now share the payment link with the employer.</p>
              
              <div className="mt-8 w-full">
                <div className="flex items-center gap-2 p-4 bg-slate-50 rounded-2xl border border-slate-200 mb-6">
                  <div className="flex-1 truncate text-xs font-mono text-indigo-600">{paymentResponse?.paymentLink}</div>
                  <button onClick={() => copyToClipboard(paymentResponse?.paymentLink)} className="p-2 hover:bg-indigo-50 text-indigo-600 rounded-lg transition-colors">
                    <Copy size={18} />
                  </button>
                </div>

                <div className="flex flex-col gap-3">
                  <a href={paymentResponse?.paymentLink} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 w-full py-4 bg-purple-600 text-white rounded-2xl font-bold hover:bg-purple-700 shadow-xl shadow-purple-100 transition-all">
                    Open Payment Page <ExternalLink size={18} />
                  </a>
                  <button onClick={() => setShowModal(false)} className="w-full py-4 text-slate-500 font-semibold hover:text-slate-700">
                    Done
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateCustomPlan;