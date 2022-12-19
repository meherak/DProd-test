import React, { useEffect, useRef } from "react";

import { colorsLevel } from "shared/utils/progress-colors";

import "./ProgressBar.css";

const ProgressBar = ({ progressItem }) => {
  const ref = useRef();

  useEffect(() => {
    if (ref.current == null) {
      return;
    }
    const getColor = () => {
      if (progressItem.value === 0) {
        return null;
      } else if (progressItem.value <= 25) {
        return colorsLevel.low;
      } else if (progressItem.value <= 50) {
        return colorsLevel.medium;
      } else if (progressItem.value <= 75) {
        return colorsLevel.hight;
      } else if (progressItem.value === 100) {
        return colorsLevel.complete;
      }
    };
    const color = getColor();
    ref.current.style.backgroundColor = color;
    ref.current.style.width = `${progressItem.value}%`;
  }, [progressItem.value]);

  return (
    <div className="progress-group">
      <p className="progress-title">{progressItem.title}</p>
      <div className="progress-wrapper">
        <span htmlFor="file" className="progress-value">
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
