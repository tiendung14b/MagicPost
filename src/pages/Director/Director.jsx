import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";

import NavBar from "./NavBar/NavBar";
import SideBar from "../../ui/SideBar/SideBar";
import Page1 from "./PageManage/Page1";
import Page2 from "./PageManage/Page2";
import Page3 from "./PageManage/Page3";
import DashBoard from "../../components/DashBoard/DashBoard";
import Row from "../../components/DashBoard/Row";

import useUser from "../../hooks/useUser";

import "./Director.css";

function Director() {

  const {loading, listManager, getListManager} = useUser()

  useEffect(() => {
    getListManager()
  },[])


  return (
    <div className="main-director">
      <div className="sidebar-content">
        <SideBar />
      </div>
      <div className="main-content">
        <div className="navbar-content">
          <NavBar />
        </div>
        <div className="dashboard-content">
          <DashBoard>
            <Row className="title">
              <p>First Name</p>
              <p>Last Name</p>
              <p>Phone Number</p>
            </Row>
            {listManager.map(item => 
              <Row>
                <p>{item.first_name}</p>
                <p>{item.last_name}</p>
                <p>{item.phone_number}</p>
              </Row>
            )}
          </DashBoard>
        </div>
      </div>
    </div>
  );
}

export default Director;
