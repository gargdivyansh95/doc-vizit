import axios from 'axios';

const apiInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// apiInstance.interceptors.request.use(
//   (config) => {
//     if (config._serverToken) {
//       // If we manually pass token for this request, attach it
//       config.headers["Authorization"] = `Bearer ${config._serverToken}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

export default apiInstance;
