import React from "react";
import { useEffect } from "react";
import "./SideBar.css";
import avt21 from "../../assets/avt21.jpg";
import logout from "../../assets/logout.svg";
import sidebar_button from "../../assets/sidebar_button.svg";
import { useState } from "react";
import useUser from "../../hooks/useUser";
import { useNavigate } from "react-router-dom";
import Popup from "../../ui/Popup/Popup";
import Button from "../../ui/Button/Button";

const SideBar = ({ title, children }) => {
  const [sidebarState, setSidebarState] = useState("");
  const { userInfo, getUserInfo } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div className={`sidebar ${sidebarState}`}>
      <div className="sidebar__header">
        <h1 className="sidebar__title">{title}</h1>
        <img
          className="sidebar__close-btn"
          src={sidebar_button}
          alt=""
          onClick={() => {
            if (sidebarState === "close") {
              setSidebarState("");
            } else {
              setSidebarState("close");
            }
          }}
        />
      </div>
      <hr />
      <ul className="sidebar__nav">
        <li className="sidebar__item user">
          <div className="sidebar__item__content">
            <img className="sidebar__avt" src={avt21} alt="" />
            <div className="sidebar__user__detail">
              <p className="sidebar__usename">
                {userInfo?.first_name + " " + userInfo?.last_name}
              </p>
              <p className="sidebar__user__role">
                {"Role: " + userInfo?.workplace?.role}
              </p>
            </div>
          </div>
        </li>
        {React.Children.map(children, (child) => (
          <li className="sidebar__item">{child}</li>
        ))}
        <li
          className="sidebar__item logout"
          onClick={() => {
            window["confirm_logout"].showModal();
          }}
        >
          <div className="sidebar__item__content">
            <img className="sidebar__icon" src={logout} alt="" />
            <p className="sidebar__item__text">Đăng xuất</p>
          </div>
        </li>
      </ul>
      <Popup
        className="sidebar_logout_popup"
        popup_id={"confirm_logout"}
        title={"Xác nhận"}
      >
        <div className="popup__content">
          <p className="popup__text">Bạn có chắc chắn muốn đăng xuất?</p>
          <div className="popup__action">
            <Button
              text={"Đăng xuất"}
              className={"danger"}
              onClick={() => {
                sessionStorage.removeItem("access_token");
                sessionStorage.removeItem("user");
                navigate("/");
              }}
            />
            <Button
              text={"Hủy"}
              className={"action"}
              onClick={() => {
                window["confirm_logout"].close();
              }}
            />
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default SideBar;
