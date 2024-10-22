import axios from 'axios'

import { getToken } from "./services/auth";

axios.defaults.baseURL = 'http://localhost:3000/'

axios.defaults.headers.post["Content-Type"] = "application/json"

axios.interceptors.request.use(async config => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

axios.defaults.timeout = 10000

export default axios;