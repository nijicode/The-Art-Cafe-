import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";

const InputRatings = ({ rating, setRating }) => {
  const [hover, setHover] = useState(null);

  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => {
        const ratingValue = i + 1;
        return (
          <span key={i}>
            <label className="cursor-pointer">
              <input
                type="radio"
                name="rating"
                value={ratingValue}
                hidden
                onClick={() => setRating(ratingValue)}
              />
              {ratingValue <= (hover || rating) ? (
                <FaStar
                  color="#FABC3F"
                  size={20}
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(null)}
                />
              ) : (
                <FaRegStar
                  color="#45474B"
                  size={20}
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(null)}
                />
              )}
            </label>
          </span>
        );
      })}
    </div>
  );
};

export default InputRatings;
