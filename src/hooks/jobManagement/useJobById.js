import { useState, useCallback } from "react";
import axios from "axios";
import conf from "../../config";
const useJobById = () => {
  const [jobDetail, setJobDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getJobById = useCallback(async (id) => {
    if (!id) return;
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${conf.apiBaseUrl}/api/admin/employer/getJobById/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setJobDetail(response.data.data);
      }
    } catch (err) {
      setError(err.message || "Failed to fetch job details");
    } finally {
      setLoading(false);
    }
  }, []);

  return { getJobById, jobDetail, loading, error };
};

export default useJobById;