import React, { useEffect } from "react";
import "../Director.css";
import useLocation from "../../../hooks/useLocation";
import { toast } from "react-toastify";
import Row from "../../../components/DashBoard/Row";
import useUser from "../../../hooks/useUser";

const LogisticPage = () => {
  const {
    provinceData,
    districtData,
    locationLoading,
    getProvince,
    getDistrict,
  } = useLocation(toast);

  //state for user
  const { userloading, listManager, getListManager } = useUser(toast);

  useEffect(() => {
    getListManager();
    getProvince();
    getDistrict("01");
  }, []);

  return (
    <div className="manager">
      <h1>Quản lý vận chuyển</h1>
      
    </div>
  );
};

export default LogisticPage;
