/* eslint-disable */

import axios from "axios";
import { toast } from "react-toastify";
import authService from "../app/features/auth/auth.service";

const user = JSON.parse(localStorage.getItem("user"));

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};
if (user) headers.Authorization = `Bearer ${user?.token}`;

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      authService.logout();
      window.location.href = "/";
      toast.error("Login Again");
    }
    let errorMessage = error?.response?.data;

    if (!errorMessage?.message) {
      errorMessage =
        error?.response?.data?.message || error?.message || error?.toString();
    }

    const errors = {
      errors: error?.response?.data?.errors,
      errorMessage,
    };

    // toast.error(errorMessage);

    throw errors;
  }
);

export default api;
