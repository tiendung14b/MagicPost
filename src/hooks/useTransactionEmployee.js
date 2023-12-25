import { useState } from "react";
import clientAxios from "../api/clientAxios";
import responseToast from "../util/response";
import Toast from "../ui/Toast/Toast";

const useTransactionEmployee = (toast) => {
  const [transactionEmployeeLoading, setTransactionEmployeeLoading] =
    useState(false);
  const [listTransaction, setListTransaction] = useState([]);
  const [transactionInfo, setTransactionInfo] = useState({});

  const getListTransaction = async (transaction_spot_id) => {
    try {
      const response = await clientAxios.get(
        "/transaction_employee/get_from_client_transactions/" +
          transaction_spot_id
      );
      setTransactionEmployeeLoading(false);
      setListTransaction(response?.result);
    } catch (err) {
      setTransactionEmployeeLoading(false);
      console.log("Không lấy được thông tin đơn hàng", err);
      responseToast(err, toast);
    }
  };

  const getTransactionInfo = async (id) => {
    try {
      const response = await clientAxios.get(
        `/transaction_employee/get_info/${id}`
      );
      setTransactionInfo(response?.result);
    } catch (err) {
      console.log(err);
      responseToast(err, toast);
    }
  };

  const createTransaction = async (data) => {
    try {
      setTransactionEmployeeLoading(true);
      await clientAxios.post(`/transaction_employee/`, data);
      getListTransaction();
      Toast.success("Tạo giao dịch thành công", toast);
    } catch (err) {
      setTransactionEmployeeLoading(false);
      responseToast(err, toast);
      console.log(err);
    }
  };

  const sendToWarehouse = async () => {
    try {
      setTransactionEmployeeLoading(true);
      await clientAxios.post(`/transaction_employee/send_to_warehouse`);
      getListTransaction();
      Toast.success("Gửi thành công", toast);
    } catch (err) {
      setTransactionEmployeeLoading(false);
      responseToast(err, toast);
      console.log(err);
    }
  };

  const confirmTransaction = async () => {
    try {
      setTransactionEmployeeLoading(true);
      await clientAxios.post(`/transaction_employee/confirm_transaction`);
      getListTransaction();
      Toast.success("Xác nhận thành công", toast);
    } catch (err) {
      setTransactionEmployeeLoading(false);
      responseToast(err, toast);
      console.log(err);
    }
  };

  const confirmDelivery = async () => {
    try {
      setTransactionEmployeeLoading(true);
      await clientAxios.post(`/transaction_employee/confirm_delivery`);
      getListTransaction();
      Toast.success("Xác nhận thành công", toast);
    } catch (err) {
      setTransactionEmployeeLoading(false);
      responseToast(err, toast);
      console.log(err);
    }
  };

  return {
    listTransaction,
    transactionInfo,
    transactionEmployeeLoading,
    getListTransaction,
    getTransactionInfo,
    createTransaction,
    sendToWarehouse,
    confirmTransaction,
    confirmDelivery,
  };
};

export default useTransactionEmployee;
