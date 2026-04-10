// api.ts
import axios from "axios";

const API_BASE_URL = process.env.EXPO_PUBLIC_CLERK_API_URL;

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// optional global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    let message = "Unknown error";
    if (error.response?.data?.message) message = error.response.data.message;
    else if (error.message) message = error.message;
    return Promise.reject(new Error(message));
  }
);