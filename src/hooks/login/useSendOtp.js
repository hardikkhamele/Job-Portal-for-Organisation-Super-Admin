import { useState } from "react";
import { toast } from "react-toastify";
import conf from "../../config";
import useFetch from "../useFetch";

const useSendOtp = () => {
  const [fetchData] = useFetch();
  const [loading, setLoading] = useState(false);

  const sendOtp = async (email) => {
    setLoading(true);

    try {
      const res = await fetchData({
        method: "POST",
        url: `${conf.apiBaseUrl}auth/admin/send-otp`,
        data: { email },
        headers: {
          "Content-Type": "application/json",
          // If token required:
          // token: sessionStorage.getItem("token"),
        },
      });

      if (res) {
  toast.success(
    `${res?.message || "OTP Sent Successfully"} 
OTP: ${res?.otp || ""}`
  );
        setLoading(false);
        return true;
      }
    } catch (error) {
      console.error("Send OTP Error:", error);
      toast.error(
        error?.response?.data?.message || "Failed to send OTP"
      );
      setLoading(false);
      return false;
    }
  };

  return {
    sendOtp,
    loading,
  };
};

export default useSendOtp;