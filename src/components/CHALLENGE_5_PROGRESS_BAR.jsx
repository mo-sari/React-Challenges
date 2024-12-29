import React, { useEffect, useState } from "react";
import "../assets/css/CHALLENGE_5.css";

const CHALLENGE_5_PROGRESS_BAR = ({ value = 25 }) => {
  const [percentage, setPercentage] = useState(value);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercentage((prev) => {
        if (prev >= 100) {
          return 100;
        }
        return prev + 1;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="content">
      <div style={{ margin: "1rem", fontSize: "1rem" }}>Progress Bar</div>
      <div className="progress">
        <div
          style={{ color: percentage > 50 ? "white" : "black" }}
          className="progress-text"
        >
          {" "}
          {percentage}{" "}
        </div>
        <span
          style={{ width: `${percentage}%` }}
          className="progress-color"
        ></span>
      </div>
    </div>
  );
};

export default CHALLENGE_5_PROGRESS_BAR;
