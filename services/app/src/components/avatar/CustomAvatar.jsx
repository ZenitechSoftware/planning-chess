import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Avatar } from 'antd';
import DefaultAvatar from './DefaultAvatar';
import { avatarSizesMap } from '../../helpers/getAvatarProperties';
import { avatarSizePropType } from '../../prop-types/player';
import { getCustomAvatarStyle } from '../../helpers/getAvatarStyle';

const CustomAvatar = ({ size, imageUrl, playerId, bordered, playerInitials, onError, dataTestId }) => {
  const [isAvatarError, setIsAvatarError] = useState(false);

  if (isAvatarError) {
    return (
      <DefaultAvatar
        size={size}
        playerId={playerId}
        bordered={bordered}
        playerInitials={playerInitials}
        dataTestId={dataTestId}
      />  
    )
  }

  return (
    <Avatar 
      size={avatarSizesMap[size]}
      style={getCustomAvatarStyle()}
      data-testid={`custom-avatar-${dataTestId}`}
      src={(
        <img 
          src={imageUrl}
          alt='profile pic'
          onError={() => {
            setIsAvatarError(true);
            onError?.();
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
  dataTestId: null,
}

CustomAvatar.propTypes = {
  size: avatarSizePropType,
  imageUrl: PropTypes.string.isRequired,
  playerId: PropTypes.string.isRequired,
  bordered: PropTypes.bool,
  playerInitials: PropTypes.string.isRequired,
  onError: PropTypes.func,
  dataTestId: PropTypes.string,
};

export default CustomAvatar;
