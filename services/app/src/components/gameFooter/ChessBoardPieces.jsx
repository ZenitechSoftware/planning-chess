import React from 'react';
import PropTypes from 'prop-types';
import './chess-board-pieces.css';
import { useChessBoardContext } from '../../contexts/ChessBoardContext';
import { PIECES, PieceName } from '../../constants/board';
import ChessBoardPiece from './ChessBoardPiece';
import { GameState } from '../../constants/gameConstants';

const ChessBoardPieces = ({ skipCurrentPlayerMove }) => {
  const { setSelectedItem, isCurrentPlayerSpectator, gameState } = useChessBoardContext();

  const selectFigure = (figureName) => {
    if (isCurrentPlayerSpectator) {
      return;
    }

    if (figureName === PieceName.SKIP) {
      skipCurrentPlayerMove();
    }
    
    setSelectedItem(figureName);
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
          disabled={gameState !== GameState.GAME_IN_PROGRESS}
        />
      ))}
    </div>
  );
};

ChessBoardPieces.propTypes = {
  skipCurrentPlayerMove: PropTypes.func.isRequired,
};

export default ChessBoardPieces;
