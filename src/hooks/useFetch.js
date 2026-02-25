import axios from "axios";
import { useCallback } from "react";

function useFetch() {
  const fetchData = useCallback(async ({ method, url, data, params }) => {
    try {
      // Correct token key retrzieval
      const token = sessionStorage.getItem("token");
      const axiosConfig = {
        method,
        url,
        ...(data && { data }),
        ...(params && { params }),
        headers: {
          Authorization: `Bearer ${token}`,
          ...(data instanceof FormData && { 'Content-Type': 'multipart/form-data' }),
        },
      };

      const result = await axios(axiosConfig);
      return result.data;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(
        `Error fetching data from ${url}:`,
        error.message,
        error.stack
      );
      throw error; 
    }
  }, []);

  return [fetchData];
}

export default useFetch;