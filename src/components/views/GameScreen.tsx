import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "styles/views/GameScreen.scss";
import BaseContainer from "../ui/BaseContainer";
import { UserStatWithIcon } from "../ui/UserStatWithIcon";
import { Button } from "../ui/Button";
import cardData from "../../models/SetofCardData.js";
// @ts-ignore
import Card from "../ui/Card";


const Game = () => {
  // use react-router-dom's hook to access navigation, more info: https://reactrouter.com/en/main/hooks/use-navigate
  const navigate = useNavigate();

  const [gameFinished, setGameFinished] = useState(false);
  const [cards, setCards] = useState(cardData);
  const [currentlyFlipped, setCurrentlyFlipped] = useState([]);
  const [showMessage, SetShowMessage] = useState("");
  const [matchedPairs, setMatchedPairs] = useState([]);

  useEffect(() => {
    if (matchedPairs.length === cards.length) {
      setGameFinished(prev => !prev);
    }

  }, [matchedPairs, cards.length]);

  useEffect(() => {
    if (currentlyFlipped.length === 2) {
      const [firstCardId, secondCardId] = currentlyFlipped;

      setCards(prevCards => {
        const firstCard = findCardById(prevCards, firstCardId);
        const secondCard = findCardById(prevCards, secondCardId);

        if (firstCard.sameIdx === secondCard.sameIdx && firstCard.id !== secondCard.id) {
          console.log("found a pair");
          setMatchedPairs(prev => [...prev, firstCard.sameIdx]);
          displayMsg("Found a pair, your awesome!", 2000);
        } else {
          displayMsg("Sorry, try again :(", 2000);
          setTimeout(() => {
            setCards(prevCards => prevCards.map(card => {
              if (card.isFlipped) {
                return { ...card, isFlipped: false };
              }

              return card;
            }));
          }, 1000);
        }
        setCurrentlyFlipped([]);

        // Return the updated cards
        return prevCards;
      });
    }
  }, [currentlyFlipped]);

  function displayMsg(msg, ms) {
    SetShowMessage(msg);
    setTimeout(() => {
      SetShowMessage("");
    }, ms);
  }

  function findCardById(cards, id) {
    return cards.find(card => card.id === id);
  }


  function flip(id: number) {

    if (matchedPairs.includes(findCardById(cards, id).sameIdx)) {
      return;
    }

    setCards(prevCards => {
      const newCards = prevCards.map(card => {
        if (card.id === id) {
          return {
            ...card, isFlipped: !card.isFlipped, content: card.content === "Background" ? "Foreground" : "Background",
          };
        }

        return card;
      });

      return newCards;
    });

    setCurrentlyFlipped(prevFlipped => [...prevFlipped, id]);
  }


  function restartGame() {
    setGameFinished(false);
    setCards(cardData);
    setCurrentlyFlipped([]);
    SetShowMessage("");
    setMatchedPairs([]);

  }


  return (<BaseContainer>
    <div className="BaseContainer">
      <div className="screen-gridhandler">
        <div className="BaseDivGame col6">
          <div className="basicCardContainer">
            {cards.map((card, index) => (
              <Card key={card.id} isFlipped={card.isFlipped} isGreyed={matchedPairs.includes(card.sameIdx)}
                    content={card.content}
                    flip={() => flip(card.id)} />))}
          </div>
        </div>
        <div className="BaseDivGame col7">
          <div className="gridhandler-stats">
            <div className="gameMessageposition">
              {showMessage && !gameFinished && <div className="alert gameMessageContainer">
                <div className="gameMessage">{showMessage}</div>
              </div>}
            </div>
            <div className="stats">
              <h2 className="h2-title">Current Score</h2>
              <UserStatWithIcon className="test" username={"Henry"} currentStanding={"1"} />
              <UserStatWithIcon username={"Elias"} currentStanding={"2"} />
              <UserStatWithIcon username={"Niklas"} currentStanding={"3"} />
              <UserStatWithIcon username={"Diyar"} currentStanding={"4"} />
            </div>
            <div>
              <Button width={"100%"}>Leave Game</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </BaseContainer>);


};

export default Game;
