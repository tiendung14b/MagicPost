import React from "react";
import "./CardDashboard.css";

const CardDashboard = ({ title, text, description}) => {
  return (
    <>
      <div className="main-card">
        <div className="main-card__title">
          <h2>{title}</h2>
        </div>
        <div className="main-card__text">
          <p>{text}</p>
        </div>
        <div className="main-card__description">
          <p>{description}</p>
        </div>
      </div>
    </>
  );
};

export default CardDashboard;
