import axios from 'axios'
import { toast } from 'react-toastify';

const clientAxios = axios.create({
  baseURL: 'http://localhost:8000/api/',
  timeout: 10000,
  headers: {'X-Custom-Header': 'foobar'}
});

axios.interceptors.request.use(async (config) => {
  try {
    const access_token = localStorage.getItem("access_token");
    return {
      ...config,
      headers: {
        "Content-Type": "application/json",
        access_token: `${access_token}`,
      },
    };
  } catch (error) {
    throw error;
  }
})

axios.interceptors.response.use(
  (response) => {
    return response?.data;
  },
  (error) => {
    toast.error(error.message);
  }
)

export default clientAxios;
