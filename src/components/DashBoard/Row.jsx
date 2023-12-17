import React from "react";
import "./Row.css";

const Row = ({ children, className }) => {
  return <div className={`dashboard__row ${className}`}>{children}</div>;
};

export default Row;
