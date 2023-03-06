import React from 'react';
import { Avatar as AntdAvatar } from 'antd';
import PropTypes from 'prop-types';
import { getAvatarStyle } from '../../helpers/getAvatarStyle';
import { avatarSizesMap } from '../../helpers/getAvatarProperties';
import { avatarSizePropType } from '../../prop-types/player';

const DefaultAvatar = ({ playerId, bordered, size, playerInitials }) => (
  <AntdAvatar
    className='f-center poppins-font select-none'
    size={avatarSizesMap[size]}
    style={getAvatarStyle(playerId, bordered, size)}
  >
    { playerInitials.toUpperCase() }
  </AntdAvatar>
);

DefaultAvatar.defaultProps = {
  size: 'm',
  bordered: false,
}

DefaultAvatar.propTypes = {
  playerId: PropTypes.string.isRequired,
  size: avatarSizePropType,
  bordered: PropTypes.bool,
  playerInitials: PropTypes.string.isRequired,
};

export default DefaultAvatar;