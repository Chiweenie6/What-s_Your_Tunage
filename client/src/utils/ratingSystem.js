import React, { useState } from "react";
import { FaMusic } from "react-icons/fa";

const RatingSystem = () => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  return (
    <div>
      {[...Array(6)].map((icon, i) => {
        const ratingValue = i + 1;
        return (
          <label>
            <input
              type="radio"
              style={{opacity: "0"}}
              name="rating"
              value={ratingValue}
              onClick={() => setRating(ratingValue)}
              
            />
            <FaMusic
              className="musicNote"
              size={100}
              color={ratingValue <= (hover || rating) ? "F97B22" : "ECF2FF"}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </div>
  );
};

export default RatingSystem;
