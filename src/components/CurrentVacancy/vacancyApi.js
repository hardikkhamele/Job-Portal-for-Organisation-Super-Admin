import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://new-job-portal-be.onrender.com";
const VACANCIES_URL = `${API_BASE_URL}/api/admin/vacancies`;

const getHeaders = () => {
  let token = localStorage.getItem("token") || localStorage.getItem("adminToken");
  if (!token) {
    const match = document.cookie.match(/(?:^|;)\s*(?:token|access_token)\s*=\s*([^;]+)/);
    if (match) token = match[1];
  }
  return token && token !== "null" ? { Authorization: `Bearer ${token}` } : {};
};

/**
 * 📊 Get Vacancy Dashboard Statistics API (Summary Cards)
 * Method: GET
 * Primary Endpoint: /api/admin/vacancies/stats
 * Aliases: /api/admin/vacancies/getStats, /api/admin/vacancies/statistics
 */
export const getVacancyStatsApi = async () => {
  const headers = getHeaders();
  const endpoints = [
    `${VACANCIES_URL}/stats`,
    `${VACANCIES_URL}/getStats`,
    `${VACANCIES_URL}/statistics`
  ];

  for (const url of endpoints) {
    try {
      const response = await axios.get(url, { headers });
      if (response.data && (response.data.success || response.data.data)) {
        return response.data.data || response.data;
      }
    } catch (err) {
      // try next alias endpoint
    }
  }
  return null;
};
