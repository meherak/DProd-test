import React from "react";

import "./ProgressItemManager.css";

export const ProgressItemManager = ({ toggle }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toggle();
  };
  return (
    <div className="form-wrapper">
      <form className="progress-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <p className="input-title">Titre:</p>
          <input type="text" />
        </div>
        <div className="form-row">
          <p className="input-title">Valeur:</p>
          <input type="range" />
        </div>
        <div className="form-submit">
          <button className="btn" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
