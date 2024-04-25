import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "styles/views/GameScreen.scss";
// @ts-ignore
import Card from "../ui/Card";
import Game from "models/Game";
import WSHandler from "../../helpers/wsHandler.js";
import CardObject from "../../models/CardObject";
import { Button } from "../ui/Button";
import WebPlayback from "../ui/Player";
import { UserStatWithIcon } from "../ui/UserStatWithIcon";

const GameScreen = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const [game, setGame] = useState(Game.deserialize(location.state.game));
  const [cardsStates, setCardsStates] = useState(() => {
    // Assuming location.state.cardsStates has a similar structure to the provided "cardsStates" value
    const initialState = location.state.cardsStates.cardStates;

    return Object.entries(initialState).map(([cardId, cardState]) => new CardObject(cardId, cardState));
  });
  const [scoreBoard, setScoreBoard] = useState(location.state.scoreBoard);

  const receiverFunction = (newDataRaw) => {
    const data = JSON.parse(newDataRaw.body);
    const gameChanges = data.gameChangesDto;
    if (!gameChanges.changed) {
      return;
    } else {
      setGame(prevGame => {
        let newGame: Game = { ...prevGame };
        for (const key in gameChanges.value) {
          const changed = gameChanges.value[key].changed;
          const value = gameChanges.value[key].value;
          // console.log(key, changed, value);
          if (changed) {
            newGame = newGame.doUpdate(key, value);
          }
        }

        return { ...newGame };
      });
    }

    // setting up new cards 
    if (data.cardsStates.changed) {
      const newCards = [];
      for (const cardId in data.cardsStates.value.cardStates) {
        newCards.push(new CardObject(cardId, data.cardsStates.value.cardStates[cardId]));
      }
      setCardsStates(newCards);
    }

    if (data.cardContent.changed) {
      setCardsStates(prevCards => {
        const cardToUpdate = data.cardContent.value.cardId;
        const newCards = [];
        for (const cardIdx in prevCards) {
          const card: CardObject = prevCards[cardIdx];
          console.log(data.cardContent.value);
          console.log(card, card.cardId, cardToUpdate);
          if (card.cardId === String(cardToUpdate)) {
            console.log("match");
            card.setContent({ ...data.cardContent.value });
          }
          newCards.push(card);
        }
        console.log("new cards + content", newCards);

        return newCards;
      });
    }

    if (data.scoreBoard.changed) {
      console.error("Scoreboard changed, but not implemented yet");
    }
    // console.log(data);
  };
  const ws = new WSHandler(`/games/${game.gameId}`,
    `/queue/games/${game.gameId}`,
    `/app/games/${game.gameId}`,
    receiverFunction);


  useEffect(() => {
    console.log("new game state", game);
    console.log("new card state", cardsStates);
    console.log(scoreBoard);

    const connectToWs = async () => {
      await ws.connect();
    };

    connectToWs();

  }, []);

  function flip(card) {
    console.log("flipped");
    // if (card.cardState === "FACEDOWN") {
    //   card.cardState = "FACEUP"
    // } else {
    //   console.log("cannot flip card that's already in play");
    // }
    ws.send(JSON.stringify({ "cardId": Number(card.cardId) }));
  }


  const [gameFinished, setGameFinished] = useState(false);
//   const [cards, setCards] = useState(cardData);
//   const [currentlyFlipped, setCurrentlyFlipped] = useState([]);
  const [showMessage, SetShowMessage] = useState("");
//   const [matchedPairs, setMatchedPairs] = useState([]);
//   const [activePlayerIndex, setActivePlayerIndex] = useState("");
//   const userid: string = localStorage.getItem("userid");

