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
    userLoading,
    listManager,
    deleteInfo,
    getListManager,
    createManager,
    deleteUser,
  } = useUser(toast);
  const [newUser, setNewUser] = useState({});

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

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
          <p className="row__item title__name">Họ tên</p>
          <p className="row__item title__phone">Số điện thoại</p>
          <p className="row__item title__workplace">Nơi làm việc</p>
          <p className="row__item title__edit">Quản lý tài khoản</p>
        </Row>
        {listManager?.map((manager) => (
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
          <p className="warn" id="add_manager_warn">
            Xoá người dùng
          </p>
          <Button
            text={"Xoá người dùng này"}
            className={"action"}
            onClick={() => {
              window["manager_popup"].close();
              handleDelete();
              Toast.success("Xoá người dùng thành công", toast);
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
            id="login_info"
            type="text"
            name="first_name"
            onChange={handleChange}
          />
          <Input
            className="add_manager_popup__input"
            placeholder={"Tên"}
            id="login_info"
            type="text"
            name="last_name"
            onChange={handleChange}
          />
          <Input
            className="add_manager_popup__input"
            placeholder={"Số điện thoại"}
            id="login_info"
            type="tel"
            name="phone_number"
            onChange={handleChange}
          />
          <Input
            className="add_manager_popup__input"
            placeholder="Email"
            id="login_info"
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
              getListManager();
              Toast.success("Thêm quản lý thành công", toast);
            }}
          />
        </div>
      </Popup>
      {userLoading && <Loading />}
      <ToastContainer className="toasify" />
    </div>
  );
};

export default ManagerPage;
