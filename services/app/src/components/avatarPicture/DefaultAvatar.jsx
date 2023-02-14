import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from 'antd';
import { getAvatarPxSize } from '../../helpers/getAvatarPxSize';
import { useChessBoardContext } from '../../contexts/ChessBoardContext';
import { rgbToColor } from '../../helpers/rgbToColor';

const DefaultAvatar = ({ size, id }) => {
  const { findUserById } = useChessBoardContext();
  const user = findUserById(id);

  if (user) {
    return (
      <Avatar
        size={getAvatarPxSize(size)} 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          verticalAlign: 'middle',
          color: rgbToColor(user.color.text),
          backgroundColor: rgbToColor(user.color.background),
          border: '1px solid var(--primary)',
        }}
      >
        {user.name[0].toUpperCase()}
      </Avatar>
    )
  }

  return null;
}

DefaultAvatar.defaultProps = {
  size: 'medium',
}

DefaultAvatar.propTypes = {
  id: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['x-small', 'small', 'medium', 'large']),
};

export default DefaultAvatar;