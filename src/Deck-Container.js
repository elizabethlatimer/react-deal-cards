import React, { useState, useEffect, useRef } from 'react';
import './Deck-Container.css';
import Card from "./Card"
import axios from 'axios';

const BASE_URL = "https://deckofcardsapi.com/api/deck"

function DeckContainer() {
  const [numberDrawn, setNumberDrawn] = useState(0);
  const [currentDeck, setCurrentDeck] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false)

  const deckId = useRef();
  const timerId = useRef();

  useEffect(() => {
    async function getDeckId() {
      const deck = await axios.get(
        `${BASE_URL}/new/shuffle/?deck_count=1`
      );
      deckId.current = deck.data.deck_id;
    }

    getDeckId();
  }, []);

  useEffect(() => {
    async function drawCard() {
      const newCard = await axios.get(
        `${BASE_URL}/${deckId.current}/draw/?count=1`
      );

      let { image, value, suit } = newCard.data.cards[0];

      setCurrentDeck(oldDeck => ([...oldDeck, { image, value, suit }]))
    }
    if (numberDrawn !== 0 && numberDrawn < 52) {
      drawCard();
    }
  }, [numberDrawn, timerId]);

  function handleClick() {
    if (!isDrawing) {
      setIsDrawing(true);
      timerId.current = setInterval(() => {
        setNumberDrawn(n => n + 1);
      }, 500);
    } else {
      setIsDrawing(false)
      clearInterval(timerId.current);
    }
  }

  function cardList() {
    return currentDeck.map(card => (<Card
      key={`${card.value} of ${card.suit}`}
      image={card.image}
      value={card.value}
      suit={card.suit} />))
  }

  return (
    <div className="Deck-Container">
      {numberDrawn >= 52
        ? <p>No Cards Remaining</p>
        : <button onClick={handleClick}>{
          !isDrawing
            ? "Start Drawing"
            : "Stop Drawing"}
        </button>}
      {cardList()}
    </div>
  )


}

export default DeckContainer;