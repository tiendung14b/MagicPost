import { useState } from "react";
import clientAxios from "../api/clientAxios";
import Toast from "../ui/Toast/Toast";
import responseToast from "../util/response";

const useUser = (toast) => {
  const [listManager, setListManager] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [userloading, setUserLoading] = useState(false);

  const getUserInfo = async () => {
    try {
      const user = sessionStorage.getItem('user')
      const id = JSON.parse(user)?._id
      const response = await clientAxios.get(`/user/get_info/${id}`)
      setUserInfo(response?.result)
    } catch(err) {
      responseToast(err, toast)
    }
  }

  const getListManager = async () => {
    try {
      console.log(userloading);
      const response = await clientAxios.get('/user/get_list_manager')
      setUserLoading(false)
      setListManager(response?.result)
    } catch(err) {
      setUserLoading(false)
      responseToast(err, toast)
    }
  };

  const createManager = async (data) => {
    try {
      setUserLoading(true)
      await clientAxios.post('/user/create_manager', data)
      getListManager();
      Toast.success("Thêm mới thành công", toast);
    } catch(err) {
      setUserLoading(false)
      responseToast(err, toast)
    }
  }

  const deleteManager = async (id) => {
    try {
      setUserLoading(true)
      await clientAxios.delete('/user/manager/' + id)
      getListManager()
      Toast.success("Xóa thành công", toast);
    } catch (err) {
      setUserLoading(false)
      responseToast(err, toast)
    }
  }

  return {
    userloading,
    listManager,
    userInfo,
    getListManager,
    getUserInfo,
    createManager,
    deleteManager,
  };
};

export default useUser;
