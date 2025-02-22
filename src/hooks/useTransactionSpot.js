import { useState } from "react";
import clientAxios from "../api/clientAxios";
import responseToast from "../util/response";
import Toast from "../ui/Toast/Toast";

const useTransactionSpot = (toast) => {
  const [listTransactionSpot, setListTransactionSpot] = useState([]);
  const [transactionSpotInfo, setTransactionSpotInfo] = useState({});
  const [transactionSpotLoading, setTransactionSpotLoading] = useState(false);
  const [listTransactionEmployee, setListTransactionEmployee] = useState([]);

  const [clientTransaction, setClientTransaction] = useState([]);

  const [clientTransaction_Confirmed, setClientTransaction_Confirmed] = useState([]);

  const [listUnconfirmed, setListUnconfirmed] = useState([]);


  const [statistic, setStatistic] = useState([]);

  const [listSendingHistory, setListSendingHistory] = useState([]);
  const [listSuccessHistory, setListSuccessHistory] = useState([]);
  const [listFailHistory, setListFailHistory] = useState([]);

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
      await clientAxios.delete(`/user/transaction_employee/` + id);
      getListTransactionEmployee(
        JSON.parse(sessionStorage.getItem("user")).workplace.workplace_id
      );
      setTransactionSpotLoading(false);
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
      await clientAxios.post(`/user/transaction_employee`, data);
      getListTransactionEmployee(JSON.parse(sessionStorage.getItem("user")).workplace.workplace_id);
      Toast.success("Đặt quản lý thành công", toast);
      setTransactionSpotLoading(false);
    } catch (err) {
      setTransactionSpotLoading(false);
      responseToast(err, toast);
    }
  };

  const sendToWarehouse = async (transaction_spot_id, transaction_id) => {
    try {
      setTransactionSpotLoading(true);
      await clientAxios.post(`/transaction_spot/send_to_warehouse`, {
        transaction_spot_id: transaction_spot_id, transaction_id: transaction_id
      });
      getFromClientTransaction(transaction_spot_id);
      Toast.success("Gửi thành công", toast);
    } catch (err) {
      setTransactionSpotLoading(false);
      responseToast(err, toast)
    }
  }

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

  const getFromClientTransaction = async (id) => {
    try {
      setTransactionSpotLoading(true);
      const response = await clientAxios.get(
        `/transaction_spot/get_from_client_transactions/` + id
      );
      setClientTransaction(response?.result);
      console.log(response?.result);
      setTransactionSpotLoading(false);
      return response?.result;
    } catch (err) {
      setTransactionSpotLoading(false);
      responseToast(err, toast);
    }
  };

  const getToClientTransaction = async (id) => {
    try {
      setTransactionSpotLoading(true);
      const response = await clientAxios.get(
        `/transaction_spot/get_to_client_transactions/` + id
      );
      setClientTransaction_Confirmed(response?.result);
      console.log(response?.result);
      setTransactionSpotLoading(false);
      return response?.result;
    } catch (err) {
      setTransactionSpotLoading(false);
      responseToast(err, toast);
    }
  };

  const getUnconfirmed = async (transaction_spot_id) => {
    try {
      setTransactionSpotLoading(true);
      const response = await clientAxios.get(
        `/transaction_spot/get_unconfirmed/` + transaction_spot_id
      );
      setListUnconfirmed(response?.result);
      console.log(response?.result);
      setTransactionSpotLoading(false);
      return response?.result;
    } catch (err) {
      setTransactionSpotLoading(false);
      responseToast(err, toast);
    }
  };

  const confirmTransaction = async (transaction_spot_id, transaction_id) => {
    try {
      setTransactionSpotLoading(true);
      await clientAxios.post(`/transaction_spot/confirm_transaction`, {
        transaction_spot_id: transaction_spot_id,
        transaction_id: transaction_id,
      });
      getUnconfirmed(transaction_spot_id);
      Toast.success("Xác nhận thành công", toast);
    } catch (err) {
      setTransactionSpotLoading(false);
      responseToast(err, toast);
    }
  }

  const confirmDelivery = async (transaction_spot_id, transaction_id, status) => {
    try {
      setTransactionSpotLoading(true);
      await clientAxios.post(`/transaction_spot/confirm_delivery`, {
        transaction_spot_id: transaction_spot_id,
        transaction_id: transaction_id,
        status: status,
      });
      getToClientTransaction(transaction_spot_id);
      Toast.success("Xác nhận thành công", toast);
    } catch (err) {
      setTransactionSpotLoading(false);
      responseToast(err, toast);
    }
  }

  const getStatistic = async (transaction_spot_id) => {
    try {
      setTransactionSpotLoading(true);
      const response = await clientAxios.get(
        `/transaction_spot/get_statistic/` + transaction_spot_id
      );
      setStatistic(response?.result);
      console.log(Object.values(response?.result.success_transactions));
      // merge array

      setTransactionSpotLoading(false);
      return response?.result;
    } catch (err) {
      setTransactionSpotLoading(false);
      responseToast(err, toast);
    }
  }

  const getSendingHistory = async (transaction_spot_id) => {
    try {
      setTransactionSpotLoading(true);
      const response = await clientAxios.get(
        `/transaction_spot/get_sending_history/` + transaction_spot_id
      );
      setListSendingHistory(response?.result);
      console.log(response?.result);
      setTransactionSpotLoading(false);
      return response?.result;
    } catch (err) {
      setTransactionSpotLoading(false);
      responseToast(err, toast);
    }
  }

  const getSuccessHistory = async (transaction_spot_id) => {
    try {
      setTransactionSpotLoading(true);
      const response = await clientAxios.get(
        `/transaction_spot/get_success_history/` + transaction_spot_id
      );
      setListSuccessHistory(response?.result);
      console.log(response?.result);
      setTransactionSpotLoading(false);
      return response?.result;
    } catch (err) {
      setTransactionSpotLoading(false);
      responseToast(err, toast);
    }
  }

  const getFailHistory = async (transaction_spot_id) => {
    try {
      setTransactionSpotLoading(true);
      const response = await clientAxios.get(
        `/transaction_spot/get_fail_history/` + transaction_spot_id
      );
      setListFailHistory(response?.result);
      console.log(response?.result);
      setTransactionSpotLoading(false);
      return response?.result;
    } catch (err) {
      setTransactionSpotLoading(false);
      responseToast(err, toast);
    }
  }

  return {
    transactionSpotInfo,
    clientTransaction,
    transactionSpotLoading,
    listTransactionEmployee,
    listTransactionSpot,
    listUnconfirmed,
    clientTransaction_Confirmed,
    statistic,
    listSendingHistory,
    listSuccessHistory,
    listFailHistory,
    getTransactionSpotInfo,
    setTransactionManager,
    deleteTransactionManager,
    getListTransactionSpot,
    getListTransactionEmployee,
    deleteTransactionEmployee,
    addTransactionEmployee,
    sendToWarehouse,
    setTransactionSpotLoading,
    createTransactionSpot,
    getFromClientTransaction,
    getToClientTransaction,
    getUnconfirmed,
    confirmTransaction,
    confirmDelivery,
    getStatistic,
    getSendingHistory,
    getSuccessHistory,
    getFailHistory,
  };
}

export default useTransactionSpot;
