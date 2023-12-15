import React, { useEffect } from "react";

import NavBar from "./NavBar/NavBar";
import SideBar from "../../components/SideBar/SideBar";
import DashBoard from "../../components/DashBoard/DashBoard";
import Row from "../../components/DashBoard/Row";
import human from "../../assets/human.svg";
import truck from "../../assets/truck.png";
import stock from "../../assets/stock.png";
import transaction from "../../assets/transaction.svg";

import useUser from "../../hooks/useUser";

import "./Director.css";
import Layout from "../../components/Layout/Layout";
import ManagerPage from "./HumanManagement/ManagerPage";

function Director() {
  const { loading, listManager, getListManager } = useUser();
  const [itemChoosen, setItemChoosen] = React.useState("director__human");

  const handleChooseItem = (id) => {
    document.getElementById(itemChoosen).classList.remove("clicked");
    setItemChoosen(id);
    document.getElementById(id).classList.add("clicked");
  };

  useEffect(() => {
    getListManager();
  }, []);

  return (
    <Layout>
      <SideBar title="Director">
        <div
          className="sidebar__item__content box clicked"
          title="Quản lý nhân sự"
          id="director__human"
          onClick={() => handleChooseItem("director__human")}
        >
          <img className="sidebar__icon" src={human} alt="Hello" />
          <p className="sidebar__item__text">Quản lý nhân sự</p>
        </div>
        <div
          className="sidebar__item__content box"
          title="Quản lý điểm giao dịch"
          id="director__transaction"
          onClick={() => handleChooseItem("director__transaction")}
        >
          <img className="sidebar__icon" src={transaction} alt="" />
          <p className="sidebar__item__text">Quản lý điểm giao dịch</p>
        </div>
        <div
          className="sidebar__item__content box"
          title="Quản lý kho"
          id="director__warehouse"
          onClick={() => handleChooseItem("director__warehouse")}
        >
          <img className="sidebar__icon" src={stock} alt="" />
          <p className="sidebar__item__text">Quản lý kho</p>
        </div>
        <div
          className="sidebar__item__content box"
          title="Thống kê logistic"
          id="director__stat"
          onClick={() => handleChooseItem("director__stat")}
        >
          <img className="sidebar__icon" src={truck} alt="" />
          <p className="sidebar__item__text">Thống kê logistic</p>
        </div>
      </SideBar>
      <div className="container">
        {itemChoosen === "director__human" && <ManagerPage />}
      </div>
    </Layout>
  );
}

export default Director;
