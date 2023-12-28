import "./employee.css";
import Layout from "../../../components/Layout/Layout";
import SideBar from "../../../components/SideBar/SideBar";
import React from "react";
import human from "../../../assets/human.svg";
import transaction from "../../../assets/transaction.svg";

import ListTransactionFromTransactionSpot from "./Management/ListTransactionFromTransactionSpot";
import ListTransactionFromWarehouse from "./Management/ListTransactionFromWarehouse";
import ListTransactionToTransactionSpot from "./Management/ListTransactionToTransactionSpot";
import ListTransactionToWarehouse from "./Management/ListTransactionToWarehouse";

const Employee = () => {
  const [itemChoosen, setItemChoosen] = React.useState("warehouse_list_transaction_from_transaction_spot");

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
          title="Xác nhận đơn hàng từ điểm giao dịch"
          id="warehouse_list_transaction_from_transaction_spot"
          onClick={() =>
            handleChooseItem("warehouse_list_transaction_from_transaction_spot")
          }
        >
          <img className="sidebar__icon" src={human} alt="Hello" />
          <p className="sidebar__item__text">
            Xác nhận đơn hàng từ điểm giao dịch
          </p>
        </div>
        <div
          className="sidebar__item__content box"
          title="Xác nhận đơn hàng từ điểm tập kết"
          id="warehouse_list_transaction_from_warehouse"
          onClick={() =>
            handleChooseItem("warehouse_list_transaction_from_warehouse")
          }
        >
          <img className="sidebar__icon" src={transaction} alt="" />
          <p className="sidebar__item__text">
            Xác nhận đơn hàng từ điểm tập kết
          </p>
        </div>
        <div
          className="sidebar__item__content box"
          title="Đơn hàng gửi tới điểm tập kết"
          id="warehouse_list_transaction_to_warehouse"
          onClick={() =>
            handleChooseItem("warehouse_list_transaction_to_warehouse")
          }
        >
          <img className="sidebar__icon" src={transaction} alt="" />
          <p className="sidebar__item__text">Đơn hàng gửi tới điểm tập kết</p>
        </div>
        <div
          className="sidebar__item__content box clicked"
          title="Đơn hàng gửi tới điểm giao dịch"
          id="warehouse_list_transaction_to_transaction_spot"
          onClick={() =>
            handleChooseItem("warehouse_list_transaction_to_transaction_spot")
          }
        >
          <img className="sidebar__icon" src={human} alt="Hello" />
          <p className="sidebar__item__text">
            Đơn hàng gửi tới điểm giao dịch
          </p>
        </div>
      </SideBar>
      <div className="container">
        <div className="director__content">
          {itemChoosen ===
            "warehouse_list_transaction_from_transaction_spot" && (
            <ListTransactionFromTransactionSpot />
          )}
          {itemChoosen === "warehouse_list_transaction_from_warehouse" && (
            <ListTransactionFromWarehouse />
          )}
          {itemChoosen === "warehouse_list_transaction_to_warehouse" && (
            <ListTransactionToWarehouse />
          )}
          {itemChoosen ===
            "warehouse_list_transaction_to_transaction_spot" && (
            <ListTransactionToTransactionSpot />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Employee;
