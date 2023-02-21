import React from 'react';
import { Avatar as AntdAvatar } from 'antd';
import PropTypes from 'prop-types';
import { getAvatarStyle } from '../../helpers/getAvatarStyle';
import { avatarSizesMap } from '../../helpers/getAvatarProperties';
import { avatarSizePropType } from '../../prop-types/player';
import { useChessBoardContext } from '../../contexts/ChessBoardContext';

const DefaultAvatar = ({ id, isBorderNeeded, size, avatarText }) => {
  const { findUserById } = useChessBoardContext();
  const user = findUserById(id);

  return (
    <AntdAvatar
      className='f-center poppins-font'
      size={avatarSizesMap[size]}
      style={getAvatarStyle(id, isBorderNeeded, size)}
    >
      { avatarText ?? user.name[0].toUpperCase() }
    </AntdAvatar>
  );
}

DefaultAvatar.defaultProps = {
  size: 'm',
  isBorderNeeded: false,
  avatarText: null,
}

DefaultAvatar.propTypes = {
  id: PropTypes.string.isRequired,
  size: avatarSizePropType,
  isBorderNeeded: PropTypes.bool,
  avatarText: PropTypes.string,
};

export default DefaultAvatar;