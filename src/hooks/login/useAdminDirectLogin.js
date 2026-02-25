import { useState } from "react";
import { toast } from "react-toastify";
import conf from "../../config";
import useFetch from "../useFetch";
// import { useNavigate } from "react-router-dom";

const useAdminDirectLogin = () => {
  const [fetchData] = useFetch();
  const [loading, setLoading] = useState(false);
  // const navigate = useNavigate ();

  const loginAdmin = async (email, password) => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "POST",
        url: `${conf.apiBaseUrl}auth/admin/login`,
        data: { email, password },
      });

      console.log("FULL RESPONSE:", res);

      if (!res?.token) {
        toast.error(res?.message || "Invalid Credentials");
        return false;
      }

      // ✅ Save token only
      sessionStorage.setItem("token", res.token);
      toast.success(res?.message || "Login Successful");
      // navigate ("/dashboard")

      return true;
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("Invalid Credentials");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loginAdmin, loading };
};

export default useAdminDirectLogin; 