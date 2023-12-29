import React from "react";
import { useRef } from "react";
import "./popup.css";
import xsymbol from "../../assets/x-symbol.svg";

const Popup = ({
  children,
  title,
  popup_id,
  className,
  ref,
  onClose,
  style,
  ...props
}) => {
  const [original, setOriginal] = React.useState("");

  return (
    <dialog
      className={`popup__orverlay ${className}`}
      id={popup_id}
      onClose={onClose}
      ref={ref}
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
        <div className="popup__body" style={style}>
          {children}
        </div>
      </div>
    </dialog>
  );
};

export default Popup;
