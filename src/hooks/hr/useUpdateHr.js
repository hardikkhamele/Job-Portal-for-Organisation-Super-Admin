import { useState } from "react";
import { toast } from "react-toastify";
import conf from "../../config";

const useUpdateHr = () => {
  const [loading, setLoading] = useState(false);

  const updateHr = async (id, formData) => {
    setLoading(true);
    const token = localStorage.getItem("token");

    const data = new FormData();
    data.append("hrName", formData.name);
    data.append("designation", formData.designation);
    data.append("email", formData.email);
    if (formData.password) {
      data.append("password", formData.password);
    }
    if (formData.image && typeof formData.image !== "string") {
      data.append("image", formData.image);
    }

    try {
      const response = await fetch(`${conf.apiBaseUrl}/api/admin/hr/updatehr/${id}`, {
        method: "PUT", // API PUT method use karti hai update ke liye
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to update HR");
      }

      toast.success("HR Updated Successfully!");
      return result;
    } catch (err) {
      toast.error(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { updateHr, loading };
};

export default useUpdateHr;