import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Avatar } from 'antd';
import DefaultAvatar from './DefaultAvatar';
import { getAvatarPxSize } from '../../helpers/getAvatarSizes';

const CustomAvatar = ({ size, imageUrl, id, isBorderNeeded }) => {
  const [isAvatarError, setIsAvatarError] = useState(false);

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
      size={getAvatarPxSize(size)}
      style={{ backgroundColor: '#F3F6FA', border: '1px solid var(--primary)' }}
      src={(
        <img 
          src={imageUrl}
          alt='profile pic' 
          className='custom-avatar-img'
          onError={(e) => {
            e.target.src = null;
            setIsAvatarError(true);
          }}
        />
      )}
    />
  )
}

CustomAvatar.defaultProps = {
  size: 'medium',
  isBorderNeeded: false,
}

CustomAvatar.propTypes = {
  size: PropTypes.oneOf(['x-small', 'small', 'medium', 'large']),
  imageUrl: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  isBorderNeeded: PropTypes.bool,
};

export default CustomAvatar;
