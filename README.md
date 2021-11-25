# Planning Chess
The consensus-based chess inspired estimation game.

## Rules
- The game is played by a team (multiple players)
- A shared chess board is availabe and a separate set of figres available for each player

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
- No admin - team selfserves:
  - Resets game
  - Removes player
  - Skips players (that are having coffee for the round)
- Display the game result automatically when every player made a move / skipped
- Display list of players
- Ask for player name and store it on local storage for other games
- The game has to have at least 2 players
- Player should let system know about his move by pressing "Finish move" button
- Professional look-and-feel

## Tech stack
- React and Node.js (Typescript)
- Websockets
- Docker
- Initially no DB
