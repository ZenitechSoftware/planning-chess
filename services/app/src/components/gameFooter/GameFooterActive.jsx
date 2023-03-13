import React from 'react';
import PropTypes from 'prop-types';
import ChessBoardPieces from './ChessBoardPieces';

const GameFooterActive = ({ skipCurrentPlayerMove }) => (
  <>
    <p className='margin-y-sm'>Complexity | Select and place the figure on the board</p>
    <ChessBoardPieces skipCurrentPlayerMove={skipCurrentPlayerMove} />
  </>
);

GameFooterActive.propTypes = {
  skipCurrentPlayerMove: PropTypes.func.isRequired,
};

export default GameFooterActive;
