import React from 'react';
import { PIECES } from '../../constants/board';
import { useChessBoardContext } from '../../hooks/useChessBoardContext';

const ChessBoardPieces = () => {
  const { setSelectedItem } = useChessBoardContext();

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
