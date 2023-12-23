import "./manager.css";
import Layout from "../../../components/Layout/Layout";
import SideBar from "../../../components/SideBar/SideBar";
import React from "react";
import human from "../../../assets/human.svg";
import transaction from "../../../assets/transaction.svg";
import Human from "./HumanManagement/Human";

const Manager = () => {
  const [itemChoosen, setItemChoosen] = React.useState("transaction_human");

  const handleChooseItem = (id) => {
    document.getElementById(itemChoosen).classList.remove("clicked");
    setItemChoosen(id);
    document.getElementById(id).classList.add("clicked");
  };

  return (
    <Layout>
      <SideBar title="Manager">
        <div
          className="sidebar__item__content box clicked"
          title="Quản lý nhân sự"
          id="transaction_human"
          onClick={() => handleChooseItem("transaction_human")}
        >
          <img className="sidebar__icon" src={human} alt="Hello" />
          <p className="sidebar__item__text">Quản lý nhân sự</p>
        </div>
        <div
          className="sidebar__item__content box"
          title="Quản lý điểm giao dịch"
          id="transaction_stat"
          onClick={() => handleChooseItem("transaction_stat")}
        >
          <img className="sidebar__icon" src={transaction} alt="" />
          <p className="sidebar__item__text">Quản lý điểm giao dịch</p>
        </div>
      </SideBar>
      <div className="container">
        <div className="director__content">
          {itemChoosen === "transaction_human" && <Human />}
          {itemChoosen === "transaction_stat" && <h1>Transaction</h1>}
        </div>
      </div>
    </Layout>
  );
};

export default Manager;
