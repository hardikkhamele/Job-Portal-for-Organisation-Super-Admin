import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCredits } from "../../redux/slice/creditManagement/creditSlice";
import {
  Database,
  Briefcase,
  UserCheck,
  FileSpreadsheet,
  Star,
  Zap,
  Trophy,
  Loader2,
  AlertCircle,
  Pencil,
  CreditCard,
} from "lucide-react";
import EditCreditModal from "./EditCreditModel";

const StatCard = ({ icon: Icon, label, value, iconBg }) => (
  <div className="flex items-center gap-4 p-4 rounded-xl border border-purple-100 bg-white shadow-sm hover:shadow-md transition-shadow">
    <div className={`p-3 rounded-xl ${iconBg}`}>
      <Icon size={20} className="text-white" />
    </div>
    <div>
      <p className="text-xs text-gray-400 font-medium  tracking-wider">
        {label}
      </p>
      <p className="text-2xl font-bold text-gray-800 mt-0.5">{value}</p>
    </div>
  </div>
);

const CreditModel = () => {
  const dispatch = useDispatch();
  const { credits, loading, error } = useSelector(
    (state) => state.creditManagement
  );
  const [editOpen, setEditOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchCredits());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3">
        <Loader2 size={36} className="text-purple-500 animate-spin" />
        <p className="text-gray-400 text-sm">Loading credits...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <div className="p-3 bg-red-50 rounded-full">
          <AlertCircle size={28} className="text-red-400" />
        </div>
        <p className="text-red-500 text-sm font-medium">{error}</p>
      </div>
    );
  }

  const db = credits?.databaseCredit;
  const job = credits?.jobPostCredit;

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-violet-50 p-6">
        <div className="max-w-7xl mx-auto space-y-6">

          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-600 rounded-2xl shadow-lg shadow-purple-200">
                <CreditCard size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Credit Management</h1>
                <p className="text-sm text-gray-400 mt-0.5">Platform credit configuration</p>
              </div>
            </div>
            <button
              onClick={() => setEditOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-purple-600 text-white
                rounded-xl text-sm font-semibold hover:bg-purple-700
                transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
            >
              <Pencil size={15} />
              Edit
            </button>
          </div>

          {/* Database Credits */}
          <div className="bg-white rounded-2xl border border-purple-100 p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 bg-purple-100 rounded-lg">
                <Database size={15} className="text-purple-600" />
              </div>
              <h2 className="text-xs font-bold text-purple-600  ">
                Database Credits
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <StatCard
                icon={UserCheck}
                label="Profile Unlock"
                value={db?.profileUnlock ?? 0}
                iconBg="bg-purple-500"
              />
              <StatCard
                icon={FileSpreadsheet}
                label="Excel Download"
                value={db?.excelDownload ?? 0}
                iconBg="bg-violet-500"
              />
            </div>
          </div>

          {/* Job Post Credits */}
          <div className="bg-white rounded-2xl border border-purple-100 p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 bg-fuchsia-100 rounded-lg">
                <Briefcase size={15} className="text-fuchsia-600" />
              </div>
              <h2 className="text-xs font-bold text-fuchsia-600  ">
                Job Post Credits
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <StatCard
                icon={Star}
                label="Classic Job"
                value={job?.classicJobPost ?? 0}
                iconBg="bg-indigo-500"
              />
              <StatCard
                icon={Zap}
                label="Premium Job"
                value={job?.premiumJobPost ?? 0}
                iconBg="bg-purple-600"
              />
              <StatCard
                icon={Trophy}
                label="Super Premium"
                value={job?.superPremiumJobPost ?? 0}
                iconBg="bg-fuchsia-600"
              />
            </div>
          </div>

        </div>
      </div>

      {editOpen && <EditCreditModal onClose={() => setEditOpen(false)} />}
    </>
  );
};

export default CreditModel;