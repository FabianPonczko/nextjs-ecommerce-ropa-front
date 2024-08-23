// StarRating.js
import React, { useState } from 'react';
import styled from 'styled-components';

const StarRatingWrapper = styled.div`
  display: inline-flex;
  cursor: pointer;
  `;
  
  const Star = styled.span`
  font-size: 1.5rem;
  color: ${(props) => (props.filled ? '#ffc107' : '#ccc')};
  transition: color 0.2s;
`;

const StarRating = ({ totalStars = 5, onRate ,isDisabled} ) => {
  
  const [rating, setRating] = useState(onRate);
  const [hover, setHover] = useState(null);
  const [disabled, setDisabled] = useState(isDisabled);
  
  
  const handleClick = (index) => {
    setRating(index + 1);
    if (onRate) {
      onRate(index + 1);
    }
  };

  const handleMouseEnter = (index) => {
    setHover(index + 1);
  };

  const handleMouseLeave = () => {
    setHover(null);
  };

  return (
    <StarRatingWrapper>
      {[...Array(totalStars)].map((_, index) => (
        isDisabled ? 
         <Star
          key={index}
          filled={index < (hover || rating || onRate)}
        >
          ★
        </Star>
        :
        <Star
        key={index}
        filled={index < (hover || rating)}
        onClick={() => handleClick(index)}
        onMouseEnter={() => handleMouseEnter(index)}
        onMouseLeave={handleMouseLeave}
      >
        ★
      </Star>
        
      ))}
    </StarRatingWrapper>
  );
};

export default StarRating;
