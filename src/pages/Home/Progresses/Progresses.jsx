import React, { useState } from "react";

import ProgressCard from "shared/components/ProgressCard";

import "./Progresses.css";

const Progresses = () => {
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

  return (
    <div className="progresses">
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

export default Progresses;
