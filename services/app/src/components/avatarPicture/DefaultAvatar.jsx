import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from 'antd';
import { getAvatarPxSize, getAvatarFontSize } from '../../helpers/getAvatarSizes';
import { useChessBoardContext } from '../../contexts/ChessBoardContext';
import { rgbToColor } from '../../helpers/rgbToColor';

const DefaultAvatar = ({ size, id, isBorderNeeded }) => {
  const { findUserById } = useChessBoardContext();
  const user = findUserById(id);

  const border = isBorderNeeded 
    ? `1px solid ${rgbToColor(user.color.text)}` 
    : `1px solid ${rgbToColor(user.color.background)}`;

  if (user) {
    return (
      <Avatar
        size={getAvatarPxSize(size)} 
        style={{
          fontFamily: 'Poppins',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: rgbToColor(user.color.text),
          backgroundColor: rgbToColor(user.color.background),
          border: `${border}`,
          fontSize: getAvatarFontSize(size),
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
  isBorderNeeded: false,
}

DefaultAvatar.propTypes = {
  id: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['x-small', 'small', 'medium', 'large']),
  isBorderNeeded: PropTypes.bool,
};

export default DefaultAvatar;