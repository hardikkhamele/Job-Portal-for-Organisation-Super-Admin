import { useState } from "react";
import { toast } from "react-toastify";
import conf from "../../config";

const useCreateHr = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createHr = async (formData) => {
    setLoading(true);
    setError(null);

    const token = localStorage.getItem("token");
    const data = new FormData();
    data.append("hrName", formData.hrName);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("designation", formData.designation);
    
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      const response = await fetch(`${conf.apiBaseUrl}/api/admin/hr/createhr`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Something went wrong");
      }

      toast.success("HR Created Successfully!");
      return result;
    } catch (err) {
      setError(err.message);
      toast.error(err.message || "Failed to create HR");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { createHr, loading, error };
};

export default useCreateHr;