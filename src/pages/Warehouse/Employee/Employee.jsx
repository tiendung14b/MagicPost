import "./employee.css";
import Layout from "../../../components/Layout/Layout";
import SideBar from "../../../components/SideBar/SideBar";
import React from "react";
import human from "../../../assets/human.svg";
import transaction from "../../../assets/transaction.svg";

import ListTransaction from "./Management/ListTransaction";

const Employee = () => {
  const [itemChoosen, setItemChoosen] = React.useState("warehouse_list_transaction");

  const handleChooseItem = (id) => {
    document.getElementById(itemChoosen).classList.remove("clicked");
    setItemChoosen(id);
    document.getElementById(id).classList.add("clicked");
  };

  return (
    <Layout>
      <SideBar title="Warehouse Employee">
        <div
          className="sidebar__item__content box clicked"
          title="Danh sách đơn hàng"
          id="warehouse_list_transaction"
          onClick={() => handleChooseItem("warehouse_list_transaction")}
        >
          <img className="sidebar__icon" src={human} alt="Hello" />
          <p className="sidebar__item__text">Danh sách đơn hàng</p>
        </div>
        <div
          className="sidebar__item__content box"
          title="Quản lý điểm giao dịch"
          id="warehouse_stat"
          onClick={() => handleChooseItem("warehouse_stat")}
        >
          <img className="sidebar__icon" src={transaction} alt="" />
          <p className="sidebar__item__text">Quản lý điểm giao dịch</p>
        </div>
      </SideBar>
      <div className="container">
        <div className="director__content">
          {itemChoosen === "warehouse_list_transaction" && <ListTransaction />}
          {itemChoosen === "warehouse_stat" && <h1>Warehouse</h1>}
        </div>
      </div>
    </Layout>
  );
};

export default Employee;
