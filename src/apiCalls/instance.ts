import axios, { AxiosInstance, AxiosResponse } from "axios";
import { getToken, removeToken } from "../utils/tokenFuncs";

const instance:()=>AxiosInstance = () =>
  axios.create({
    baseURL: import.meta.env.BASE_URL,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(getToken()
        ? {
          Authorization: `Bearer ${getToken()}`,
        }
        : undefined),
    },
  });

instance().interceptors.response.use((res:AxiosResponse)=>{
    if(res.status==401) {
       removeToken();
       window.location.href="/";
    }
    return res.data;
})

export default instance;
