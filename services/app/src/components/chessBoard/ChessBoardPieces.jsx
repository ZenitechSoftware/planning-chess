import React, { useContext } from 'react';
import { ChessBoardContext } from '../../contexts/ChessBoardContext';
import { PIECES } from '../../constants/board';

const ChessBoardPieces = () => {
  const { setSelectedItem } = useContext(ChessBoardContext);

  return (
    <div id="chess-game-pieces">
      {PIECES.map((figure) => (
        <p
          role="presentation"
          key={figure}
          onClick={() => setSelectedItem(figure)}
        >
          {figure}
        </p>
      ))}
    </div>
  );
};

export default ChessBoardPieces;
