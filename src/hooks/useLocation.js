import React from "react";
import { useState } from "react";
import responseToast from "../util/response";
import Toast from "../ui/Toast/Toast";
import axios from "axios";

const useLocation = (toast) => {
  const [provinceData, setProvince] = useState([]);
  const [districtData, setDistrict] = useState([]);
  const [locationLoading, setLocationLoading] = useState(false);

  const getProvince = async () => {
    try {
      setLocationLoading(true);
      const response = await axios.get(
        "https://vapi.vnappmob.com/api/province/"
      );
      setProvince(response?.data.results);
      console.log("Province Data:", provinceData);
    } catch (error) {
      responseToast(toast, "error", "Lỗi", "Không thể lấy dữ liệu");
    } finally {
      setLocationLoading(false);
    }
  };

  const getDistrict = async (province_id) => {
    try {
      setLocationLoading(true);
      const response = await axios.get(
        `https://vapi.vnappmob.com/api/province/district/${province_id}`
      );
      setDistrict(response?.data.results);
      console.log("District Data:", districtData);
    } catch (error) {
      responseToast(toast, "error", "Lỗi", "Không thể lấy dữ liệu");
    } finally {
      setLocationLoading(false);
    }
  };

  return {
    provinceData,
    districtData,
    locationLoading,
    getProvince,
    getDistrict,
  };
};

export default useLocation;
