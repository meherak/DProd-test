import React, { useEffect, useRef } from "react";

import { getColor } from "shared/utils";

import "./ProgressBar.css";

const ProgressBar = ({ progressItem, setProgressArray, setDisabledBtn }) => {
  const ref = useRef();

  const handleSelect = () => {
    setDisabledBtn(progressItem.selected);
    
    setProgressArray((prev) => {
      const newProgresses = prev.map((item) => {
        if (item.id === progressItem.id) {
          return { ...item, selected: !item.selected };
        } else return { ...item, selected: false };
      });
      return newProgresses;
    });
  };

  useEffect(() => {
    if (ref.current == null) {
      return;
    }
    const color = getColor(progressItem.value);
    ref.current.style.backgroundColor = color;
    ref.current.style.width = `${progressItem.value}%`;
  }, [progressItem.value]);

  return (
    <div
      className={`progress-group ${progressItem.selected ? "selected" : ""}`}
      onClick={handleSelect}
    >
      <p className="progress-title">{progressItem.title}</p>
      <div className="progress-wrapper">
        <span className="progress-value">
          {progressItem.value}%
        </span>
        <div className="progress-thin">
          <div className="progress-bar" ref={ref}></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
