import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080", // Backend API port
  headers: {
    "Content-Type": "application/json",
  },
});

// Gán token vào header Authorization
export const setRestAuth = (token) => {
  if (token) {
    axiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
};

// Xoá token Authorization
export const deleteAuthorization = () => {
  delete axiosClient.defaults.headers.common.Authorization;
  delete axiosClient.defaults.headers.common["Authorization"];
};

// interceptors cho axiosClient (đúng đối tượng đang dùng)
axiosClient.interceptors.request.use(
  function (config) {
    // Gửi request đi
    return config;
  },
  function (error) {
    // Lỗi khi gửi request
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  function (response) {
    // Xử lý response trả về
    return response;
  },
  function (error) {
    // Xử lý lỗi từ response
    return Promise.reject(error);
  }
);

// Tạo axiosClient riêng cho các API public (không cần token)
export const axiosPublic = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

// interceptors cho axiosPublic
axiosPublic.interceptors.request.use(
  function (config) {
    // Không gửi Authorization header cho public APIs
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosPublic.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosClient;
