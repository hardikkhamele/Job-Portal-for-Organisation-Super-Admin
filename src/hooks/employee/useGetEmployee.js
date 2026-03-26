import { useState, useCallback } from "react";
import axios from "axios";
import conf from "../../config";

const useGetEmployee = () => {
  const [loading, setLoading] = useState(false);
  const [employeeList, setEmployeeList] = useState([]);
  const [totalEmployees, setTotalEmployees] = useState(0);

  const getEmployees = useCallback(async (page = 1, search = "") => {
    setLoading(true);
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios({
        method: "GET",
        url: `${conf.apiBaseUrl}/api/admin/employer/getEmployers`,
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
        setEmployeeList(res.data || []);
        setTotalEmployees(res.total || 0);
      } else {
        setEmployeeList([]);
        setTotalEmployees(0);
      }
    } catch (error) {
      console.error("Fetch Employee Error:", error?.response?.data?.message || error.message);
      setEmployeeList([]);
      setTotalEmployees(0);
    } finally {
      setLoading(false);
    }
  }, []);

  return { getEmployees, employeeList, totalEmployees, loading };
};

export default useGetEmployee;