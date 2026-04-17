import axios from "axios";

const resolvedBaseUrl =
  (import.meta.env.VITE_BASE_URL || "http://localhost:3000").replace(/\/+$/, "");

const api = axios.create({
  baseURL: resolvedBaseUrl,
});

export default api;
