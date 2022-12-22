import React, { useState } from "react";

import { ProgressCard } from "shared/components/ProgressCard";

import "./Progresses.css";

export const Progresses = () => {
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

  const handleAddItem = () => {
    const newItem = {
      id: progressArray.length + 1,
      value: 0,
      selected: false,
      title: "Nouvelle barre de progression",
    };
    setProgressArray((prev) => {
      return [newItem, ...prev];
    });
  };

  return (
    <div className="progresses">
      <div className="progresses-header">
        <button className="btn btn-success" onClick={handleAddItem}>
          Ajouter
        </button>
      </div>
      <div className="progresses-content">
        {progressArray.map((item, index) => (
          <ProgressCard
            key={index}
            progressItem={item}
            setProgressArray={setProgressArray}
          />
        ))}
      </div>
    </div>
  );
};
