import { useState } from "react";
import clientAxios from "../api/clientAxios";
import Toast from "../ui/Toast/Toast";
import { toast } from "react-toastify";

import React from "react";

const useUser = (toast) => {
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
      console.log(userloading);
      const response = await clientAxios.get('/user/get_list_manager')
      setUserLoading(false)
      setListManager(response?.result)
    } catch(err) {
      Toast.error("Lỗi hệ thống", toast);
    }
  };

  const createManager = async (data) => {
    try {
      setUserLoading(true)
      await clientAxios.post('/user/create_manager', data)
      getListManager();
      Toast.success("Thêm mới thành công", toast);
    } catch(err) {
      console.log(err)
    }
  }

  const deleteUser = async (id) => {
    try {
      setUserLoading(true)
      await clientAxios.delete('/user/' + id)
      getListManager()
      Toast.success("Xóa thành công", toast);
    } catch(err) {
      Toast.error(err.message, toast);
    }
  }

  return {
    userloading,
    listManager,
    userInfo,
    getListManager,
    getUserInfo,
    createManager,
    deleteUser,
  };
};

export default useUser;
