import React from 'react';
import PropTypes from 'prop-types';
import DefaultAvatar from './DefaultAvatar';
import CustomAvatar from './CustomAvatar';
import { useChessBoardContext } from '../../contexts/ChessBoardContext';
import { avatarSizePropType } from '../../prop-types/player';

const UserAvatar = ({ size, id, imageUrl, avatarText, isBorderNeeded }) => {
  const { findUserById } = useChessBoardContext();
  const user = findUserById(id);

  if (!user) {
    return <DefaultAvatar id={id} isBorderNeeded size={size} avatarText={avatarText} />;
  }

  if (imageUrl || user.avatar) {
    return (
      <CustomAvatar 
        isBorderNeeded={isBorderNeeded}
        size={size}
        imageUrl={imageUrl || user.avatar}
        id={id}
      />
    );
  }

  return <DefaultAvatar size={size} id={id} isBorderNeeded={isBorderNeeded} />;
}

UserAvatar.defaultProps = {
  size: 'm',
  imageUrl: '',
  avatarText: null,
  isBorderNeeded: false,
}

UserAvatar.propTypes = {
  id: PropTypes.string.isRequired,
  size: avatarSizePropType,
  imageUrl: PropTypes.string,
  avatarText: PropTypes.string,
  isBorderNeeded: PropTypes.bool,
};

export default UserAvatar;