// import axios from "axios"
// import toast from "react-hot-toast"


// const Api=axios.create({
//     baseURL:import.meta.env.VITE_BASEURL
// })



// if (localStorage.getItem("token")) {
//     Api.interceptors.request.use((request) => {
//         request.headers.Authorization = localStorage.getItem("token")
//         return request
//     })
// }

// Api.interceptors.response.use(response => response, err => {
//     if(err.response && err.response.status === 500){
//         toast.error("internal server error")
//     }
//     return Promise.reject(err)
// })

// export default Api

import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASEURL,
});


api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refresh");
    if (accessToken) {
      config.headers.Authorization = accessToken;
    }
    if (refreshToken) {
      config.headers["X-Refresh-Token"] = refreshToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// axios interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if(error?.response?.data?.newAccessToken){
      const newAccessToken=error?.response?.data?.newAccessToken
      localStorage.setItem("token", newAccessToken);
    }
    const navigate = useNavigate();

    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('refresh');
      navigate('/');
    }
    if (error.response && error.response.status === 500) {
      toast.error("Internal server error");
    }
    return Promise.reject(error);
  }
);

export default api;
