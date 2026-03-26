import { useState, useCallback } from "react";
import axios from "axios";
import conf from "../../config";

const useGetEmployeeDetails = () => {
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState(null);

  const getDetails = useCallback(async (id) => {
    if (!id) return;
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const response = await axios({
        method: "GET",
        url: `${conf.apiBaseUrl}/api/admin/employer/getEmployer/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data?.success) {
        setDetails(response.data.data);
      }
    } catch (error) {
      console.error("Fetch Details Error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { getDetails, details, loading };
};

export default useGetEmployeeDetails;