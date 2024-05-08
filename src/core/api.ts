import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000",
});
instance.defaults.withCredentials = true;

instance.interceptors.response.use((response) => {
  const { data } = response;
  return data;
});

export default instance;
