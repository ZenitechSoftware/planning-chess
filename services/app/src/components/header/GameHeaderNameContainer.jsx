import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import UserAvatar from '../avatar/UserAvatar';
import { PlayerRoles } from '../../constants/playerConstants';
import { useChessBoardContext } from '../../contexts/ChessBoardContext';

const GameHeaderNameContainer = ({ imgSrc }) => {
  const { currentPlayer } = useChessBoardContext();

  return (
    <div
      className={classNames('f-row align-c gap-s', {
        'cursor-pointer': currentPlayer.role === PlayerRoles.Voter,
      })}
    >
      <UserAvatar size='m' playerId={currentPlayer.id} />
      
      <span id="username">{currentPlayer.name}</span>

      { currentPlayer?.role === PlayerRoles.Voter && (
        <img src={imgSrc} alt="dropdown icon" />
      )}
    </div>
  )
}

GameHeaderNameContainer.propTypes = {
  imgSrc: PropTypes.string.isRequired,
};

export default GameHeaderNameContainer