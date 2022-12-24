import React, { useEffect, useRef, useState } from "react";

import { getColor } from "shared/utils";
import { useOutsideClickEvent } from "shared/hooks/useOutsideClickEvent";

import "./ProgressCard.css";

export const ProgressCard = ({ progressItem, setProgressArray }) => {
  const [toggleDropdown, setToggleDropdown] = useState(false);

  const ref = useRef();
  const dropdownRef = useRef();

  useOutsideClickEvent(dropdownRef, setToggleDropdown);

  const handleToggleOptions = (e) => {
    e.stopPropagation();
    setToggleDropdown(true);
  };

  const handleDeleteItem = (e) => {
    setProgressArray((prev) => {
      const newProgresses = prev.filter((item) => item.id !== progressItem.id);
      return newProgresses;
    });
    e.stopPropagation();
    setToggleDropdown(false);
  };

  const handleEditItem = (e) => {
    e.stopPropagation();
    setToggleDropdown(false);
  };

  const handleSelect = () => {
    setProgressArray((prev) => {
      const newProgresses = prev.map((item) => {
        if (item?.id === progressItem.id) {
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
    const color = getColor(progressItem?.value);
    ref.current.style.backgroundColor = color;
    ref.current.style.width = `${progressItem?.value}%`;
  }, [progressItem?.value]);

  return (
    <div
      className={`progress-card ${
        progressItem?.selected ? "selected" : ""
      }`.trim()}
      onClick={handleSelect}
    >
      <div
        ref={dropdownRef}
        className="progress-card-kebab-menu"
        onClick={handleToggleOptions}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-three-dots-vertical"
          viewBox="0 0 16 16"
        >
          <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
        </svg>
        {toggleDropdown && (
          <div className="dropdown-menu">
            <button
              onClick={handleEditItem}
              className="btn btn-warning dropdown-item"
            >
              Modifier
            </button>
            <button
              onClick={handleDeleteItem}
              className="btn btn-danger dropdown-item"
            >
              Suprimer
            </button>
          </div>
        )}
      </div>
      <p className="progress-title">{progressItem?.title}</p>
      <div className="progress-wrapper">
        <span className="progress-value">{progressItem?.value}%</span>
        <div className="progress-thin">
          <div className="progress-bar" ref={ref}></div>
        </div>
      </div>

      {progressItem?.selected && (
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
