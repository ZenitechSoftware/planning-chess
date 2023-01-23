import React from 'react';
import PropTypes from 'prop-types';
import ChessBoardPieces from './ChessBoardPieces';
import GameFooterButtons from './GameFooterButtons';
import './game-footer.css';

const GameFooterActive = ({ skipCurrentPlayerMove }) => (
  <>
    <p>Complexity | Select and place the figure on the board</p>
    <ChessBoardPieces skipCurrentPlayerMove={skipCurrentPlayerMove} />
    <GameFooterButtons />
  </>
);

GameFooterActive.propTypes = {
  skipCurrentPlayerMove: PropTypes.func.isRequired,
};

export default GameFooterActive;
