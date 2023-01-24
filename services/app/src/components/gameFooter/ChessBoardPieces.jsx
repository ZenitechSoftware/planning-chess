import React from 'react';
import PropTypes from 'prop-types';
import './chess-board-pieces.css';
import { useChessBoardContext } from '../../contexts/ChessBoardContext';
import { PIECES, PieceName } from '../../constants/board';
import ChessBoardPiece from './ChessBoardPiece';

const ChessBoardPieces = ({ skipCurrentPlayerMove }) => {
  const { setSelectedItem, isCurrentPlayerSpectator } = useChessBoardContext();

  const selectFigure = (figureName) => {
    if (isCurrentPlayerSpectator) {
      return;
    }

    setSelectedItem(figureName);

    if (figureName === PieceName.SKIP) {
      skipCurrentPlayerMove();
    }
  };

  return (
    <div id="chess-pieces-container" className='align-c'>
      {PIECES.map((figure) => (
        <ChessBoardPiece 
          key={figure.name}
          figureName={figure.name}
          figureImg={figure.img}
          figureStrength={figure.strength}
          selectFigure={selectFigure}
        />
      ))}
    </div>
  );
};

ChessBoardPieces.propTypes = {
  skipCurrentPlayerMove: PropTypes.func.isRequired,
};

export default ChessBoardPieces;
