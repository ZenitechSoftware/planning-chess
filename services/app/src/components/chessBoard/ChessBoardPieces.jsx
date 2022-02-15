import React, { useContext } from 'react';
import { ChessBoardContext } from '../../contexts/ChessBoardContext';
import { pieces } from '../../constants/board';

const ChessBoardPieces = () => {
  const { setSelectedItem } = useContext(ChessBoardContext);

  return (
    <div id="chess-game-pieces">
      {pieces.map((figure) => (
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
