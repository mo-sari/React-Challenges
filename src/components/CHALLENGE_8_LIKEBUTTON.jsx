import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { ImSpinner10 } from "react-icons/im";
import "../assets/css/CHALLENGE_7.css";

const url = "https://www.greatfrontend.com/api/questions/like-button";

const CHALLENGE_8_LIKEBUTTON = () => {
  const [heart, setHeart] = useState({
    isLoading: false,
    liked: false,
  });

  const handleLike = async () => {
    setHeart({
      ...heart,
      isLoading: true,
    });
    try {
      const data = heart.liked ? "unlike" : "like";
      const res = await axios.post(
        url,
        { action: data },
        {
          "content-type": "application/json",
        }
      );
      if (res.data.message === "Success!") {
        setHeart({
          isLoading: false,
          liked: !heart.liked,
        });
      }
    } catch {
      setHeart({
        ...heart,
        isLoading: false,
      });
    }
  };

  // this is just a part of practice
  useEffect(() => {
    return () => {
      setHeart({
        isLoading: false,
        liked: false,
      });
    };
  }, []);

  return (
    <div>
      <button
        className="likebutton"
        style={{ width: "40px", height: "40px" }}
        onClick={handleLike}
      >
        {!heart.isLoading && !heart.liked ? (
          <CiHeart style={{ color: "grey", width: "25px", height: "25px" }} />
        ) : heart.isLoading ? (
          <ImSpinner10
            style={{ color: "blue", width: "25px", height: "25px" }}
          />
        ) : (
          <CiHeart style={{ color: "red", width: "25px", height: "25px" }} />
        )}
      </button>
    </div>
  );
};

export default CHALLENGE_8_LIKEBUTTON;
