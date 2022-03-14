import React, { useState } from 'react';
import ChessBoardPieces from './ChessBoardPieces';

function GameFooter() {
  const [moveMade, setMoveMade] = useState(false);

  return (
    <div id="game-footer">
      <div>
        <p>Complexity | Select and place the figure on the board</p>
      </div>
      <div className="figure-field">
        <ChessBoardPieces />
      </div>
      <div id="btn-field">
        <button type="button" className="finish-btn" disabled={!moveMade}>
          Finish Move
        </button>
        <button type="button" className="skip-btn">
          Skip Move
        </button>
      </div>
    </div>
  );
}

export default GameFooter;
