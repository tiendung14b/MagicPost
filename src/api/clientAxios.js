import axios from 'axios'
import Toast from '../ui/Toast/Toast'

const response = {
  UNAUTHORIZED: 401,
  INTERNAL_SERVER_ERROR: 500,
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  CONFLICT: 409,
  FORBIDDEN: 403,
  UNPROCESSABLE_ENTITY: 422
}

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
