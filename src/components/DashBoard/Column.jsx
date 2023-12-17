import React from "react";
import "./Column.css";

const Column = ({ children, className }) => {
  return <div className={`dashboard__column ${className}`}>{children}</div>;
};

export default Column;
