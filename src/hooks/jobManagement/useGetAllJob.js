import { useState, useCallback } from "react";
import axios from "axios";
import conf from "../../config";
const useGetAllJob = () => {
  const [jobList, setJobList] = useState([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getJobs = useCallback(async (page = 1, search = "") => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token"); // Localstorage se token liya
      const response = await axios.get(
        `${conf.apiBaseUrl}/api/admin/jobs/getAllJobs?page=${page}&limit=10&search=${search}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setJobList(response.data.data);
        setTotalJobs(response.data.totalJobs);
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  return { getJobs, jobList, totalJobs, loading, error };
};

export default useGetAllJob;