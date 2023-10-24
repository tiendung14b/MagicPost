import axios from 'axios'

const clientAxios = axios.create({
  baseURL: 'localhost:8080/api/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});

axios.interceptors.request.use(async (config) => {
  const accessToken = localStorage.getItem("accessToken");
  return {
    ...config,
    headers: {
      "Content-Type": "application/json",
      accessToken: `Bearer ${accessToken}`,
    },
  };
})

axios.interceptors.response.use(
  (response) => {
    return response?.data;
  },
  (error) => {
    if (!error.response) {
      return alert(error);
    }
    throw error.response;
  }
)

export default clientAxios;
