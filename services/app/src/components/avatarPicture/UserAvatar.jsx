import React from 'react';
import PropTypes from 'prop-types';
import DefaultAvatar from './DefaultAvatar';
import CustomAvatar from './CustomAvatar';
import GhostAvatar from './GhostAvatar';
import { useChessBoardContext } from '../../contexts/ChessBoardContext';

const UserAvatar = ({ size, id, imageUrl, avatarText }) => {
  const { findUserById } = useChessBoardContext();
  const user = findUserById(id);

  if (!user) {
    return <GhostAvatar size={size} avatarText={avatarText} />;
  }

  if (imageUrl || user.avatar) {
    return (
      <CustomAvatar 
        size={size}
        imageUrl={imageUrl || user.avatar}
        id={id}
      />
    );
  }

  return <DefaultAvatar size={size} id={id} />;
}

UserAvatar.defaultProps = {
  size: 'medium',
  imageUrl: '',
  avatarText: null,
}

UserAvatar.propTypes = {
  id: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['x-small', 'small', 'medium', 'large']),
  imageUrl: PropTypes.string,
  avatarText: PropTypes.string,
};

export default UserAvatar;