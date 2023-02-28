import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Avatar } from 'antd';
import DefaultAvatar from './DefaultAvatar';
import { avatarSizesMap } from '../../helpers/getAvatarProperties';
import { avatarSizePropType } from '../../prop-types/player';
import { getCustomAvatarStyle } from '../../helpers/getAvatarStyle';
import { useChessBoardContext } from '../../contexts/ChessBoardContext';

const CustomAvatar = ({ size, imageUrl, playerId, bordered, playerInitials, onError }) => {
  const [isAvatarError, setIsAvatarError] = useState(false);
  const { currentPlayerId } = useChessBoardContext();

  if (isAvatarError) {
    return (
      <DefaultAvatar
        size={size}
        playerId={playerId}
        bordered={bordered}
        playerInitials={playerInitials}
      />  
    )
  }

  return (
    <Avatar 
      size={avatarSizesMap[size]}
      style={getCustomAvatarStyle()}
      src={(
        <img 
          src={imageUrl}
          alt='profile pic'
          onError={() => {
            setIsAvatarError(true);
            if (playerId === currentPlayerId) {
              onError();
            }
          }}
        />
      )}
    />
  )
}

CustomAvatar.defaultProps = {
  size: 'm',
  bordered: false,
  onError: null,
}

CustomAvatar.propTypes = {
  size: avatarSizePropType,
  imageUrl: PropTypes.string.isRequired,
  playerId: PropTypes.string.isRequired,
  bordered: PropTypes.bool,
  playerInitials: PropTypes.string.isRequired,
  onError: PropTypes.func
};

export default CustomAvatar;
