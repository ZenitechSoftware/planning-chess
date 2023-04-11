import React from 'react';
import PropTypes from 'prop-types';
import DefaultAvatar from './DefaultAvatar';
import CustomAvatar from './CustomAvatar';
import { useChessBoardContext } from '../../contexts/ChessBoardContext';
import { avatarSizePropType } from '../../prop-types/player';

const UserAvatar = ({ size, playerId, imageUrl, playerInitials, bordered, dataTestId }) => {
  const { findUserById } = useChessBoardContext();
  const user = findUserById(playerId);

  const playerLetter = playerInitials ?? user.name[0].toUpperCase();

  if (!user) {
    return <DefaultAvatar playerId={playerId} bordered size={size} playerInitials={playerLetter} dataTestId={dataTestId} />;
  }

  if (imageUrl || user.avatar) {
    return (
      <CustomAvatar 
        bordered={bordered}
        size={size}
        imageUrl={imageUrl || user.avatar}
        playerId={playerId}
        playerInitials={playerLetter}
        dataTestId={dataTestId}
      />
    );
  }

  return <DefaultAvatar size={size} playerId={playerId} bordered={bordered} playerInitials={playerLetter} dataTestId={dataTestId} />;
}

UserAvatar.defaultProps = {
  size: 'm',
  imageUrl: '',
  playerInitials: null,
  bordered: false,
  dataTestId: null,
}

UserAvatar.propTypes = {
  playerId: PropTypes.string.isRequired,
  size: avatarSizePropType,
  imageUrl: PropTypes.string,
  playerInitials: PropTypes.string,
  bordered: PropTypes.bool,
  dataTestId: PropTypes.string,
};

export default UserAvatar;