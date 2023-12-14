import React from "react";
import { useEffect } from "react";
import "./SideBar.css";
import avt21 from "../../assets/avt21.jpg";
import logout from "../../assets/logout.svg";
import sidebar_button from "../../assets/sidebar_button.svg";
import { useState } from "react";
import useUser from "../../hooks/useUser";

const SideBar = ({ title, children }) => {
  const [sidebarState, setSidebarState] = useState("");
  const { userInfo, getUserInfo } = useUser();

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
          <img className="sidebar__avt" src={avt21} alt="" />
          <div className="sidebar__user__detail">
            <p className="sidebar__usename">
              {userInfo?.first_name + " " + userInfo?.last_name}
            </p>
            <p className="sidebar__user__role">
              {"Role: " + userInfo?.workplace?.role}
            </p>
          </div>
        </li>
        {React.Children.map(children, (child) => (
          <li className="sidebar__item">{child}</li>
        ))}
        <li className="sidebar__item logout">
          <img className="sidebar__icon" src={logout} alt="" />
          <p className="sidebar__item__text">Đăng xuất</p>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
