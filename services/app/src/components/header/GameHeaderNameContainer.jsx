import React from 'react';
import PropTypes from 'prop-types';
import UserAvatar from '../avatar/UserAvatar';
import { useChessBoardContext } from '../../contexts/ChessBoardContext';

const GameHeaderNameContainer = ({ imgSrc }) => {
  const { currentPlayer } = useChessBoardContext();

  return (
    <div
      data-testid='game-header-dropdown-button'
      className='f-row align-c gap-s cursor-pointer'
    >
      <UserAvatar size='m' playerId={currentPlayer.id} />
      
      <span id="username">{currentPlayer.name}</span>
      
      <img src={imgSrc} alt="dropdown icon" />
    </div>
  )
}

GameHeaderNameContainer.propTypes = {
  imgSrc: PropTypes.string.isRequired,
};

export default GameHeaderNameContainer