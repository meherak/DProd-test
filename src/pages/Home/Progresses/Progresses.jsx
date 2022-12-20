import React, { useState } from "react";

import ProgressBar from "shared/components/ProgressBar";

import "./Progresses.css";

const Progresses = () => {
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [progressArray, setProgressArray] = useState([
    {
      id: 0,
      value: 50,
      selected: false,
      title: "Initialisation de test technique",
    },
    {
      id: 1,
      value: 20,
      selected: false,
      title: "Avancement de la phase dévelopement",
    },
  ]);

  const handleProgress = (step) => {
    setProgressArray((prev) => {
      const newProgresses = prev.map((item) => {
        if (item.value + step <= 100 && item.selected) {
          return { ...item, value: item.value + step };
        } else return item;
      });
      return newProgresses;
    });
  };

  const handleResetProgress = () => {
    setProgressArray((prev) => {
      const newProgresses = prev.map((item) => {
        if (item.selected) return { ...item, value: 0 };
        return item;
      });
      return newProgresses;
    });
  };

  return (
    <div className="progresses">
      <div className="progresses-content">
        {progressArray.map((item, index) => (
          <ProgressBar
            key={index}
            progressItem={item}
            setDisabledBtn={setDisabledBtn}
            setProgressArray={setProgressArray}
          />
        ))}
      </div>
      <div className="progresses-control">
        <button
          className="btn"
          disabled={disabledBtn}
          onClick={handleResetProgress}
        >
          Remèttre à zero le compteur
        </button>
        <button
          className="btn"
          disabled={disabledBtn}
          onClick={() => handleProgress(5)}
        >
          Ajouter 5%
        </button>
        <button
          className="btn"
          disabled={disabledBtn}
          onClick={() => handleProgress(10)}
        >
          Ajouter 10%
        </button>
      </div>
    </div>
  );
};

export default Progresses;
