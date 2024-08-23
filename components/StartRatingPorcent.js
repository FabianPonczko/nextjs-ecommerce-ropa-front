import React from 'react';
import { AiFillStar} from 'react-icons/ai';
import { IoStarSharp,IoStarOutline  } from "react-icons/io5";


const StarRatingPorcent = ({ percentage }) => {
  const totalStars = 5;
  const filledStars = (percentage / 5) * totalStars;

  return (
    <div style={{ display: 'flex' }}>
      {[...Array(totalStars)].map((star, index) => {
        const fill = Math.min(filledStars - index, 1);

        return (
          <div key={index} style={{ position: 'relative', width: 20, height: 20 }}>
            <IoStarOutline
              size={19}
              color="#c5c6c7"
              style={{ position: 'absolute', top: -0.50, left: -0.5 }}
            />
            <IoStarSharp
              size={18}
              color="#ffc107"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                clipPath: `inset(0 ${100 - fill * 100}% 0 0)`
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default StarRatingPorcent;
