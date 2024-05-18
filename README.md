## Introduction

By combining the concentration game with Spotify, Spotimemory creates a competitive and fun game to play among friends.
This is the
repository of the front-end part of our implementation, you'll find the back-end part of our
application [here](https://github.com/sopra-fs24-group-28/spotify-memory-server).

## Technologies

The client is written in TypeScript and JavaScript using React.

We used REST communication to communicate between the front and backend for basic communication. In order to get a
smooth in game experience, a stomp websocket connection gets established.

## High-level components

The [LobbyOverview](https://github.com/sopra-fs24-group-28/spotify-memory-client/blob/main/src/components/views/LobbyOverview.tsx)
view allows the users to either create a new lobby or join an existing one.
When creating a new lobby, this player is regarded as the host and can thus define various game parameters
in [the customization view](https://github.com/sopra-fs24-group-28/spotify-memory-client/blob/main/src/components/views/CustomizeGameParameter.tsx)
such as the game mode, the number of cards, number of decks etc. In
addition, the user can choose one of his personal playlists for this round. After customising, the lobby is visible for
the other players and can be joined by them. Then will lead to a rerouting to the lobby waiting room which is an
intermediate state where the host waits until all his
friends joined the lobby.

The host can decide to start a round by pressing `start` in
the [waiting room](https://github.com/sopra-fs24-group-28/spotify-memory-client/blob/main/src/components/views/LobbyWaitingRoom.tsx).
This will reroute all users to
the [main game page](https://github.com/sopra-fs24-group-28/spotify-memory-client/blob/main/src/components/views/GameScreen.tsx).

Depending on the game customization settings the players now pick cards, listen to the respective songs (or inspect the
albumcover) and try to match pairs.
The observing players can see the same content at the same time thanks to our websockets.
Whenever the active player matches two or more correct cards he or she will get another chance.
In
the [main game page](https://github.com/sopra-fs24-group-28/spotify-memory-client/blob/main/src/components/views/GameScreen.tsx)
all players can observe the current scoreboard.

The game ends when the last set of cards was correctly picked. In that case all players are redirected to
the [PostGame screen](https://github.com/sopra-fs24-group-28/spotify-memory-client/blob/main/src/components/views/LobbyOverview.tsx).
All Players can inspect the scoreboard.
Non-hosts can leave the current lobby and are then redirected to
the [LobbyOverview](https://github.com/sopra-fs24-group-28/spotify-memory-client/blob/main/src/components/views/LobbyOverview.tsx)
while the host also has the option to start the next round with the current players or wait for others to join.

Lastly,
the [Profilepage](https://github.com/sopra-fs24-group-28/spotify-memory-client/blob/main/src/components/views/ProfilePage.tsx)
allows users to inspect their account and get statistics about their performance.

The [GameController](https://github.com/sopra-fs22-group-17/RaveWave-client/blob/master/src/components/views/GameController.tsx)
controls the game states as soon as the stomp websocket connection is established. The GameController subscribes as a
listener and handles the different game states and decides which views are rendered.

## Launch & Deployment

- npm run dev

  Runs the app in the development mode.
  Open http://localhost:3000 to view it in the browser.

  The page will reload if you make edits.
  You will also see any lint errors in the console.

- npm run build

  Builds the app for production to the build folder.
  It correctly bundles React in production mode and optimizes the build for the best performance.

  Your app is ready to be deployed!

## Illustrations

[//]: # (<h3 align="center">)

[//]: # (  <br>)

[//]: # (  <a href="https://github.com/soprafs22-group17"><img src="/ReadMePics/a.png" alt="RaveWave" width="200"></a>)

[//]: # (  <br>)

[//]: # (  Landinghost - As a host you can log in or register.)

[//]: # (  <br>)

[//]: # (</h3>)

[//]: # (<h3 align="center">)

[//]: # (  <br>)

[//]: # (  <a href="https://github.com/soprafs22-group17"><img src="/ReadMePics/b.png" alt="RaveWave" width="200"></a>)

[//]: # (  <br>)

[//]: # (  Selectgamemode - This is where the host can adjust game parameters.)

[//]: # (  <br>)

[//]: # (</h3>)

[//]: # (<h3 align="center">)

[//]: # (  <br>)

[//]: # (  <a href="https://github.com/soprafs22-group17"><img src="/ReadMePics/c.png" alt="RaveWave" width="200"></a>)

[//]: # (  <br>)

[//]: # (  DisplayQR - The host displays a QR-code which other players can scan in order to join the lobby. )

[//]: # (  <br>)

[//]: # (</h3>)

[//]: # (<h3 align="center">)

[//]: # (  <br>)

[//]: # (  <a href="https://github.com/soprafs22-group17"><img src="/ReadMePics/d.png" alt="RaveWave" width="200"></a>)

[//]: # (  <br>)

[//]: # (  Guess the song - The players can give give their guesses.)

[//]: # (  <br>)

[//]: # (</h3>)

[//]: # (<h3 align="center">)

[//]: # (  <br>)

[//]: # (  <a href="https://github.com/soprafs22-group17"><img src="/ReadMePics/e.png" alt="RaveWave" width="200"></a>)

[//]: # (  <br>)

[//]: # (  EndRound - A leaderboard is shown after each round.)

[//]: # (  <br>)

[//]: # (</h3>)

[//]: # (<h3 align="center">)

[//]: # (  <br>)

[//]: # (  <a href="https://github.com/soprafs22-group17"><img src="/ReadMePics/f.png" alt="RaveWave" width="200"></a>)

[//]: # (  <br>)

[//]: # (  EndGame - A final leaderboard is shown after all game rounds are played.)

[//]: # (  </br>)

[//]: # (</h3>)

## Roadmap

- New game mode: Artists matching
- Global Spotimemory leaderboard
- Submit Quota Extension request (takes about six weeks)

## Authors and acknoledgment

SoPra Group 28 2024 consists
of [Diyar Taskiran](https://github.com/DTaskiran), [Elias Müller](https://github.com/EliasWJMuller),
[Henry Kim](https://github.com/hs-kim1990), [Niklas Schmidt](https://github.com/niklasschm1dt)
and [Nicolas Schuler](https://github.com/NicSchuler).

Lastly, want to thank our teaching
assistant [Cedric von Rausch](https://github.com/cedric-vr) for his help during the
last semester.

## License

Apache-2.0 license
