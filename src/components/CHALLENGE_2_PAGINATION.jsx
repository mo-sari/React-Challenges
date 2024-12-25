import axios from "axios";
import React, { useEffect, useState } from "react";
import "../assets/css/CHALLENGE_2.css";

const CHALLENGE_2_PAGINATION = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios("https://dummyjson.com/products?limit=100");
        if (res.data && res.data.products) {
          setData(res.data.products);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (page < data.length / 10) {
      setPage(page + 1);
    }
  };

  return (
    <>
      <div className="container">
        {data.slice(page * 10 - 10, page * 10).map((d) => {
          return (
            <span key={d.id}>
              <p className="title">{d.title}</p>
              <img src={d.thumbnail} alt={d.title} />
            </span>
          );
        })}
      </div>
      <div className="footer">
        <span
          style={{ opacity: page > 1 ? "1" : "0" }}
          onClick={handlePrevious}
        >
          ◀
        </span>
        {[...Array(data?.length / 10)].map((_, i) => {
          return (
            <span
              style={{ background: page === i + 1 ? "green" : "" }}
              onClick={() => setPage(i + 1)}
              key={i}
            >
              {i}
            </span>
          );
        })}
        <span
          style={{ opacity: page < data.length / 10 ? "1" : "0" }}
          onClick={handleNext}
        >
          ▶
        </span>
      </div>
    </>
  );
};

export default CHALLENGE_2_PAGINATION;
