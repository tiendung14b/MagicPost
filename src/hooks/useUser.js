import { useState } from "react";
import clientAxios from "../api/clientAxios";
import Toast from "../ui/Toast/Toast";
import { toast } from "react-toastify";

import React from "react";

const useUser = () => {
  const [listManager, setListManager] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [userloading, setUserLoading] = useState(true);

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
      setUserLoading(false)
      setListManager(response?.result)
    } catch(err) {
      console.log(err)
    }
  };

  const createManager = async (data) => {
    try {
      const response = await clientAxios.post('/user/manager', data)
      Toast.success("Thêm mới thành công", toast);
      getListManager()
    } catch(err) {
      console.log(err)
    }
  }

  return {
    userloading,
    listManager,
    getListManager,
    userInfo,
    getUserInfo,
    createManager
  };
};

export default useUser;
