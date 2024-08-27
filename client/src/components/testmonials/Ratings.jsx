import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";

const Ratings = ({ rating }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => {
        const ratingValue = i + 1;
        const ratingHalf = 0.5 + i;

        return (
          <span key={i}>
            {ratingValue <= rating ? (
              <FaStar color="#FABC3F" />
            ) : ratingHalf <= rating ? (
              <FaStarHalfAlt color="#FABC3F" />
            ) : (
              <FaRegStar color="#45474B" />
            )}
          </span>
        );
      })}
    </div>
  );
};

export default Ratings;
