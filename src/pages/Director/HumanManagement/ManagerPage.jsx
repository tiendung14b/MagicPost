import Toast from "../../../ui/Toast/Toast";
import DashBoard from "../../../components/DashBoard/DashBoard";
import Row from "../../../components/DashBoard/Row";
import useUser from "../../../hooks/useUser";
import Button from "../../../ui/Button/Button";
import Input from "../../../ui/Input/Input";
import Popup from "../../../ui/Popup/Popup";
import "./manager_page.css";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Loading from "../../../ui/Loading/Loading";

const ManagerPage = () => {
  const {
    userloading,
    listManager,
    getListManager,
    createManager,
    deleteUser,
  } = useUser(toast);
  const [newUser, setNewUser] = useState({});
  const [userChoosen, setUserChoosen] = useState({});

  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

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

  const handleDelete = () => {
    deleteUser();
    getListManager();
  };

  useEffect(() => {
    getListManager();
  }, []);

  return (
    <div className="manager">
      <h1 className="page_title">Manager Dashboard</h1>
      <DashBoard>
        <Row className="manager__todo">
          <Button
            text={"Thêm quản lý"}
            className={"action"}
            onClick={() => {
              window["add_manager_popup"].showModal();
            }}
          />
          <Input placeholder={"Tìm kiếm"} className={"manager_phone_search"} />
        </Row>
        <Row className="title">
          <div className="row__item title__name">
            Họ Tên
            <button onClick={() => handleSort("first_name")}>
              {sortedColumn === "first_name" && sortOrder === "asc" ? "▲" : "▼"}
            </button>
          </div>
          <div className="row__item title__phone">
            Số điện thoại
            <button onClick={() => handleSort("phone_number")}>
              {sortedColumn === "phone_number" && sortOrder === "asc"
                ? "▲"
                : "▼"}
            </button>
          </div>
          <div className="row__item title__workplace">
            Điểm quản lý
            <button onClick={() => handleSort("workplace")}>
              {sortedColumn === "workplace" && sortOrder === "asc" ? "▲" : "▼"}
            </button>
          </div>
          <div className="row__item title__edit">Quản lý tài khoản</div>
        </Row>
        {sortedManager?.map((manager) => (
          <Row className="manager__detail">
            <p className="manager__name row__item">
              {manager?.first_name + " " + manager?.last_name}
            </p>
            <p className="row__item manager__phone">{manager?.phone_number}</p>
            <p className="row__item manager__workplace">
              {manager?.workplace?.name || "Chưa có"}
            </p>
            <div className="row__item manager__edit">
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
          </Row>
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
              deleteUser(userChoosen?._id);
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

export default ManagerPage;
