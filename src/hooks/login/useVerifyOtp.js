import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { toast } from "react-toastify";
import conf from "../../config";
import useFetch from "../useFetch";
import { adminAuthState } from "../../state/auth/authenticatedState";
import { useNavigate } from "react-router-dom";

const useVerifyOtp = () => {
  const [fetchData] = useFetch();
  const [loading, setLoading] = useState(false);
  const setAuth = useSetRecoilState(adminAuthState);
 const navigate = useNavigate ();
  const verifyOtp = async (email, otp) => {
    setLoading(true);

    try {
      const res = await fetchData({
        method: "POST",
        url: `${conf.apiBaseUrl}auth/admin/verify-otp`,
        data: { email, otp },
        headers: {
          "Content-Type": "application/json",
          // If backend requires token:
          // token: sessionStorage.getItem("token"),
        },
      });

      if (res) {
        toast.success(res?.message || "OTP Verified Successfully");

        // Save token if returned
        // if (res?.data?.token) {
        //   sessionStorage.setItem("token", res.data.token);
        // }

        // setAuth({ isAuthenticated: true });
        navigate("/reset-password")
        setLoading(false);
        return true;
      }
    } catch (error) {
      console.error("Verify OTP Error:", error);
      toast.error(
        error?.response?.data?.message || "Invalid OTP"
      );
      setLoading(false);
      return false;
    }
  };

  return {
    verifyOtp,
    loading,
  };
};

export default useVerifyOtp;