import { useState, useEffect } from "react";
import axios from "axios";
import conf from "../../config";
const useGetCredit = () => {
  const [credits, setCredits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCredits = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${conf.apiBaseUrl}/api/admin/credit-management/GetallCredit`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        setCredits(response.data.data);
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCredits();
  }, []);

  return { credits, loading, error, refetch: fetchCredits };
};

export default useGetCredit;