import { useState } from "react";
import { toast } from "react-toastify";
import conf from "../../config";
import useFetch from "../useFetch";

const useAdminResetPassword = () => {
  const [fetchData] = useFetch();
  const [loading, setLoading] = useState(false);

  const resetAdminPassword = async (email, newPassword) => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "POST",
        url: `${conf.apiBaseUrl}auth/admin/reset-password`,
        data: { email, newPassword }, // sending as body
      });

      if (!res?.message) {
        toast.error("Password reset failed");
        return false;
      }

      toast.success(res.message || "Password reset successfully");
      return true;
    } catch (error) {
      console.error("Reset Password Error:", error);
      toast.error("Something went wrong");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { resetAdminPassword, loading };
};

export default useAdminResetPassword;