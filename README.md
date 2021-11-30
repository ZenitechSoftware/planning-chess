# Planning Chess

The consensus-based chess inspired estimation game.

## Rules

- The game is played by a team (multiple players)
- A single shared chess board and a separate set of figures are available for each player
- At the beginning of the game the board is empty and the figures of each player are outside of the board
- Player chooses a figure and place it on the board
- Players do not see each other moves
- Player can skip the move
- Game has 2 states:
  - game in progress (players are making a move with chosen figure on the board)
  - game complete (all players made a move or skipped the move)
- After game completes - everyone can see each other moves
- The goal of the game is to place similar figure in similar position on the board. That could also mean that same figure must be places in exactly the same position on the board by all players.
- Each figure has a different Story Point (SP) value. The value represents the complexity of the task being estimated
- The Y axis of the board represents the amount of work to complete the task being estimated
- The X axis of the board represents the uncertainty of the task being estimated

## MVP

- Single room (link to it is available)
- 6x6 chess board
  - X axis
    - a - 1 SP
    - b - 2 SP
    - c - 3 SP
    - d - 5 SP
    - e - 8 SP
    - f - 13 SP
  - Y axis
    - 1 - 1 SP
    - 2 - 2 SP
    - 3 - 3 SP
    - 4 - 5 SP
    - 5 - 8 SP
    - 6 - 13 SP
- 6 standard chess figures
  - pawn - 1 SP
  - knight - 2 SP
  - bishop - 3 SP
  - rook - 5 SP
  - king - 8 SP
  - queen - 13 SP
- Realistically there might be around 10 players
- No admin - team self-serves:
  - Resets game
  - Removes player
  - Skips players (that are having coffee for the round)
- Display the game result automatically when every player made a move / skipped
- Display list of players
- Ask for player name and store it on local storage for other games
- The game has to have at least 2 players
- Player should let system know about his move completion
- Professional look-and-feel

## Tech stack

- React and Node.js (Typescript)
- Websocket
- Docker
- Initially no DB (state is stored in back-end memory)

## Running local development environment

```
npm install
npm run bootstrap
npm run dev
```

This starts all micro-services in watch mode.

`npm install` - installs tools that help to manage this mono repo.

`npm run bootstrap` - installs all required dependencies in all packages and services. You will not need to go to each service and install npm dependencies separately and it links local packages.

`npm run dev` - starts all services in "watch" mode.

`npm run start` - builds and starts all services.

## Other npm commands

`clean` - removes all npm_modules, build and dist directories.

`lint` - runs linter in every package.

`build` - builds all services.
