import React, { useEffect, useState } from "react";
import { CHALLENGE_9_HELPER } from "./CHALLENGE_9_HELPER";
import axios from "axios";

const CHALLENGE_9_1_JOBBOARD = () => {
  const [ids, setIds] = useState([]);
  const [count, setCount] = useState(6);

  const fetchData = async () => {
    try {
      const res = await axios(
        "https://hacker-news.firebaseio.com/v0/jobstories.json"
      );
      setIds(res.data);
    } catch {
      console.log("an error occured");
    }
  };

  const handleLoadMore = () => {
    if (count < ids.length) {
      setCount((prev) => {
        return prev + 6;
      });
    } else return;
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div>
        {ids.slice(0, count).map((i) => {
          return <CHALLENGE_9_HELPER id={i} key={i} />;
        })}
      </div>
      <button
        disabled={count > ids.length ? true : false}
        onClick={handleLoadMore}
      >
        {" "}
        load more
      </button>
    </>
  );
};

export default CHALLENGE_9_1_JOBBOARD;
