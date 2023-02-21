import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Avatar } from 'antd';
import DefaultAvatar from './DefaultAvatar';
import { avatarSizesMap } from '../../helpers/getAvatarProperties';
import { useUserContext } from '../../contexts/UserContext';
import { avatarSizePropType } from '../../prop-types/player';
import { getCustomAvatarStyle } from '../../helpers/getAvatarStyle';

const CustomAvatar = ({ size, imageUrl, id, isBorderNeeded }) => {
  const [isAvatarError, setIsAvatarError] = useState(false);
  const userContext = useUserContext();

  if (isAvatarError) {
    return (
      <DefaultAvatar
        size={size}
        id={id}
        isBorderNeeded={isBorderNeeded}
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
          onError={(e) => {
            e.target.src = null;
            userContext.setAvatarError(true);
            setIsAvatarError(true);
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
  id: PropTypes.string.isRequired,
  isBorderNeeded: PropTypes.bool,
};

export default CustomAvatar;
