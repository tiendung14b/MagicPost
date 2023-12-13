import React from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <>
      <nav className="nav-links">
        <li>
          <a href="#">Dashboard</a>
        </li>
        <li className="center">
          <a href="/page1">Page1</a>
        </li>
        <li className="upward">
          <a href="/page2">Page2</a>
        </li>
        <li className="forward">
          <a href="/page3">Page3</a>
        </li>
      </nav>
    </>
  );

}

export default NavBar;
