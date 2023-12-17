import React from "react";
import Toast from "../../../ui/Toast/Toast";
import DashBoard from "../../../components/DashBoard/DashBoard";
import Row from "../../../components/DashBoard/Row";
import Column from "../../../components/DashBoard/Column";
import useUser from "../../../hooks/useUser";
import Button from "../../../ui/Button/Button";
import Input from "../../../ui/Input/Input";
import Popup from "../../../ui/Popup/Popup";
import "./manager_page_mobile.css";

import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Loading from "../../../ui/Loading/Loading";

import arrow from "../../../assets/arrow.svg";

const ManagerPageMobile = () => {
  const {
    userloading,
    listManager,
    getListManager,
    createManager,
    deleteManager,
  } = useUser(toast);
  const [newUser, setNewUser] = useState({});
  const [userChoosen, setUserChoosen] = useState({});

  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState("first_name");

  const handleSearchTypeChange = (value) => {
    setSearchBy(value);
    setSearch("");
  };

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSort = (column) => {
    if (sortedColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortedColumn(column);
      setSortOrder("asc");
    }
  };

  const sortedManager = listManager?.slice().sort((a, b) => {
    const columnA = a[sortedColumn];
    const columnB = b[sortedColumn];

    if (sortOrder === "asc") {
      return columnA < columnB ? -1 : columnA > columnB ? 1 : 0;
    } else {
      return columnA > columnB ? -1 : columnA < columnB ? 1 : 0;
    }
  });

  useEffect(() => {
    getListManager();
  }, []);

  return (
    <div className="manager__mobile">
      <h1 className="page__title">Manager Dashboard</h1>
      <DashBoard>
        <Column className="manager__todo__mobile">
          <Button
            text={"Thêm quản lý"}
            className={"action"}
            onClick={() => {
              window["add_manager_popup"].showModal();
            }}
          />
          <Row className={"dashboard_rowForColumn"}>
            <Input
              placeholder={`Tìm kiếm theo ${
                searchBy === "first_name" ? "first name" : searchBy
              }`}
              className={"manager__search__mobile"}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="manager__search__type">
              <select
                className="selected__search"
                onChange={(e) => handleSearchTypeChange(e.target.value)}
              >
                <option value="first_name">First Name</option>
                <option value="phone">Phone Number</option>
                <option value="email">Email</option>
              </select>
            </div>
          </Row>
          <Row className={"dashboard_rowForColumn"}>
            <div className="column__item sort_item title__name">
              <img
                src={arrow}
                onClick={(e) => {
                  const selectedOption = document.querySelector(
                    ".manager__fiter__type select"
                  );
                  handleSort(selectedOption.value);
                  e.target.classList.toggle("active");
                }}
              />
            </div>
            <div className="manager__fiter__type">
              <select
                className="selected__search"
                onChange={(e) => {
                  handleSort(e.target.value);
                }}
              >
                <option value="first_name">First Name</option>
                <option value="phone_number">Phone Number</option>
                <option value="workplace">Workplace</option>
              </select>
            </div>
          </Row>
        </Column>
        {/* <Column className="title">
          <div className="column__item sort_item title__name">
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
          <div className="column__item sort_item title__phone">
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
          <div className="column__item sort_item title__workplace">
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
          <div className="column__item title__edit">Quản lý tài khoản</div>
        </Column> */}
        {sortedManager
          ?.filter((manager) => {
            const searchValue = search.toLowerCase();
            if (searchBy === "first_name") {
              return manager?.first_name.toLowerCase().includes(searchValue);
            }
            if (searchBy === "phone") {
              return manager?.phone_number.toLowerCase().includes(searchValue);
            }
            if (searchBy === "email") {
              return manager?.email.toLowerCase().includes(searchValue);
            }
          })
          ?.map((manager) => (
            <Column className="manager__detail__mobile">
              <p className="manager__name column__item">
                <div className="column__item sort_item title__name">
                  Họ Tên: {manager?.first_name + " " + manager?.last_name}
                </div>
              </p>
              <p className="column__item manager__phone">
                <div className="column__item sort_item title__phone">
                  Số điện thoại: {manager?.phone_number}
                </div>
              </p>
              <p className="column__item manager__workplace">
                <div className="column__item sort_item title__workplace">
                  Điểm quản lý: {manager?.workplace?.name || "Chưa có"}
                </div>
              </p>
              <div className="column__item manager__edit">
                <Button
                  text={"Xem chi tiết"}
                  className={"action"}
                  onClick={() => {
                    setUserChoosen(manager);
                    console.log(userChoosen);
                    window["manager_popup"].showModal();
                  }}
                />
              </div>
            </Column>
          ))}
      </DashBoard>
      <Popup
        className="manager_popup"
        popup_id={"manager_popup"}
        title={"Thông tin quản lý"}
      >
        <div className="popup__body__content">
          <div className="manager_popup__field">
            <p className="manager_popup__field__title">Họ tên:</p>
            <p className="manager_popup__field__value">
              {userChoosen?.first_name + " " + userChoosen?.last_name}
            </p>
          </div>
          <div className="manager_popup__field">
            <p className="manager_popup__field__title">Số điện thoại:</p>
            <p className="manager_popup__field__value">
              {userChoosen?.phone_number}
            </p>
          </div>
          <div className="manager_popup__field">
            <p className="manager_popup__field__title">Email:</p>
            <p className="manager_popup__field__value">{userChoosen?.email}</p>
          </div>
          <div className="manager_popup__field">
            <p className="manager_popup__field__title">Nơi làm việc:</p>
            <p className="manager_popup__field__value">
              {userChoosen?.workplace?.name || "Chưa có"}
            </p>
          </div>
          <div className="manager_popup__field">
            <p className="manager_popup__field__title">Vai trò:</p>
            <p className="manager_popup__field__value">
              {userChoosen?.workplace?.role || "Chưa có"}
            </p>
          </div>
          <Button
            text={"Xoá người dùng này"}
            className={"danger"}
            onClick={() => {
              window["manager_popup"].close();
              deleteManager(userChoosen?._id);
            }}
          />
        </div>
      </Popup>
      <Popup
        className="add_manager_popup"
        popup_id={"add_manager_popup"}
        title={"Thêm tài khoản quản lý"}
      >
        <div className="popup__body__content">
          <Input
            className="add_manager_popup__input"
            placeholder={"Họ"}
            type="text"
            name="first_name"
            onChange={handleChange}
          />
          <Input
            className="add_manager_popup__input"
            placeholder={"Tên"}
            type="text"
            name="last_name"
            onChange={handleChange}
          />
          <Input
            className="add_manager_popup__input"
            placeholder={"Số điện thoại"}
            type="tel"
            name="phone_number"
            onChange={handleChange}
          />
          <Input
            className="add_manager_popup__input"
            placeholder="Email"
            type="email"
            name="email"
            onChange={handleChange}
          />
          <div className="add_manager_role">
            <p>Vai trò:</p>
            <div className="checkbox">
              <input
                type="radio"
                name="role"
                value="WAREHOUSE_MANAGER"
                id="warehouse_role"
                onClick={(e) => {
                  setNewUser({
                    ...newUser,
                    workplace: { role: e.target.value },
                  });
                }}
              />
              <label htmlFor="warehouse_role">Quản lý điểm tập kết</label>
            </div>
            <div className="checkbox">
              <input
                type="radio"
                name="role"
                value="WAREHOUSE_MANAGER"
                id="transaction_role"
                onClick={(e) => {
                  setNewUser({
                    ...newUser,
                    workplace: { role: e.target.value },
                  });
                }}
              />
              <label htmlFor="transaction_role">Quản lý điểm giao dịch</label>
            </div>
          </div>
          <p className="warn" id="add_manager_warn">
            Bạn cần nhập đầy đủ thông tin
          </p>
          <div className="add_manager_submit">
            <Button
              text={"Thêm quản lý"}
              className={"submit"}
              onClick={() => {
                console.log(newUser.workplace);
                if (
                  !newUser?.phone_number ||
                  !newUser?.first_name ||
                  !newUser?.last_name ||
                  !newUser?.email ||
                  !newUser?.workplace?.role
                ) {
                  Toast.warn("Bạn cần nhập đầy đủ thông tin", toast);
                  window["add_manager_warn"].className = "warn show";
                  return;
                }
                window["add_manager_popup"].close();
                createManager(newUser);
                setNewUser({});
              }}
            />
            <Button
              text={"Hủy"}
              className={"cancel"}
              onClick={() => {
                window["add_manager_popup"].close();
                setNewUser({});
              }}
            />
          </div>
        </div>
      </Popup>
      {userloading ? <Loading /> : <></>}
      <ToastContainer className="toasify" />
    </div>
  );
};

export default ManagerPageMobile;
