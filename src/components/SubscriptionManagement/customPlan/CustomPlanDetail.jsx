import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomPlanById } from "../../../redux/slice/subscriptions/customPlan/customPlanSlice";
import { 
  ChevronLeft, 
  Calendar, 
  User, 
  Zap, 
  CreditCard, 
  Activity,
  ArrowRight
} from "lucide-react";

const CustomPlanDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectedPlan, detailLoading, error } = useSelector(
    (state) => state.customPlan
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchCustomPlanById(id));
    }
  }, [dispatch, id]);

  if (detailLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-2">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-purple-100 border-t-purple-600"></div>
          <p className="text-sm font-medium text-purple-600">Loading plan details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-gray-50 p-6">
        <div className="rounded-xl bg-white p-8 shadow-sm border border-gray-200 text-center">
          <p className="text-rose-500 font-semibold mb-4">Error: {error}</p>
          <button 
            onClick={() => navigate(-1)} 
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-all"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FD] p-2 sm:p-4">
      <div className="mx-auto max-w-9xl">
        
        {/* Header Area */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate(-1)}
              className="group flex h-10 w-10 items-center justify-center rounded-full bg-white border border-gray-200 text-gray-500 shadow-sm hover:border-purple-300 hover:text-purple-600 transition-all"
            >
              <ChevronLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
            </button>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Plan Details</h2>
              <p className="text-sm text-gray-500">View and manage subscription specifics</p>
            </div>
          </div>

          <button 
            onClick={() => navigate(`/edit-custom-plan/${id}`)}
            className="bg-[#FFC107] hover:bg-[#e0a800] text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow-md shadow-yellow-100 transition-all active:scale-95"
          >
            Edit Plan
          </button>
        </div>

        {selectedPlan && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column: Plan Summary */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Main Info Card */}
              <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-16 w-16 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600 border border-purple-100">
                    <Zap size={32} />
                  </div>
                  <div>
                    <span className="text-xs font-bold  tracking-wider text-purple-600 bg-purple-50 px-2 py-0.5 rounded">
                      {selectedPlan.planType?.replace(/_/g, " ")}
                    </span>
                    <h1 className="text-2xl font-bold text-gray-900 mt-1">
                      {selectedPlan.companyName || "Customized Subscription"}
                    </h1>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-gray-400 ">Price</p>
                    <p className="text-xl font-bold text-gray-800">₹{selectedPlan.price}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-gray-400 ">Discount</p>
                    <p className="text-xl font-bold text-green-500">{selectedPlan.discount}%</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-gray-400 ">Duration</p>
                    <p className="text-xl font-bold text-gray-800">{selectedPlan.duration} Days</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-gray-400 ">Status</p>
                    <div className="flex items-center gap-1.5">
                      <span className={`h-2 w-2 rounded-full ${selectedPlan.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                      <p className={`text-sm font-bold capitalize ${selectedPlan.status === 'active' ? 'text-green-600' : 'text-red-500'}`}>
                        {selectedPlan.status}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Credits & Usage Section */}
              <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <CreditCard size={20} className="text-purple-600" /> Usage Allocation
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                    <p className="text-xs text-gray-500 mb-1">Job Credits</p>
                    <p className="text-2xl font-black text-purple-700">{selectedPlan.jobCredits}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                    <p className="text-xs text-gray-500 mb-1">DB Credits</p>
                    <p className="text-2xl font-black text-purple-700">{selectedPlan.databaseCredits || 0}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                    <p className="text-xs text-gray-500 mb-1">Job Validity</p>
                    <p className="text-2xl font-black text-purple-700">{selectedPlan.jobActiveFor} Days</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Timeline & Meta */}
            <div className="space-y-6">
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="text-md font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Calendar size={18} className="text-purple-600" /> Subscription Timeline
                </h3>
                
                <div className="relative space-y-6 before:absolute before:left-[11px] before:top-2 before:h-[calc(100%-16px)] before:w-px before:bg-gray-200">
                  <div className="relative pl-8">
                    <div className="absolute left-0 top-1.5 h-6 w-6 rounded-full bg-white border-2 border-purple-500 flex items-center justify-center z-10">
                      <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                    </div>
                    <p className="text-xs text-gray-400 font-bold ">Purchase Date</p>
                    <p className="text-sm font-semibold text-gray-700">
                      {new Date(selectedPlan.purchaseDate).toLocaleDateString("en-GB", { day: '2-digit', month: 'short', year: 'numeric' })}
                    </p>
                  </div>

                  <div className="relative pl-8">
                    <div className="absolute left-0 top-1.5 h-6 w-6 rounded-full bg-white border-2 border-red-400 flex items-center justify-center z-10">
                      <div className="h-2 w-2 rounded-full bg-red-400"></div>
                    </div>
                    <p className="text-xs text-gray-400 font-bold ">Expiry Date</p>
                    <p className="text-sm font-semibold text-gray-700">
                      {new Date(selectedPlan.endDate).toLocaleDateString("en-GB", { day: '2-digit', month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="text-md font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Activity size={18} className="text-purple-600" /> Meta Information
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Employer Plan ID</span>
                    <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">{selectedPlan.employerPlanId?.substring(0, 12)}...</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Custom Plan</span>
                    <span className="font-bold text-purple-600">{selectedPlan.isCustomPlan ? "Yes" : "No"}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default CustomPlanDetail;