import _axios from "axios";

export const baseURL = "http://172.16.1.145:3000";

// const getToken = () => {
//   return AuthService.accessToken;
// };

const Axios = _axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Axios.interceptors.request.use((config) => {
//   const token = getToken();
//   if (config.headers) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

Axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    // if (error.response && error.response.status === 401) {
    //   AuthService.logout();
    // }

    return Promise.reject(error.response?.data);
  }
);

export default Axios;
