import _axios from "axios";
import { getUser, removeUser } from "../utils/tokenFuncs";

export const baseURL = "http://api.rating.hamyaransystem.com/";

const getToken = () => {
  return getUser()?.access_token;
};

const Axios = _axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

Axios.interceptors.request.use((config) => {
  const token = getToken();
  if (config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

Axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      removeUser();
      window.location.replace("/");
      return;
    }

    return Promise.reject(error.response?.data);
  }
);

export default Axios;
