import React from 'react'
import PropTypes from 'prop-types';
import { Avatar } from 'antd';
import { getAvatarPxSize, getAvatarFontSize } from '../../helpers/getAvatarSizes';

const GhostAvatar = ({ avatarText, size }) => (
  <Avatar 
    style={{ 
      fontFamily: 'Poppins',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--primary)', 
      border: '1px solid var(--primary)', 
      backgroundColor: 'var(--background)',
      fontSize: getAvatarFontSize(size),
    }} 
    size={getAvatarPxSize(size)}
  >
    {avatarText.toUpperCase()}
  </Avatar>
)

GhostAvatar.defaultProps = {
  size: 'small',
  avatarText: null,
}

GhostAvatar.propTypes = {
  size: PropTypes.oneOf(['x-small', 'small', 'medium', 'large']),
  avatarText: PropTypes.string,
};

export default GhostAvatar;