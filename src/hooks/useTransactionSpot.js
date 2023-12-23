import { useState } from "react";
import clientAxios from "../api/clientAxios";
import responseToast from "../util/response";
import Toast from "../ui/Toast/Toast";

const useTransactionSpot = (toast) => {
  const [listTransactionSpot, setListTransactionSpot] = useState([]);
  const [transactionSpotInfo, setTransactionSpotInfo] = useState({});
  const [transactionSpotLoading, setTransactionSpotLoading] = useState(false);
  const [listTransactionEmployee, setListTransactionEmployee] = useState([]);

  const getTransactionSpotInfo = async (id) => {
    try {
      const response = await clientAxios.get(
        `/transaction_spot/get_info/${id}`
      );
      setTransactionSpotInfo(response?.result);
    } catch (err) {
      console.log(err);
      responseToast(err, toast);
    }
  };

  const getListTransactionSpot = async () => {
    try {
      const response = await clientAxios.get("/transaction_spot/get_all");
      setTransactionSpotLoading(false);
      setListTransactionSpot(response?.result);
    } catch (err) {
      setTransactionSpotLoading(false);
      console.log("Cant get list transaction spot", err);
      responseToast(err, toast);
    }
  };

  const deleteTransactionManager = async (id) => {
    try {
      setTransactionSpotLoading(true);
      await clientAxios.delete(`/transaction_spot/remove_manager/` + id);
      getListTransactionSpot();
      Toast.success("Xóa thành công", toast);
    } catch (err) {
      setTransactionSpotLoading(false);
      // responseToast(err, toast);
      Toast.error(err, toast);
      console.log(err);
    }
  };

  const setTransactionManager = async (id, manager_id) => {
    try {
      setTransactionSpotLoading(true);
      await clientAxios.put(`/transaction_spot/set_manager/` + id, {
        manager_id,
      });
      getListTransactionSpot();
      Toast.success("Đặt quản lý thành công", toast);
    } catch (err) {
      setTransactionSpotLoading(false);
      responseToast(err, toast);
    }
  };

  const getListTransactionEmployee = async (transaction_spot_id) => {
    try {
      setTransactionSpotLoading(true);
      const response = await clientAxios.get(
        "/transaction_spot/get_all_employee/" + transaction_spot_id
      );
      setListTransactionEmployee(response?.result);
    } catch (err) {
      setTransactionSpotLoading(false);
      console.log(err);
      responseToast(err, toast);
    }
  };

  const deleteTransactionEmployee = async (id) => {
    try {
      const user = JSON.parse(sessionStorage.getItem("user"));
      if (user?.workplace?.role !== "TRANSACTION_MANAGER") {
        Toast.error("Bạn không có quyền xóa nhân viên", toast);
        return;
      }
      setTransactionSpotLoading(true);
      await clientAxios.delete(`/user/transaction_employee/` + id);
      Toast.success("Xóa thành công", toast);
    } catch (err) {
      setTransactionSpotLoading(false);
      responseToast(err, toast);
    }
  };

  const addTransactionEmployee = async (data) => {
    try {
      const user = JSON.parse(sessionStorage.getItem("user"));
      if (user?.workplace?.role !== "TRANSACTION_MANAGER") {
        Toast.error("Bạn không có quyền thêm nhân viên", toast);
        return;
      }
      setTransactionSpotLoading(true);
      await clientAxios.post(`/user/transaction_employee`, data);
      getListTransactionSpot();
      Toast.success("Đặt quản lý thành công", toast);
    } catch (err) {
      setTransactionSpotLoading(false);
      responseToast(err, toast);
    }
  };

  const sendToWarehouse = async (id) => {
    try {
      setTransactionSpotLoading(true);
      await clientAxios.post(`/transaction_spot/send_to_warehouse`, {
        transaction_spot_id: id,
      });
      getListTransactionSpot();
      Toast.success("Gửi thành công", toast);
    } catch (err) {
      setTransactionSpotLoading(false);
      responseToast(err, toast)
    }
  }

  const delivery = async (id) => {
    try {
      setTransactionSpotLoading(true);
      await clientAxios.post(`/transaction_spot/delivery`, {
        transaction_spot_id: id,
      });
      getListTransactionSpot();
      Toast.success("Giao thành công", toast);
    } catch (err) {
      setTransactionSpotLoading(false);
      responseToast(err, toast);
    }
  };

  const createTransactionSpot = async (data) => {
    try {
      setTransactionSpotLoading(true);
      await clientAxios.post(`/transaction_spot/`, data);
      getListTransactionSpot();
      Toast.success("Tạo thành công", toast);
      
    } catch (err) {
      setTransactionSpotLoading(false);
      responseToast(err, toast);
    }
  };

  const getUnconfirmedTransaction = async () => {
    try {
      setTransactionSpotLoading(true);
      const response = await clientAxios.get(
        `/transaction_spot/get_unconfirmed`
      );
      setTransactionSpotLoading(false);
      return response?.result;
    } catch (err) {
      setTransactionSpotLoading(false);
      responseToast(err, toast);
    }
  };

  const getFromClientTransaction = async (id) => {
    try {
      setTransactionSpotLoading(true);
      const response = await clientAxios.get(
        `/transaction_spot/get_from_client_transactions/` + id
      );
      setTransactionSpotLoading(false);
      return response?.result;
    } catch (err) {
      setTransactionSpotLoading(false);
      responseToast(err, toast);
    }
  };

  return {
    transactionSpotInfo,
    transactionSpotLoading,
    listTransactionSpot,
    getTransactionSpotInfo,
    setTransactionManager,
    deleteTransactionManager,
    getListTransactionSpot,
    listTransactionEmployee,
    getListTransactionEmployee,
    deleteTransactionEmployee,
    addTransactionEmployee,
    sendToWarehouse,
    delivery,
    createTransactionSpot,
    getUnconfirmedTransaction,
    getFromClientTransaction,
  };
}

export default useTransactionSpot;
