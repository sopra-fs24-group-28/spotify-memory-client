import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "styles/views/GameScreen.scss";
// @ts-ignore
import Card from "../ui/Card";
import Game from "models/Game";
import WSHandler from "../../helpers/wsHandler.js";
import CardObject from "../../models/CardObject";

const GameScreen = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const [game, setGame] = useState(Game.deserialize(location.state.game));
  const [cardsStates, setCardsStates] = useState(() => {
    // Assuming location.state.cardsStates has a similar structure to the provided "cardsStates" value
    const initialState = location.state.cardsStates.cardStates;
    return Object.entries(initialState).map(([cardId, cardState]) => new CardObject(cardId, cardState));
  });
  const [cardContent, setCardContent] = useState(location.state.cardContent);
  const [scoreBoard, setScoreBoard] = useState(location.state.scoreBoard);

  const receiverFunction = (newDataRaw) => {
    const data = JSON.parse(newDataRaw.body);
    // handling only gameChanges here, because other parts of game will not change in wainting room
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
    // store all other ws updates to send on later
    if (data.cardsStates.changed) {
      setCardsStates(data.cardsStates.value);
    }
    if (data.cardContent.changed) {
      setCardContent(data.cardContent.value);
    }
    if (data.scoreBoard.changed) {
      setScoreBoard(data.scoreBoard.value);
    }
    console.log(data);
  };
  const ws = new WSHandler(`/games/${game.gameId}`,
    `/queue/games/${game.gameId}`,
    `/app/games/${game.gameId}`,
    receiverFunction);


  useEffect(() => {
    console.log(game);
    console.log(cardsStates);
    console.log(cardContent);
    console.log(scoreBoard);

    const connectToWs = async () => {
      await ws.connect();
    };

    connectToWs();

  }, []);

  function flip(card) {
    console.log("flipped");
    card.cardState = "FACEUP"
    ws.send(JSON.stringify({ "cardId" : Number(card.cardId)} ));
  }

//   const [gameFinished, setGameFinished] = useState(false);
//   const [cards, setCards] = useState(cardData);
//   const [currentlyFlipped, setCurrentlyFlipped] = useState([]);
//   const [showMessage, SetShowMessage] = useState("");
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
                <Card key={card.cardId} isFlipped={card.cardState} flip={() => flip(card)} />))}
            </div>
          </div>
        </div>
      </div>
    </div>

  );

};

export default GameScreen;
