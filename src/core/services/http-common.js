import axios from "axios";

const httpCommon = axios.create({
  baseURL: "http://localhost:5120/api/v1",
  headers: { "Content-type": "application/json" },
});

httpCommon.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    const { url } = config;
    if (url !== "/users/sign-in" && url !== "/users/sign-up" && token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default httpCommon;
