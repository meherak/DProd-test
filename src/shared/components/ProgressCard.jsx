import React, { useEffect, useRef, useState } from "react";

import { icons } from "shared/utils";
import { getColor } from "shared/utils";
import { useModal } from "shared/hooks";
import { Modal } from "shared/components/Modal";
import { useOutsideClickEvent } from "shared/hooks";
import { ProgressItemManager } from "shared/components/ProgressItemManager";

import "./ProgressCard.css";

export const ProgressCard = ({ progressItem, setProgressArray }) => {
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const { isShowing, toggle } = useModal(false);

  const dropdownRef = useRef();
  const progressBarRef = useRef();

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
    toggle();
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
    if (progressBarRef.current == null) {
      return;
    }
    const color = getColor(progressItem.value);
    progressBarRef.current.style.backgroundColor = color;
    progressBarRef.current.style.width = `${progressItem.value}%`;
  }, [progressItem?.value]);

  return (
    <>
      <Modal isShowing={isShowing} toggle={toggle}>
        <ProgressItemManager toggle={toggle} />
      </Modal>
      <div
        className={`progress-card ${
          progressItem.selected ? "selected" : ""
        }`.trim()}
        onClick={handleSelect}
      >
        <div
          ref={dropdownRef}
          onClick={handleToggleOptions}
          className="progress-card-kebab-menu"
        >
          {icons.kebabIcon}
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
        <p className="progress-title">{progressItem.title}</p>
        <div className="progress-wrapper">
          <span className="progress-value">{progressItem.value}%</span>
          <div className="progress-thin">
            <div className="progress-bar" ref={progressBarRef}></div>
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
    </>
  );
};
