import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Avatar } from 'antd';
import DefaultAvatar from './DefaultAvatar';
import { avatarSizesMap } from '../../helpers/getAvatarProperties';
import { avatarSizePropType } from '../../prop-types/player';
import { getCustomAvatarStyle } from '../../helpers/getAvatarStyle';
import { useChessBoardContext } from '../../contexts/ChessBoardContext';
import { useUserContext } from '../../contexts/UserContext';

const CustomAvatar = ({ size, imageUrl, playerId, isBorderNeeded, playerInitials }) => {
  const [isAvatarError, setIsAvatarError] = useState(false);
  const { currentPlayerId } = useChessBoardContext();
  const userContext = useUserContext();

  if (isAvatarError) {
    return (
      <DefaultAvatar
        size={size}
        playerId={playerId}
        isBorderNeeded={isBorderNeeded}
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
              userContext.setAvatarError(true);
            }
          }}
        />
      )}
    />
  )
}

CustomAvatar.defaultProps = {
  size: 'm',
  isBorderNeeded: false,
}

CustomAvatar.propTypes = {
  size: avatarSizePropType,
  imageUrl: PropTypes.string.isRequired,
  playerId: PropTypes.string.isRequired,
  isBorderNeeded: PropTypes.bool,
  playerInitials: PropTypes.string.isRequired,
};

export default CustomAvatar;
