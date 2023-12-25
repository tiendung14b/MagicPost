import "./employee.css";
import Layout from "../../../components/Layout/Layout";
import SideBar from "../../../components/SideBar/SideBar";
import React from "react";
import human from "../../../assets/human.svg";
import transaction from "../../../assets/transaction.svg";

import GetTransaction from "./Management/GetTransaction";
import ListTransaction from "./Management/ListTransaction";
import CreateTransaction from "./Management/CreateTransaction";

const Employee = () => {
  const [itemChoosen, setItemChoosen] = React.useState("get_transaction");

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
          id="get_transaction"
          onClick={() => handleChooseItem("get_transaction")}
        >
          <img className="sidebar__icon" src={human} alt="Hello" />
          <p className="sidebar__item__text">Đơn hàng đến từ điểm tập kết</p>
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
          title="Tạo đơn hàng"
          id="create_transaction"
          onClick={() => handleChooseItem("create_transaction")}
        >
          <img className="sidebar__icon" src={transaction} alt="" />
          <p className="sidebar__item__text">Tạo giao dịch</p>
        </div>
      </SideBar>
      <div className="container">
        <div className="director__content">
          {itemChoosen === "get_transaction" && <GetTransaction />}
          {itemChoosen === "manage_transaction" && <ListTransaction />}
          {itemChoosen === "create_transaction" && <CreateTransaction />}
        </div>
      </div>
    </Layout>
  );
};

export default Employee;
