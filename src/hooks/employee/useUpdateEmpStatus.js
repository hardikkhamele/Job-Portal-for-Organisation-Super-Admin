import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify"; 
import conf from "../../config";

const useUpdateEmpStatus = () => {
  const [updating, setUpdating] = useState(false);

  const updateStatus = async (id, currentStatus, callback) => {
    setUpdating(true);
    const token = localStorage.getItem("token");

    try {
      const response = await axios({
        method: "PUT",
        url: `${conf.apiBaseUrl}/api/admin/employer/blockEmployer/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data?.success) {
        toast.success(response.data.message || "Status updated successfully");
        if (callback) callback(); // Details refresh karne ke liye callback
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Failed to update status";
      toast.error(errorMsg);
      console.error("Update Status Error:", error);
    } finally {
      setUpdating(false);
    }
  };

  return { updateStatus, updating };
};

export default useUpdateEmpStatus;