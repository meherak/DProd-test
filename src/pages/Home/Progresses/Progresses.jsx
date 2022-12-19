import React, { useState } from "react";

import ProgressBar from "shared/components/ProgressBar";

import "./Progresses.css";

const Progresses = () => {
  const [progressArray, setProgressArray] = useState([
    { title: "Initialisation de test technique", value: 50, id: 0 },
    { title: "Avancement de la phase dévelopement", value: 20, id: 1 },
  ]);

  const handleProgress = (step) => {
    setProgressArray((prev) => {
      const result = prev.map((item) => {
        if (item.value + step <= 100) {
          return { ...item, value: item.value + step };
        } else return item;
      });
      return result;
    });
  };

  const handleResetProgress = () => {
    setProgressArray((prev) => {
      const result = prev.map((item) => {
        return { ...item, value: 0 };
      });
      return result;
    });
  };

  return (
    <div className="progresses">
      <div className="progresses-content">
        {progressArray.map((item, index) => (
          <ProgressBar progressItem={item} key={index} />
        ))}
      </div>
      <div className="progresses-control">
        <button className="btn" onClick={handleResetProgress}>
          Remèttre à zero les compteurs
        </button>
        <button className="btn" onClick={() => handleProgress(5)}>
          Ajouter 5%
        </button>
        <button className="btn" onClick={() => handleProgress(10)}>
          Ajouter 10%
        </button>
      </div>
    </div>
  );
};

export default Progresses;
