import React from 'react';
import './Card.css';

function Card({image, value, suit}) {
  return (
    <div className="Card">
      <img src={image} alt={`${value} of ${suit}`} />
    </div>
  )
}

export default Card;