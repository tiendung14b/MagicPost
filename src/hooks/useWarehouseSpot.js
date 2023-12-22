import { useState } from "react";
import clientAxios from "../api/clientAxios";
import responseToast from "../util/response";
import Toast from "../ui/Toast/Toast";

const useWarehouseSpot = (toast) => {
  const [listWarehouseSpot, setListWarehouseSpot] = useState([]);
  const [warehouseSpotInfo, setWarehouseSpotInfo] = useState({});
  const [warehouseSpotLoading, setWarehouseSpotLoading] = useState(false);

  const getWarehouseSpotInfo = async (id) => {
    try {
      const response = await clientAxios.get(`/warehouse/${id}`);
      setWarehouseSpotInfo(response?.result);
    } catch (err) {
      console.log(err);
      responseToast(err, toast);
    }
  };

  const getListWarehouseSpot = async () => {
    try {
      console.log("warehouse loading", warehouseSpotLoading);
      const response = await clientAxios.get("/warehouse/all");
      setWarehouseSpotLoading(false);
      setListWarehouseSpot(response?.result);
    } catch (err) {
      setWarehouseSpotLoading(false);
      console.log("Cant get list warehouse spot", err);
      responseToast(err, toast);
    }
  };

  const deleteWarehouseManager = async (id) => {
    try {
      setWarehouseSpotLoading(true);
      await clientAxios.delete(`/warehouse/manager/` + id);
      getListWarehouseSpot();
      Toast.success("Xóa thành công", toast);
    } catch (err) {
      setWarehouseSpotLoading(false);
      // responseToast(err, toast);
      Toast.error(err, toast);
      console.log(err);
    }
  };

  const setWarehouseManager = async (id, manager_id) => {
    try {
      console.log(id, manager_id);
      setWarehouseSpotLoading(true);
      await clientAxios.put(`/warehouse/manager/` + id, {
        manager_id,
      });
      getListWarehouseSpot();
      Toast.success("Đặt quản lý thành công", toast);
    } catch (err) {
      setWarehouseSpotLoading(false);
      // responseToast(err, toast);
      Toast.error(err, toast);
      console.log(err);
    }
  };

  return {
    listWarehouseSpot,
    warehouseSpotInfo,
    warehouseSpotLoading,
    getWarehouseSpotInfo,
    getListWarehouseSpot,
    deleteWarehouseManager,
    setWarehouseManager,
  };
};

export default useWarehouseSpot;
