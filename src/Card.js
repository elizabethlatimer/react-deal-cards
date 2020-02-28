import React from 'react';
import './Card.css';

function Card({image, value, suit}) {
  console.log("Card being rendered")
  return (
    <div className="Card">
      <img src={image} alt={`${value} of ${suit}`} />
    </div>
  )
}

export default Card;