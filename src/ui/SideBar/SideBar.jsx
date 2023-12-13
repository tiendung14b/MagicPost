import React from "react";
import { useEffect } from "react";
import "./SideBar.css";

const SideBar = () => {
  return (
    <div className="sidebar">
          <h1 className="sidebar__title">MagicPost</h1>
          <hr />
      <ul className="sidebar__link">
        <li>Slide</li>
        <li>Slide</li>
        <li>Slide</li>
        <li>Slide</li>
      </ul>
    </div>
  );
};

export default SideBar;
