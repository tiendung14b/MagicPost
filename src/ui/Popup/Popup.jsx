import React from "react";
import "./popup.css";
import xsymbol from "../../assets/x-symbol.svg";

const Popup = ({ children, title, popup_id, className, onClose, ...props }) => {
  const [original, setOriginal] = React.useState("");
  return (
    <dialog
      className={`popup__orverlay ${className}`}
      id={popup_id}
      onClose={onClose}
    >
      <div className="popup__content">
        <div className="popup__header">
          <h2 className="popup__title">{title}</h2>
          <img
            className="popup__close"
            src={xsymbol}
            alt="close"
            onClick={(e) => {
              e.preventDefault();
              window[popup_id].close();
            }}
          />
        </div>
        <div className="popup__body">{children}</div>
      </div>
    </dialog>
  );
};

export default Popup;
