import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import conf from "../../config";

const useDeleteHr = () => {
  const [deleting, setDeleting] = useState(false);

  const deleteHr = async (id, callback) => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Session expired. Please login again.");
      return;
    }

    setDeleting(true);

    try {
      const response = await axios({
        method: "DELETE",
        url: `${conf.apiBaseUrl}/api/admin/hr/delete/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const res = response.data;

      if (res?.success) {
        toast.success(res.message || "HR deleted successfully");
        if (callback) callback();
      } else {
        toast.error(res.message || "Failed to delete HR");
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Something went wrong while deleting";
      toast.error(errorMsg);
      console.error("Delete HR Error:", errorMsg);
    } finally {
      setDeleting(false);
    }
  };

  return { deleteHr, deleting };
};

export default useDeleteHr;