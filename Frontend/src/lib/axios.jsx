// src/lib/axios.js
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/v1", // Adjust as needed
  withCredentials: true, // 👈 Must be true to send cookies!
});
