import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactionById,clearSelectedTransaction } from "../../redux/slice/revenueManagement/revenueSlice";
import BannerTwo from "../../assets/BannerTwo.svg";
import { Loader2, ArrowLeft } from "lucide-react";

const ViewRevenue = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedTransaction, loading, error } = useSelector((state) => state.revenue);

  useEffect(() => {
    if (id) {
      dispatch(fetchTransactionById(id));
    }
    return () => {
      dispatch(clearSelectedTransaction());
    };
  }, [id, dispatch]);

  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <Loader2 className="animate-spin text-purple-600 w-12 h-12" />
    </div>
  );

  if (error) return (
    <div className="p-10 text-center text-red-500 bg-gray-100 min-h-screen">
      <p>{error}</p>
      <button onClick={() => navigate(-1)} className="mt-4 text-purple-600 flex items-center gap-2 mx-auto w-fit">
        <ArrowLeft size={16} /> Go Back
      </button>
    </div>
  );

  if (!selectedTransaction) return null;

  // Destructuring based on the ACTUAL API response provided
  const {
    companyName,
    companyIndustry,
    companyLogo,
    paymentStatus,
    transactionId,
    paymentDateTime,
    paymentMethod,
    planDescription,
    planCharges,
    totalAmountPaid
  } = selectedTransaction;

  return (
    <div className="p-5 bg-gray-100 min-h-[90vh]">
      <div className="bg-white p-6 rounded-xl shadow-md max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">View Revenue</h1>
          <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-purple-600 transition-colors">
            <ArrowLeft size={24} />
          </button>
        </div>
        <hr className="mb-6 border-gray-200" />

        {/* Company Info */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center shadow-md overflow-hidden border border-gray-100">
            <img 
              src={companyLogo || BannerTwo} 
              alt="logo" 
              className="w-full h-full object-contain p-1" 
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold">{companyName || "N/A"}</h2>
            <p className="text-gray-500 text-sm">{companyIndustry || "Industry details not provided"}</p>
          </div>
        </div>

        <div className="shadow-lg border border-gray-100 rounded-xl p-6 bg-white">
          {/* Status Section */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-gray-700 font-medium">Payment Status</h3>
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
              paymentStatus === 'success' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
            }`}>
              {paymentStatus}
            </span>
          </div>

          <div className="border-t border-dashed border-gray-300 py-3"></div>

          {/* General Info */}
          <h4 className="font-bold mb-4 text-purple-800 uppercase tracking-wider text-xs">General Info</h4>
          <div className="grid grid-cols-2 gap-y-4 text-sm text-gray-700 mb-8">
            <span className="text-gray-500">Transaction Id</span>
            <span className="text-right font-medium">{transactionId}</span>

            <span className="text-gray-500">Company Name</span>
            <span className="text-right font-medium">{companyName}</span>

            <span className="text-gray-500">Payment Date & Time</span>
            <span className="text-right font-medium">
              {paymentDateTime ? new Date(paymentDateTime).toLocaleString() : "N/A"}
            </span>

            <span className="text-gray-500">Payment Method</span>
            <span className="text-right font-medium capitalize">{paymentMethod || "N/A"}</span>
          </div>

          {/* Billing Details */}
          <h4 className="font-bold mb-4 text-purple-800 uppercase tracking-wider text-xs">Billing Details</h4>
          <div className="grid grid-cols-2 gap-y-4 text-sm text-gray-700 mb-6">
            <span className="text-gray-500">Description</span>
            <span className="text-right font-medium">{planDescription || "Subscription Plan"}</span>

            <span className="text-gray-500">Plan Charges</span>
            <span className="text-right font-medium">₹{planCharges?.toLocaleString()}</span>
          </div>

          {/* Total Amount */}
          <div className="flex justify-between border-t border-dashed border-purple-200 pt-6 mt-4">
            <span className="font-bold text-lg text-gray-800">Total Amount Paid</span>
            <span className="text-green-600 font-bold text-2xl">
              ₹{totalAmountPaid?.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewRevenue;