import axios from "axios";
import React, { useEffect, useState } from "react";
import "../assets/css/CHALLENGE_2.css";

const CHALLENGE_2_PAGINATION = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const RoundedValueComponent = (value) => {
    const roundedValue = Math.round(value);
    return roundedValue;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios(
          ` https://dummyjson.com/products?limit=19&skip=${
            page * 19 - 19
          }&select=thumbnail,title`
        );

        setData(res.data.products);
        setTotalPages(RoundedValueComponent(res.data.total / 18));
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [page]);

  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const handleNext = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };
  console.log(totalPages, page);

  return (
    <>
      <div className="container">
        {data.map((d) => {
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
        {[...Array(totalPages)].map((_, i) => {
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
          style={{ opacity: page < totalPages ? "1" : "0" }}
          onClick={handleNext}
        >
          ▶
        </span>
      </div>
    </>
  );
};

export default CHALLENGE_2_PAGINATION;
