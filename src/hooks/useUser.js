import { useState } from "react";
import clientAxios from "../api/clientAxios";
import Toast from "../ui/Toast/Toast";
import { toast } from "react-toastify";

import React from "react";

const useUser = (toast) => {
  const [listManager, setListManager] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [deleteInfo, deleteUserInfo] = useState({})
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
      Toast.error("Lỗi hệ thống", toast);
    }
  };

  const createManager = async (data) => {
    try {
      const response = await clientAxios.post('/user/manager', data)
      Toast.success("Thêm mới thành công", toast);
      getListManager(response?.result)
    } catch(err) {
      console.log(err)
    }
  }

  const deleteUser = async () => {
    try {
      const response = await clientAxios.delete('/user/user', {data: deleteInfo})
      Toast.success("Xóa thành công", toast);
      getUserInfo(response?.result)
      deleteUserInfo(response?.result)
    } catch(err) {
      console.log(err)
    }
  }

  return {
    userloading,
    listManager,
    userInfo,
    deleteInfo,
    getListManager,
    getUserInfo,
    createManager,
    deleteUser,
  };
};

export default useUser;
