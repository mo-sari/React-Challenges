import axios from "axios";
import React, { useEffect, useState } from "react";

export const CHALLENGE_9_HELPER = ({ id }) => {
  const [data, setData] = useState({});

  const fetchSingleData = async () => {
    try {
      const res = await axios(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json`
      );
      setData(res.data);
    } catch {
      console.log("some error happend in child component");
    }
  };

  useEffect(() => {
    fetchSingleData();
  }, [id]);

  const formatTime = (timeStamp) => {
    if (!timeStamp) return;
    const date = new Date(timeStamp * 1000);

    return date.toISOString();
  };

  formatTime();

  return (
    <div style={{ border: "1px solid green", marginBottom: "0.2rem" }}>
      <h2>{data?.title}</h2>
      <p>
        By {data?.by} . {formatTime(data?.time)}
      </p>
    </div>
  );
};
