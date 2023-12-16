import axios from 'axios'
import Toast from '../ui/Toast/Toast'



const clientAxios = axios.create({
  baseURL: 'http://localhost:8000/api/',
  timeout: 10000,
  headers: {'X-Custom-Header': 'foobar'}
});

clientAxios.interceptors.request.use(
  (config) => {
    config.baseURL = 'http://localhost:8000/api/';
    config.timeout = 10000;
    config.headers = {
      'X-Custom-Header': 'foobar',
      'Content-Type': 'application/json',
      access_token: sessionStorage.getItem('access_token'),
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

clientAxios.interceptors.response.use(
  (response) => {
    return response?.data;
  },
  (error) => {
    throw error.response
  }
)

export default clientAxios;
