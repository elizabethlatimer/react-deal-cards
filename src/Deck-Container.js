import React, { useState, useEffect, useRef } from 'react';
import './Deck-Container.css';
import Card from "./Card"
import axios from 'axios';

const BASE_URL = "https://deckofcardsapi.com/api/deck"

function DeckContainer() {
  console.log("Deck container being rendered")
  const [numberDrawn, setNumberDrawn] = useState(0);
  const [currentDeck, setCurrentDeck] = useState([]);
  const deckId = useRef();
  console.log(numberDrawn)

  useEffect(() => {
    async function getDeckId() {
      const deck = await axios.get(
        `${BASE_URL}/new/shuffle/?deck_count=1`
      );
      deckId.current = deck.data.deck_id;
    }

    getDeckId();
  }, []
  );

  useEffect(() => {
    async function drawCard() {
      const newCard = await axios.get(
        `${BASE_URL}/${deckId.current}/draw/?count=1`
      );

      let { image, value, suit } = newCard.data.cards[0];

      setCurrentDeck(oldDeck => ([...oldDeck, { image, value, suit }]))
    }

    drawCard();
  }, [numberDrawn]
  );

  function handleClick() {
    setNumberDrawn(n => n + 1);
  }

  return (
    <div className="Deck-Container">
      <button onClick={handleClick}>Gimme a Card</button>
      {numberDrawn > 52 ? <p>Error: No Cards Remaining</p> : null}
      {currentDeck.map(card => <Card key={`${card.value} of ${card.suit}`} image={card.image} value={card.value} suit={card.suit}/>)}
    </div>
  )


}

export default DeckContainer;