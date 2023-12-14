import { useState } from "react";
import clientAxios from "../api/clientAxios";
import Toast from "../ui/Toast/Toast";

import React from "react";

const useUser = () => {
  const [listManager, setListManager] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);

  const getUserInfo = async () => {
    try {
      const user = sessionStorage.getItem('user')
      const id = JSON.parse(user)?._id
      const response = await clientAxios.get(`/user/get_info/${id}`)
      setUserInfo(response?.result)
    } catch(err) {
      console.log(err)
    }
  }

  const getListManager = async () => {
    try {
      const response = await clientAxios.get('/user/get_list_manager')
      setLoading(false)
      setListManager(response?.result)
    } catch(err) {
      console.log(err)
    }
  };

  return {
    loading,
    listManager,
    getListManager,
    userInfo,
    getUserInfo
  };
};

export default useUser;
