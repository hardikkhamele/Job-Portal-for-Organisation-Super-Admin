import { useState } from "react";

const useCreateHr = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const createHr = async (formData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    // Get token from localStorage
    const token = localStorage.getItem("token");

    // Prepare Multipart Form Data
    const data = new FormData();
    data.append("hrName", formData.hrName);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("designation", formData.designation);
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      const response = await fetch(
        "https://new-job-portal-be-2f6y.onrender.com/api/admin/hr/createhr",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: data,
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Something went wrong");
      }

      setSuccess(true);
      return result;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { createHr, loading, error, success };
};

export default useCreateHr;