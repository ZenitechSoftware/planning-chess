import React from 'react';
import PropTypes from 'prop-types';
import ChessBoardPieces from './ChessBoardPieces';
import GameFooterButtons from './GameFooterButtons';
import './gameFooter.css';

function GameFooterActive({ skipCurrentPlayerMove }) {

  return (
    <>
      <p>Complexity | Select and place the figure on the board</p>
      <ChessBoardPieces />
      <GameFooterButtons skipCurrentPlayerMove={skipCurrentPlayerMove} />
    </>
  );
}

GameFooterActive.propTypes = {
  skipCurrentPlayerMove: PropTypes.func.isRequired,
};

export default GameFooterActive;
