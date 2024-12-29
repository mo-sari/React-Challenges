import React, { useEffect, useState } from "react";
import "../assets/css/CHALLENGE_6.css";

const CHALLENGE_6_GRIDLIGHTS = () => {
  const [actives, setActives] = useState([]);

  const handleActivate = (i) => {
    setActives((prev) => {
      return [...prev, i];
    });
  };

  useEffect(() => {
    if (actives.length === 8) {
      const interval = setInterval(() => {
        setActives((prev) => {
          if (prev.length > 0) {
            return prev.slice(0, -1);
          }
          clearInterval(interval);
          return prev;
        });
      }, 100);
    }
  }, [actives]);
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "50vw",
        height: "50vh",
        background: "white",
      }}
    >
      <div className="container">
        {[...Array(9)].map((d, i) => {
          return (
            <button
              key={i}
              className={` ${actives.includes(i) ? "activated" : ""}`}
              style={{ opacity: i === 4 ? "0" : "1" }}
              onClick={() => handleActivate(i)}
              disabled={i === 4 ? true : false}
            ></button>
          );
        })}
      </div>
    </div>
  );
};

export default CHALLENGE_6_GRIDLIGHTS;
