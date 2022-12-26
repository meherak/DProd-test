import React from "react";
import ReactDOM from "react-dom";

import { icons } from "shared/utils";

import "./Modal.css";

export const Modal = ({ children, isShowing, toggle }) => {
  const handleClose = () => {
    toggle();
  };

  return (
    isShowing &&
    ReactDOM.createPortal(
      <React.Fragment>
        <div className="modal-overlay" onClick={handleClose} />
        <div className="modal-container">
          <div className="modal-wrapper">
            <div className="modal-header">
              <div className="btn-close" onClick={handleClose}>
                {icons.closeIcon}
              </div>
            </div>
            <div className="modal-body">{children}</div>
          </div>
        </div>
      </React.Fragment>,
      document.body
    )
  );
};
