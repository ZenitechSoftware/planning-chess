import React from 'react';
import PropTypes from 'prop-types';
import ChessBoardPieces from './ChessBoardPieces';
import GameFooterButtons from './GameFooterButtons';
import './gameFooter.css';

function GameFooterActive({ skipCurrentPlayerMove }) {

  return (
    <>
      <div>
        <p>Complexity | Select and place the figure on the board</p>
      </div>
      <div className="figure-field">
        <ChessBoardPieces />
      </div>
      <GameFooterButtons skipCurrentPlayerMove={skipCurrentPlayerMove} />
    </>
  );
}

GameFooterActive.propTypes = {
  skipCurrentPlayerMove: PropTypes.func.isRequired,
};

export default GameFooterActive;
