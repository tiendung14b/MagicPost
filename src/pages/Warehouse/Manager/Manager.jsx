import "../../CSS/Director.css";
import Layout from "../../../components/Layout/Layout";
import SideBar from "../../../components/SideBar/SideBar";
import React from "react";
import human from "../../../assets/human.svg";
import transaction from "../../../assets/transaction.svg";

import useWindowDimensions from "../../../hooks/useWindowScreen";

import Human from "./HumanManagement/Human";
import Stat from "./HumanManagement/Stat";

import HumanMobile from "./HumanManagementMobile/HumanMobile";

const Manager = () => {
  const [itemChoosen, setItemChoosen] = React.useState("warehouse_human");

  const handleChooseItem = (id) => {
    document.getElementById(itemChoosen).classList.remove("clicked");
    setItemChoosen(id);
    document.getElementById(id).classList.add("clicked");
  };

  const { width } = useWindowDimensions();

  const containerClassName = width < 768 ? "container__mobile" : "container";

  return (
    <Layout>
      <SideBar title="Warehouse Manager">
        <div
          className="sidebar__item__content box clicked"
          title="Quản lý nhân sự"
          id="warehouse_human"
          onClick={() => handleChooseItem("warehouse_human")}
        >
          <img className="sidebar__icon" src={human} alt="Hello" />
          <p className="sidebar__item__text">Quản lý nhân sự</p>
        </div>
        <div
          className="sidebar__item__content box"
          title="Thống kê"
          id="warehouse_stat"
          onClick={() => handleChooseItem("warehouse_stat")}
        >
          <img className="sidebar__icon" src={transaction} alt="" />
          <p className="sidebar__item__text">Thống Kê</p>
        </div>
      </SideBar>
      <div className={containerClassName}>
        <div className="director__content">
          {itemChoosen === "warehouse_human" &&
            (width < 768 ? <HumanMobile /> : <Human />)}
          {itemChoosen === "warehouse_stat" && <Stat />}
        </div>
      </div>
    </Layout>
  );
};

export default Manager;
