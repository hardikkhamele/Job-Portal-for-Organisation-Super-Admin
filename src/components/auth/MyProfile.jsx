import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminProfile } from "../../redux/slice/auth/adminProfileSlice";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  Shield,
  Building2,
  Calendar,
  ArrowLeft,
  Loader2,
  AlertCircle,
} from "lucide-react";

function MyProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Try fetching the admin profile from API
  const { profile, loading, error } = useSelector((state) => state.adminProfile);
  // Fallback: get admin data from login state (available right after login)
  const loginAdmin = useSelector((state) => state.login.admin);

  // Decode the JWT token to get basic info when no API data
  const getTokenData = () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return null;
      const payload = token.split(".")[1];
      const decoded = JSON.parse(atob(payload));
      return decoded;
    } catch {
      return null;
    }
  };

  const tokenData = getTokenData();

  // Resolve admin info from best available source
  const adminData = profile?.admin || profile?.data || profile || loginAdmin || tokenData;

  useEffect(() => {
    dispatch(fetchAdminProfile());
  }, [dispatch]);

  const InfoCard = ({ icon: Icon, label, value, iconColor = "text-purple-600" }) => (
    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-purple-200 hover:bg-purple-50/30 transition-all duration-200">
      <div className={`w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm border border-gray-100 ${iconColor}`}>
        <Icon size={20} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-0.5">{label}</p>
        <p className="text-gray-800 font-semibold truncate">
          {value || <span className="text-gray-400 font-normal italic">Not available</span>}
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 flex items-center justify-center rounded-xl bg-white border border-gray-200 hover:bg-purple-50 hover:border-purple-300 transition-all duration-200 shadow-sm"
        >
          <ArrowLeft size={18} className="text-gray-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
          <p className="text-sm text-gray-500">Super Admin Account Details</p>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <Loader2 className="w-10 h-10 text-purple-600 animate-spin mx-auto mb-3" />
            <p className="text-gray-500 text-sm">Loading profile...</p>
          </div>
        </div>
      )}

      {/* Error notice (non-blocking - still show available data) */}
      {error && !loading && (
        <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-xl mb-6 text-amber-700 text-sm">
          <AlertCircle size={16} className="shrink-0" />
          <span>Could not load full profile from server. Showing available data.</span>
        </div>
      )}

      {/* Profile Card */}
      {!loading && (
        <div className="max-w-2xl mx-auto">
          {/* Avatar Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
            {/* Banner */}
            <div className="h-28 bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 relative">
              <div className="absolute inset-0 opacity-20"
                style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 50%, white 1px, transparent 1px)", backgroundSize: "30px 30px" }}
              />
            </div>

            {/* Avatar + Name */}
            <div className="px-6 pb-6">
              <div className="flex items-end gap-4 -mt-12 mb-4">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 border-4 border-white shadow-lg flex items-center justify-center text-white text-3xl font-bold relative z-10">
                  {(adminData?.name || adminData?.email || "SA")
                    .charAt(0)
                    .toUpperCase()}
                </div>
                <div className="pb-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                    <Shield size={12} />
                    Super Admin
                  </div>
                </div>
              </div>

              <h2 className="text-xl font-bold text-gray-800 mb-0.5">
                {adminData?.name || adminData?.adminName || adminData?.fullName || "Super Admin"}
              </h2>
              <p className="text-gray-500 text-sm">
                {adminData?.email || "—"}
              </p>
            </div>
          </div>

          {/* Info Grid */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-base font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <User size={16} className="text-purple-600" />
              Account Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <InfoCard
                icon={User}
                label="Full Name"
                value={adminData?.name || adminData?.adminName || adminData?.fullName}
              />
              <InfoCard
                icon={Mail}
                label="Email Address"
                value={adminData?.email}
                iconColor="text-blue-600"
              />
              <InfoCard
                icon={Phone}
                label="Phone Number"
                value={adminData?.phone || adminData?.mobile || adminData?.phoneNumber}
                iconColor="text-green-600"
              />
              <InfoCard
                icon={Shield}
                label="Role"
                value={adminData?.role || "Super Admin"}
                iconColor="text-purple-600"
              />
              <InfoCard
                icon={Building2}
                label="Organization"
                value={adminData?.organization || adminData?.company || "TechnoHire"}
                iconColor="text-orange-500"
              />
              <InfoCard
                icon={Calendar}
                label="Member Since"
                value={
                  adminData?.createdAt
                    ? new Date(adminData.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    : null
                }
                iconColor="text-teal-600"
              />
            </div>
          </div>

          {/* Token Info (fallback - only when no API data) */}
          {!adminData && (
            <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <p className="text-gray-500 text-center text-sm py-4">
                No profile data available. Please check your API connection.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default MyProfile;
