import { useLocalStorage } from "@/hooks/useStorage";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4000",
});
instance.defaults.withCredentials = true;
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("user");
    if (token) {
      if(Object.keys(JSON.parse(token)).length>0){
        if(config.url==="/auth/refeshtoken"){
          config.headers.Authorization = `Bearer ${JSON.parse(token).refeshToken}`;
        }else{

          config.headers.Authorization = `Bearer ${JSON.parse(token).token}`;
        }
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
instance.interceptors.response.use((response) => {

  const { data } = response;
  return data;
});

export default instance;
