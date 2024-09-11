import { API_URL } from "../config";
import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: process.env.API_URL,
  baseURL: API_URL,
  withCredentials: true,
});


const setupAxiosInterceptors = (toastrRef) => {
  axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error("API call failed. Error: ", error);
      if (toastrRef && toastrRef.current) {
        toastrRef.current.notify("Что-то пошло не так...", "error");
      } else {
        console.log("toastrRef BROKEN!!!!!!", toastrRef);
      }
      return new Promise(() => {});
    }
  );
};

export { axiosInstance, setupAxiosInterceptors };


// authentication
export const postLogin = async (email, password) => {
  const response = await axiosInstance.post(`/auth/login`, {
    email,
    password,
  });
  return response.data;
};


// ligament coll


// ligament


// subscription
export const getSubscription = async () => {
  const response = await axiosInstance.get(`/subscription`);
  return response.data;
}
