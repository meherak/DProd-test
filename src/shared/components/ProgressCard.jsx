import React, { useEffect, useRef } from "react";

import { getColor } from "shared/utils";

import "./ProgressCard.css";

const ProgressBar = ({ progressItem, setProgressArray }) => {
  const ref = useRef();

  const handleSelect = () => {
    setProgressArray((prev) => {
      const newProgresses = prev.map((item) => {
        if (item.id === progressItem.id) {
          return { ...item, selected: !item.selected };
        } else return { ...item, selected: false };
      });
      return newProgresses;
    });
  };

  const handleProgress = (e, step) => {
    e.stopPropagation();
    setProgressArray((prev) => {
      const newProgresses = prev.map((item) => {
        if (item.value + step <= 100 && item.selected) {
          return { ...item, value: item.value + step };
        } else return item;
      });
      return newProgresses;
    });
  };

  const handleResetProgress = (e) => {
    e.stopPropagation();
    setProgressArray((prev) => {
      const newProgresses = prev.map((item) => {
        if (item.selected) return { ...item, value: 0 };
        return item;
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
      className={`progress-card ${progressItem.selected ? "selected" : ""}`}
      onClick={handleSelect}
    >
      <p className="progress-title">{progressItem.title}</p>
      <div className="progress-wrapper">
        <span className="progress-value">{progressItem.value}%</span>
        <div className="progress-thin">
          <div className="progress-bar" ref={ref}></div>
        </div>
      </div>

      {progressItem.selected && (
        <div className="progress-control">
          <button className="btn" onClick={handleResetProgress}>
            Remèttre à zero le compteur
          </button>
          <button className="btn" onClick={(e) => handleProgress(e, 5)}>
            Ajouter 5%
          </button>
          <button className="btn" onClick={(e) => handleProgress(e, 10)}>
            Ajouter 10%
          </button>
        </div>
      )}
      
    </div>
  );
};

export default ProgressBar;
