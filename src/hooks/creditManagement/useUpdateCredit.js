import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify"; 
import conf from "../../config";
const useUpdateCredit = () => {
  const [updating, setUpdating] = useState(false);

  const updateCredit = async (id, creditValue, onSuccess) => {
    setUpdating(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${conf.apiBaseUrl}/api/admin/credit-management/updateCredit/${id}`,
        { credits: Number(creditValue) },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Credit updated successfully!");
        if (onSuccess) onSuccess();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update credit");
    } finally {
      setUpdating(false);
    }
  };

  return { updateCredit, updating };
};

export default useUpdateCredit;