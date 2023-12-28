import { useState } from "react";
import clientAxios from "../api/clientAxios";
import responseToast from "../util/response";
import Toast from "../ui/Toast/Toast";

const useWarehouse = (toast) => {
  const [listWarehouse, setListWarehouse] = useState([]);
  const [warehouseInfo, setWarehouseInfo] = useState({});
  const [warehouseLoading, setWarehouseLoading] = useState(false);
  const [listWarehouseEmployee, setListWarehouseEmployee] = useState([]);

  const [listUnconfirmedTransactionfromTransactionSpot, setListUnconfirmedTransactionfromTransactionSpot] = useState([]);
  const [listUnconfirmedTransactionfromWarehouse, setListUnconfirmedTransactionfromWarehouse] = useState([]);

  const [listInWarehouseTransactionToTransactionSpot, setListInWarehouseTransactionToTransactionSpot] = useState([]);
  const [listInWarehouseTransactionToWarehouse, setListInWarehouseTransactionToWarehouse] = useState([]);

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

  const createWarehouse = async (data) => {
    try {
      setWarehouseLoading(true);
      await clientAxios.post("/warehouse/", data);
      getListWarehouse();
      Toast.success("Thêm mới thành công", toast);
    } catch (err) {
      setWarehouseLoading(false);
      responseToast(err, toast);
    }
  }

  const receiveTransactionFromWarehouse = async (transaction_id) => {
    try {
      setWarehouseLoading(true);
      await clientAxios.put(`/warehouse/transaction_from_warehouse/` + transaction_id);
      
      Toast.success("Xác nhận đơn hàng thành công", toast);
    } catch (err) {
      setWarehouseLoading(false);
      responseToast(err, toast);
    }
  }

  const receiveTransactionFromTransactionSpot = async (transaction_id) => {
    try {
      setWarehouseLoading(true);
      await clientAxios.put(`/warehouse/transaction_from_transaction_spot/` + transaction_id);
      
      Toast.success("Nhận thành công", toast);
    } catch (err) {
      setWarehouseLoading(false);
      responseToast(err, toast);
    }
  }

  const sendTransactionToWarehouse = async (transaction_id) => {
    try {
      setWarehouseLoading(true);
      await clientAxios.put(`/warehouse/transaction_to_warehouse/` + transaction_id);
      
      Toast.success("Gửi thành công", toast);
    } catch (err) {
      setWarehouseLoading(false);
      responseToast(err, toast);
    }
  }

  const sendTransactionToTransactionSpot = async (transaction_id) => {
    try {
      setWarehouseLoading(true);
      await clientAxios.put(`/warehouse/transaction_to_transaction_spot/` + transaction_id);
      
      Toast.success("Gửi thành công", toast);
    } catch (err) {
      setWarehouseLoading(false);
      responseToast(err, toast);
    }
  }

  const getListWarehouseEmployee = async (warehouse_id) => {
    try {
      const response = await clientAxios.get(`/warehouse/employee_warehouse/` + warehouse_id);
      setListWarehouseEmployee(response?.result);
    } catch (err) {
      console.log(err);
      responseToast(err, toast);
    }
  }

  const addWarehouseEmployee = async (data) => {
    try {
      const user = JSON.parse(sessionStorage.getItem("user"));
      if (user?.workplace?.role !== "WAREHOUSE_MANAGER") {
        Toast.error("Bạn không có quyền thêm nhân viên", toast);
        return;
      }
      await clientAxios.post(`/user/warehouse_employee`, data);
      getListWarehouseEmployee(
        JSON.parse(sessionStorage.getItem("user")).workplace.workplace_id
      );
      Toast.success("Thêm thành công", toast);
      setWarehouseLoading(false);
    } catch (err) {
      setWarehouseLoading(false);
      responseToast(err, toast);
    }
  } 

  const deleteWarehouseEmployee = async (id) => {
    try {
      const user = JSON.parse(sessionStorage.getItem("user"));
      if (user?.workplace?.role !== "WAREHOUSE_MANAGER") {
        Toast.error("Bạn không có quyền xóa nhân viên", toast);
        return;
      }
      await clientAxios.delete(`/user/warehouse_employee/` + id);
      getListWarehouseEmployee(
        JSON.parse(sessionStorage.getItem("user")).workplace.workplace_id
      );
      setWarehouseLoading(false);
      Toast.success("Xóa thành công", toast);
    } catch (err) {
      setWarehouseLoading(false);
      responseToast(err, toast);
    }
  }

  const getListUnconfirmedTransactionfromTransactionSpot = async (warehouse_id) => {
    try {
      setWarehouseLoading(true);
      const response = await clientAxios.get(
        `/warehouse/unconfirm_transactions_from_transaction_spot/` +
          warehouse_id
      );
      setListUnconfirmedTransactionfromTransactionSpot(response?.result);
      console.log(response?.result);
      setWarehouseLoading(false);
    } catch (err) {
      console.log(err);
      responseToast(err, toast);
    }
  }

  const getListUnconfirmedTransactionfromWarehouse = async (warehouse_id) => {
    try {
      setWarehouseLoading(true);
      const response = await clientAxios.get(
        `/warehouse/unconfirm_transactions_from_warehouse/` +
          warehouse_id
      );
      setListUnconfirmedTransactionfromWarehouse(response?.result);
      console.log(response?.result);
      setWarehouseLoading(false);
    } catch (err) {
      console.log(err);
      responseToast(err, toast);
    }
  }

  const getListInWarehouseTransactionToTransactionSpot = async (warehouse_id) => {
    try {
      setWarehouseLoading(true);
      const response = await clientAxios.get(
        `/warehouse/inwarehouse_transactions_to_transaction_spot/` +
          warehouse_id
      );
      setListInWarehouseTransactionToTransactionSpot(response?.result);
      console.log(response?.result);
      setWarehouseLoading(false);
    } catch (err) {
      console.log(err);
      responseToast(err, toast);
    }
  }

  const getListInWarehouseTransactionToWarehouse = async (warehouse_id) => {
    try {
      setWarehouseLoading(true);
      const response = await clientAxios.get(
        `/warehouse/inwarehouse_transactions_to_warehouse/` +
          warehouse_id
      );
      setListInWarehouseTransactionToWarehouse(response?.result);
      console.log(response?.result);
      setWarehouseLoading(false);
    } catch (err) {
      console.log(err);
      responseToast(err, toast);
    }
  }


  return {
    listWarehouse,
    warehouseInfo,
    warehouseLoading,
    listWarehouseEmployee,
    listUnconfirmedTransactionfromTransactionSpot,
    listUnconfirmedTransactionfromWarehouse,
    listInWarehouseTransactionToTransactionSpot,
    listInWarehouseTransactionToWarehouse,
    getWarehouseInfo,
    createWarehouse,
    getListWarehouse,
    deleteWarehouseManager,
    setWarehouseManager,
    getListWarehouseEmployee,
    addWarehouseEmployee,
    deleteWarehouseEmployee,
    setWarehouseLoading,
    receiveTransactionFromWarehouse,
    receiveTransactionFromTransactionSpot,
    sendTransactionToWarehouse,
    sendTransactionToTransactionSpot,
    getListUnconfirmedTransactionfromTransactionSpot,
    getListUnconfirmedTransactionfromWarehouse,
    getListInWarehouseTransactionToTransactionSpot,
    getListInWarehouseTransactionToWarehouse,
  };
};

export default useWarehouse;
