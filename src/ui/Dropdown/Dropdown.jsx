import React from "react";
import "./Dropdown.css";

const Dropdown = ({ items, className, onItemClick }) => {
  return (
    <div>
      <ul className={className}>
        {items?.map((value, index) => (
          <li
            className="li_search"
            key={index}
            onClick={() => onItemClick(value)}
          >
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
