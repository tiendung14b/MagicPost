import DashBoard from "../../../../components/DashBoard/DashBoard";
import "./human.css";
import arrow from "../../../../assets/arrow.svg";
import Row from "../../../../components/DashBoard/Row";
import { useState } from "react";

const Human = () => {
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSort = (column) => {
    if (sortedColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortedColumn(column);
      setSortOrder("asc");
    }
  };

  return (
    <div className="employee_dashboard">
      <h1>Human</h1>
      <DashBoard>
        <Row className="title">
          <div className="row__item sort_item title__name">
            Họ Tên
            <img
              src={arrow}
              alt=""
              onClick={(e) => {
                handleSort("first_name");
                e.target.classList.toggle("active");
              }}
            />
          </div>
          <div className="row__item sort_item title__phone">
            Số điện thoại
            <img
              src={arrow}
              alt=""
              onClick={(e) => {
                handleSort("phone_number");
                e.target.classList.toggle("active");
              }}
            />
          </div>
          <div className="row__item sort_item title__workplace">
            Điểm quản lý
            <img
              src={arrow}
              alt=""
              onClick={(e) => {
                handleSort("workplace");
                e.target.classList.toggle("active");
              }}
            />
          </div>
          <div className="row__item title__edit">Quản lý tài khoản</div>
        </Row>
      </DashBoard>
    </div>
  );
};

export default Human;
