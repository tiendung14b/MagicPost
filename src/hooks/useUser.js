import { useState } from "react";
import clientAxios from "../api/clientAxios";
import Toast from "../ui/Toast/Toast";
import { toast } from "react-toastify";

import React from "react";

const useUser = () => {
  const [listManager, setListManager] = useState([]);
  const [loading, setLoading] = useState(true);

  const getListManager = async () => {
    try {
      const response = await clientAxios.get('/user/get_list_manager')
      setLoading(false)
      setListManager(response.data?.result)
      console.log(response)
    } catch(err) {
      Toast.error(err, toast);
    }
  };

  return {
    loading,
    listManager,
    getListManager,
  };
};

export default useUser;
