import React from 'react'
import PropTypes from 'prop-types';
import { Avatar } from 'antd';
import { getAvatarPxSize } from '../../helpers/getAvatarPxSize';

const GhostAvatar = ({ avatarText, size }) => (
  <Avatar style={{ color: 'var(--primary)', border: '1px solid var(--primary)', backgroundColor: '#F3F6FA' }} size={getAvatarPxSize(size)}>
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