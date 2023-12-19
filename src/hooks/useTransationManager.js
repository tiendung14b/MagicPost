import { useState } from "react";
import clientAxios from "../api/clientAxios";
import responseToast from "../util/response";
import Toast from "../ui/Toast/Toast";

const useTransactionManager = () => {
  const [listTransactionManager, setListTransactionManager] = useState([]);

  const getListTransactionManager = async () => {
    try {
      const response = await clientAxios.get("");
      setListTransactionManager(response?.result);
    } catch (err) {
      responseToast(err, toast);
    }
  };

  return {
    listTransactionManager,
    getListTransactionManager,
  };
};

export default useTransactionManager;
