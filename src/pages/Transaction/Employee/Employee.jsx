import "./employee.css";
import Layout from "../../../components/Layout/Layout";
import SideBar from "../../../components/SideBar/SideBar";
import React from "react";
import human from "../../../assets/human.svg";
import transaction from "../../../assets/transaction.svg";

import useWindowDimensions from "../../../hooks/useWindowScreen";

import GetTransaction from "./Management/GetTransaction";
import ListTransaction from "./Management/ListTransaction";
import CreateTransaction from "./Management/CreateTransaction";
import DeliveryTransaction from "./Management/DeliveryTransaction";

import CreateTransactionMobile from "./ManagementMobile/CreateTransactionMobile";
import ListTransactionMobile from "./ManagementMobile/ListTransactionMobile";
import DeliveryTransactionMobile from "./ManagementMobile/DeliveryTransactionMobile";
import GetTransactionMobile from "./ManagementMobile/GetTransactionMobile";


const Employee = () => {
  const [itemChoosen, setItemChoosen] = React.useState("create_transaction");

  const handleChooseItem = (id) => {
    document.getElementById(itemChoosen).classList.remove("clicked");
    setItemChoosen(id);
    document.getElementById(id).classList.add("clicked");
  };

  const { width } = useWindowDimensions();

  const containerClassName = width < 950 ? "container__mobile" : "container";

  return (
    <Layout>
      <SideBar title="Transaction Employee">
        <div
          className="sidebar__item__content box clicked"
          title="Tạo đơn hàng"
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
          title="Xác nhận đơn hàng từ điểm tập kết"
          id="delivery_transaction"
          onClick={() => handleChooseItem("delivery_transaction")}
        >
          <img className="sidebar__icon" src={transaction} alt="" />
          <p className="sidebar__item__text">Đơn hàng tới người nhận</p>
        </div>
        <div
          className="sidebar__item__content box"
          title="Đơn hàng tới người nhận"
          id="get_transaction"
          onClick={() => handleChooseItem("get_transaction")}
        >
          <img className="sidebar__icon" src={transaction} alt="" />
          <p className="sidebar__item__text">
            Xác nhận đơn hàng từ điểm tập kết
          </p>
        </div>
        {/* <div
          className="sidebar__item__content box"
          title="Lịch sử đơn hàng"
          id="get_transaction"
          onClick={() => handleChooseItem("get_transaction")}
        >
          <img className="sidebar__icon" src={transaction} alt="" />
          <p className="sidebar__item__text">
            Lịch sử đơn hàng
          </p>
        </div> */}
      </SideBar>
      <div className={containerClassName}>
        <div className="director__content">
          {itemChoosen === "create_transaction" &&
            (width > 920 ? <CreateTransaction /> : <CreateTransactionMobile />)}
          {itemChoosen === "get_transaction" &&
            (width > 768 ? <GetTransaction /> : <GetTransactionMobile />)}
          {itemChoosen === "manage_transaction" &&
            (width > 768 ? <ListTransaction /> : <ListTransactionMobile />)}
          {itemChoosen === "delivery_transaction" &&
            (width > 768 ? (
              <DeliveryTransaction />
            ) : (
              <DeliveryTransactionMobile />
            ))}
          {/* {itemChoosen === "history" && <History />} */}
        </div>
      </div>
    </Layout>
  );
};

export default Employee;
