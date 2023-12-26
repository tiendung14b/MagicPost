import "./employee.css";
import Layout from "../../../components/Layout/Layout";
import SideBar from "../../../components/SideBar/SideBar";
import React from "react";
import human from "../../../assets/human.svg";
import transaction from "../../../assets/transaction.svg";

import GetTransaction from "./Management/GetTransaction";
import ListTransaction from "./Management/ListTransaction";
import CreateTransaction from "./Management/CreateTransaction";
import DeliveryTransaction from "./Management/DeliveryTransaction";

const Employee = () => {
  const [itemChoosen, setItemChoosen] = React.useState("create_transaction");

  const handleChooseItem = (id) => {
    document.getElementById(itemChoosen).classList.remove("clicked");
    setItemChoosen(id);
    document.getElementById(id).classList.add("clicked");
  };

  return (
    <Layout>
      <SideBar title="Transaction Employee">
        <div
          className="sidebar__item__content box clicked"
          title="Đơn hàng đến từ điểm tập kết"
          id="create_transaction"
          onClick={() => handleChooseItem("create_transaction")}
        >
          <img className="sidebar__icon" src={human} alt="Hello" />
          <p className="sidebar__item__text">Tạo đơn hàng</p>
        </div>
        <div
          className="sidebar__item__content box"
          title="Danh sách giao dịch"
          id="manage_transaction"
          onClick={() => handleChooseItem("manage_transaction")}
        >
          <img className="sidebar__icon" src={transaction} alt="" />
          <p className="sidebar__item__text">Danh sách giao dịch</p>
        </div>
        <div
          className="sidebar__item__content box"
          title="Đơn hàng tới người nhận"
          id="delivery_transaction"
          onClick={() => handleChooseItem("delivery_transaction")}
        >
          <img className="sidebar__icon" src={transaction} alt="" />
          <p className="sidebar__item__text">Đơn hàng tới người nhận</p>
        </div>
        <div
          className="sidebar__item__content box"
          title="Tạo đơn hàng"
          id="get_transaction"
          onClick={() => handleChooseItem("get_transaction")}
        >
          <img className="sidebar__icon" src={transaction} alt="" />
          <p className="sidebar__item__text">Đơn hàng tới</p>
        </div>
      </SideBar>
      <div className="container">
        <div className="director__content">
          {itemChoosen === "create_transaction" && <CreateTransaction />}
          {itemChoosen === "get_transaction" && <GetTransaction />}
          {itemChoosen === "manage_transaction" && <ListTransaction />}
          {itemChoosen === "delivery_transaction" && <DeliveryTransaction />}
        </div>
      </div>
    </Layout>
  );
};

export default Employee;
