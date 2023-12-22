import { useState } from "react";
import clientAxios from "../api/clientAxios";
import responseToast from "../util/response";
import Toast from "../ui/Toast/Toast";

const useWarehouse = (toast) => {
  const [listWarehouse, setListWarehouse] = useState([]);
  const [warehouseInfo, setWarehouseInfo] = useState({});
  const [warehouseLoading, setWarehouseLoading] = useState(false);

  const getWarehouseInfo = async (id) => {
    try {
      const response = await clientAxios.get(`/warehouse/${id}`);
      setWarehouseInfo(response?.result);
    } catch (err) {
      console.log(err);
      responseToast(err, toast);
    }
  };

  const getListWarehouse = async () => {
    try {
      console.log("warehouse loading", warehouseLoading);
      const response = await clientAxios.get("/warehouse/all");
      setWarehouseLoading(false);
      setListWarehouse(response?.result);
    } catch (err) {
      setWarehouseLoading(false);
      console.log("Cant get list warehouse ", err);
      responseToast(err, toast);
    }
  };

  const deleteWarehouseManager = async (id) => {
    try {
      setWarehouseLoading(true);
      await clientAxios.delete(`/warehouse/manager/` + id);
      getListWarehouse();
      Toast.success("Xóa thành công", toast);
    } catch (err) {
      setWarehouseLoading(false);
      // responseToast(err, toast);
      Toast.error(err, toast);
      console.log(err);
    }
  };

  const setWarehouseManager = async (id, manager_id) => {
    try {
      console.log(id, manager_id);
      setWarehouseLoading(true);
      await clientAxios.put(`/warehouse/manager/` + id, {
        manager_id,
      });
      getListWarehouse();
      Toast.success("Đặt quản lý thành công", toast);
    } catch (err) {
      setWarehouseLoading(false);
      // responseToast(err, toast);
      Toast.error(err, toast);
      console.log(err);
    }
  };

  return {
    listWarehouse,
    warehouseInfo,
    warehouseLoading,
    getWarehouseInfo,
    getListWarehouse,
    deleteWarehouseManager,
    setWarehouseManager,
  };
};

export default useWarehouse;
