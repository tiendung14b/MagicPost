import "./manager.css";
import Layout from "../../../components/Layout/Layout";
import SideBar from "../../../components/SideBar/SideBar";
import React from "react";
import human from "../../../assets/human.svg";
import transaction from "../../../assets/transaction.svg";
import warehouse from "../../../assets/stock.png";
import logistic from "../../../assets/truck.png";
import Human from "./HumanManagement/Human";

const Manager = () => {
  const [itemChoosen, setItemChoosen] = React.useState("director__human");

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
          <img className="sidebar__icon" src={warehouse} alt="" />
          <p className="sidebar__item__text">Quản lý kho</p>
        </div>
        <div
          className="sidebar__item__content box"
          title="Quản lý vận chuyển"
          id="director__logistic"
          onClick={() => handleChooseItem("director__logistic")}
        >
          <img className="sidebar__icon" src={logistic} alt="" />
          <p className="sidebar__item__text">Quản lý vận chuyển</p>
        </div>
      </SideBar>
      <div className="container">
        <div className="director__content">
          {itemChoosen === "director__human" && <Human />}
          {itemChoosen === "director__transaction" && <h1>Transaction</h1>}
          {itemChoosen === "director__warehouse" && <h1>Warehouse</h1>}
          {itemChoosen === "director__logistic" && <h1>Logistic</h1>}
        </div>
      </div>
    </Layout>
  );
};

export default Manager;
