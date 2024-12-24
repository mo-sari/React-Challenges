import React, { useState } from "react";

export const CHALLENGE_1_FOLDER = ({ explorer }) => {
  const [data, setData] = useState(explorer);
  const [showChildren, setShowChildren] = useState(false);

  if (data.isFolder) {
    return (
      <>
        <div onClick={() => setShowChildren(!showChildren)}>
          {" "}
          📁 {data.name}{" "}
        </div>
        <div style={{ display: showChildren ? "inline" : "none" }}>
          <ul>
            {data?.items?.map((d) => {
              return <CHALLENGE_1_FOLDER explorer={d} />;
            })}
          </ul>
        </div>
      </>
    );
  } else {
    return <div>🗄 {data.name}</div>;
  }
};