//   // const ws: wsHandler = location.state.ws;
//   const [game, setGame] = useState(Game.deserialize(location.state.game));
//   // const initialGameId = game.gameId;
//
//   //websocket specific:
//   const receiverFunction = (newDataRaw) => {
//     const data = JSON.parse(newDataRaw.body);
//     console.log(data);
//     const gameChanges = data.gameChangesDto;
//     const cardStates = data.cardStates;
//     const cardContent = data.cardContent;
//     const scoreBoard = data.scoreBoard;
//
//     if (!gameChanges.changed) {
//       // pass
//     } else {
//       setGame(prevGame => {
//         let newGame: Game = {...prevGame};
//         for (const key in gameChanges.value) {
//           const changed = gameChanges.value[key].changed;
//           const value = gameChanges.value[key].value;
//           if (changed) {
//             newGame = newGame.doUpdate(key, value);
//             console.log("doing",  {...prevGame});
//           }
//
//           return {...newGame};
//         }
//       })
//     }
//
//
//
//   }
//
//
//   async function fetchData() {
//     try {
//       // console.log(initialGameId);
//       // const response = await api.get(`/games/${initialGameId}`);
//       // const gameStart = response.data;
//       //setGame(Game(gameStart));
//
//       return game;
//
//     } catch (error) {
//       console.error(`Something went wrong while fetching the Game: \n${handleError(error)}`);
//     }
//   }
//
//   useEffect(() => {
//     const fetchDataAndConnect = async () => {
//       // await fetchData();
//       console.log("fetchDataAndConnect called");
//       console.log(game);
//       // await ws.setReceiverFunction(receiverFunction);
//     };
//     fetchDataAndConnect().catch(error => {
//       alert("Something went wrong in the initialisation of the individual lobby. Please consult the admin");
//     });
//
//   }, []);
//
//   //componentspecifics
//
//   useEffect(() => {
//     if (matchedPairs.length === cards.length ) {
//       setGameFinished(prev => !prev);
//     }
//
//   }, [matchedPairs, cards.length]);
//
//   useEffect(() => {
//     if (currentlyFlipped.length === 2 ) {
//       const [firstCardId, secondCardId] = currentlyFlipped;
//
//       setCards(prevCards => {
//         const firstCard = findCardById(prevCards, firstCardId);
//         const secondCard = findCardById(prevCards, secondCardId);
//
//         if (firstCard.sameIdx === secondCard.sameIdx && firstCard.id !== secondCard.id) {
//           console.log("found a pair");
//           setMatchedPairs(prev => [...prev, firstCard.sameIdx]);
//           displayMsg("Found a pair, your awesome!", 2000);
//         } else {
//           displayMsg("Sorry, try again :(", 2000);
//           setTimeout(() => {
//             setCards(prevCards => prevCards.map(card => {
//               if (card.isFlipped) {
//                 return { ...card, isFlipped: false };
//               }
//
//               return card;
//             }));
//           }, 1000);
//         }
//         setCurrentlyFlipped([]);
//
//         // Return the updated cards
//         return prevCards;
//       });
//     }
//   }, [currentlyFlipped]);
//
//   useEffect(() => {
//     //initialise spotify sdk
//   }, []);
//
//   function displayMsg(msg, ms) {
//     SetShowMessage(msg);
//     setTimeout(() => {
//       SetShowMessage("");
//     }, ms);
//   }
//
//   function findCardById(cards, id) {
//     return cards.find(card => card.id === id);
//   }
//
//   function playSong(){
//
//     //TODO Diyar, please implement
//
//   }
//
//
//   function flip(id: number) {
//
//     if (matchedPairs.includes(findCardById(cards, id).sameIdx) || userid !== activePlayerIndex ) {
//       return;
//     }
//
//     //api: call
//     //TODO Diyar please implement logic what happends if player flips a card, what do we have to send and what do we have to update
//     wsHandler.send()
//
//
//     setCards(prevCards => {
//       const newCards = prevCards.map(card => {
//         if (card.id === id) {
//           return {
//             ...card, isFlipped: !card.isFlipped, content: card.content === "Background" ? "Foreground" : "Background",
//           };
//         }
//
//         return card;
//       });
//
//       return newCards;
//     });
//
//     setCurrentlyFlipped(prevFlipped => [...prevFlipped, id]);
//   }
//
//
//   function restartGame() {
//     setGameFinished(false);
//     setCards(cardData);
//     setCurrentlyFlipped([]);
//     SetShowMessage("");
//     setMatchedPairs([]);
//   }
//
//
//   return (<BaseContainer>
//     <script src="https://sdk.scdn.co/spotify-player.js"></script>
//     <div className="BaseContainer">
//       <div className="screen-gridhandler">
//         <div className="BaseDivGame col6">
//           <div className="basicCardContainer">
//             {cards.map((card, index) => (
//               <Card key={card.id} isFlipped={card.isFlipped} isGreyed={matchedPairs.includes(card.sameIdx)}
//                     content={card.content}
//                     flip={() => flip(card.id)} />))}
//           </div>
//         </div>
//         <div className="BaseDivGame col7">
//           <div className="gridhandler-stats">
//             <div className="gameMessageposition">
//               {showMessage && !gameFinished && <div className="alert gameMessageContainer">
//                 <div className="gameMessage">{showMessage}</div>
//               </div>}
//             </div>
//             <div className="stats">
//               <h2 className="h2-title">Current Score</h2>
//               <UserStatWithIcon className="test" username={"Henry"} currentStanding={"1"} />
//               <UserStatWithIcon username={"Elias"} currentStanding={"2"} />
//               <UserStatWithIcon username={"Niklas"} currentStanding={"3"} />
//               <UserStatWithIcon username={"Diyar"} currentStanding={"4"} />
//             </div>
//             <div>
//               <Button width={"100%"}>Leave Game</Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </BaseContainer>);

  return (
    <div>
      <script src="https://sdk.scdn.co/spotify-player.js"></script>
      <div className="BaseContainer">
        <div className="screen-gridhandler">
          <div className="BaseDivGame col6">
            <div className="basicCardContainer">
              {cardsStates.map((card, index) => (
                <Card key={card.cardId} isFlipped={card.cardState} cardobj={card} flip={() => flip(card)} />
              ))}
            </div>
          </div>
          <div className="BaseDivGame col7">
            <div className="gridhandler-stats">
              <div className="spotifyplayercontainer">
              <WebPlayback token={localStorage.getItem("accessToken")}></WebPlayback>
              </div>
              <div className="gameMessageposition">
                {showMessage && !gameFinished && <div className="alert gameMessageContainer">
                  <div className="gameMessage">{showMessage}</div>
                </div>}
              </div>
              <div className="stats">
                <h2 className="h2-title">Current Score</h2>
                {/*<UserStatWithIcon className="test" username={"Henry"} currentStanding={"1"} />*/}
                {/*<UserStatWithIcon username={"Elias"} currentStanding={"2"} />*/}
                {/*<UserStatWithIcon username={"Niklas"} currentStanding={"3"} />*/}
                {/*<UserStatWithIcon username={"Diyar"} currentStanding={"4"} />*/}
              </div>
              <div>
                <Button width={"100%"}>Leave Game</Button>
              </div>
            </div>

          </div>
        </div>
        {/*<Button onClick={() => initialise()}>initialise</Button>*/}
      </div>
      </div>

      );

      };

      export default GameScreen;
