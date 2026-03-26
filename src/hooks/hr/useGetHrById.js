import { useState, useCallback } from "react";
import conf from "../../config";

const useGetHrById = () => {
  const [loading, setLoading] = useState(false);
  const [hrDetails, setHrDetails] = useState(null);
  const [dailySummary, setDailySummary] = useState([]);

  const getHrById = useCallback(async (id) => {
    if (!id) return;
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${conf.apiBaseUrl}/api/admin/hr/gethr/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (result.success) {
        setHrDetails(result.data.hr);
        setDailySummary(result.data.dailySummary || []);
      }
    } catch (err) {
      console.error("Error fetching HR details:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { getHrById, hrDetails, dailySummary, loading };
};

export default useGetHrById;