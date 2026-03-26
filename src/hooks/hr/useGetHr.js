import { useState, useCallback } from "react";
import axios from "axios";
import conf from "../../config";
const useGetHr = () => {
  const [loading, setLoading] = useState(false);
  const [hrList, setHrList] = useState([]);
  const [totalHr, setTotalHr] = useState(0);

  const getHrData = useCallback(async (page = 1, search = "") => {
    setLoading(true);
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found. Please login.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios({
        method: "GET",
        url: `${conf.apiBaseUrl}/api/admin/hr/gethr`,
        params: { 
          page, 
          limit: 10, 
          search: search.trim() 
        },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const res = response.data;

      if (res?.success) {
        // API response ke keys: res.data (array) aur res.total (number)
        setHrList(res.data || []);
        setTotalHr(res.total || 0);
      } else {
        setHrList([]);
        setTotalHr(0);
      }
    } catch (error) {
      console.error("Fetch HR Error:", error?.response?.data?.message || error.message);
      setHrList([]);
      setTotalHr(0);
    } finally {
      setLoading(false);
    }
  }, []);

  return { getHrData, hrList, totalHr, loading };
};

export default useGetHr;