import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
const STAFFING_URL = `${API_BASE_URL}/api/admin/staffing`;

const getHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const unwrapData = (response) => response.data?.data ?? response.data?.staffing ?? response.data;

export const getStaffingList = async (status) => {
  const response = await axios.get(STAFFING_URL, {
    headers: getHeaders(),
    params: status ? { status } : undefined
  });
  const data = unwrapData(response);
  return Array.isArray(data) ? data : data?.staffings || data?.items || [];
};

export const getStaffingStats = async () => {
  const response = await axios.get(`${STAFFING_URL}/stats`, { headers: getHeaders() });
  return unwrapData(response) || {};
};

export const createStaffing = async (payload) => {
  const response = await axios.post(`${STAFFING_URL}/create`, payload, { headers: getHeaders() });
  return unwrapData(response);
};

export const approveStaffing = async (id) => {
  const response = await axios.put(`${STAFFING_URL}/${id}/approve`, {}, { headers: getHeaders() });
  return unwrapData(response);
};

export const deleteStaffing = async (id) => {
  await axios.delete(`${STAFFING_URL}/${id}`, { headers: getHeaders() });
};
