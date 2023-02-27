import React from 'react';
import { Avatar as AntdAvatar } from 'antd';
import PropTypes from 'prop-types';
import { getAvatarStyle } from '../../helpers/getAvatarStyle';
import { avatarSizesMap } from '../../helpers/getAvatarProperties';
import { avatarSizePropType } from '../../prop-types/player';

const DefaultAvatar = ({ playerId, isBorderNeeded, size, playerInitials }) => (
  <AntdAvatar
    className='f-center poppins-font select-none'
    size={avatarSizesMap[size]}
    style={getAvatarStyle(playerId, isBorderNeeded, size)}
  >
    { playerInitials }
  </AntdAvatar>
);

DefaultAvatar.defaultProps = {
  size: 'm',
  isBorderNeeded: false,
}

DefaultAvatar.propTypes = {
  playerId: PropTypes.string.isRequired,
  size: avatarSizePropType,
  isBorderNeeded: PropTypes.bool,
  playerInitials: PropTypes.string.isRequired,
};

export default DefaultAvatar;