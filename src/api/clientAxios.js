import axios from 'axios'
import { toast } from 'react-toastify';

const clientAxios = axios.create({
  baseURL: 'http://localhost:8000/api/',
  timeout: 10000,
  headers: {'X-Custom-Header': 'foobar'}
});
clientAxios.defaults.headers.common["access_token"] =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTZkNTgyYzg4M2ZmMWZiZGYxZGVlNGUiLCJ3b3JrcGxhY2UiOnsicm9sZSI6IkRJUkVDVE9SIiwiX2lkIjoiNjU2ZDU4MmM4ODNmZjFmYmRmMWRlZTRmIn0sImlhdCI6MTcwMjQ4Nzc3MiwiZXhwIjoxNzAyNTc0MTcyfQ.dgcSV6iZnBsCastQI5E9RXjSh3vk7QzmOf1RzWMumaM";

axios.interceptors.request.use(async (config) => {
  try {
    const access_token = sessionStorage.getItem("access_token");
    // const access_token =
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTZkNTgyYzg4M2ZmMWZiZGYxZGVlNGUiLCJ3b3JrcGxhY2UiOnsicm9sZSI6IkRJUkVDVE9SIiwiX2lkIjoiNjU2ZDU4MmM4ODNmZjFmYmRmMWRlZTRmIn0sImlhdCI6MTcwMjQ4Nzc3MiwiZXhwIjoxNzAyNTc0MTcyfQ.dgcSV6iZnBsCastQI5E9RXjSh3vk7QzmOf1RzWMumaM";
    console.log(access_token)
    return {
      ...config,
      headers: {
        "Content-Type": "application/json",
        // "access_token": `${access_token}`,
        
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
