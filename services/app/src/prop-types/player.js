import PropTypes from 'prop-types';
import { PlayerRoles, PlayerStatuses } from '../constants/playerConstants';

export const playerColorPropType = PropTypes.shape({
  background: PropTypes.shape({
    r: PropTypes.number,
    g: PropTypes.number,
    b: PropTypes.number,
  }),
  text: PropTypes.shape({
    r: PropTypes.number,
    g: PropTypes.number,
    b: PropTypes.number,
  })
})

export const playerPropType = PropTypes.shape({
  name: PropTypes.string,
  status: PropTypes.oneOf(Object.values(PlayerStatuses)),
  color: playerColorPropType,
  id: PropTypes.string,
  role: PropTypes.oneOf(Object.values(PlayerRoles)),
});

export const playerWithScorePropType = PropTypes.shape({
  name: PropTypes.string,
  status: PropTypes.oneOf(Object.values(PlayerStatuses)),
  color: PropTypes.playerColorPropType,
  id: PropTypes.string,
  role: PropTypes.oneOf(Object.values(PlayerRoles)),
  score: PropTypes.number,
});

export const avatarSizePropType = PropTypes.oneOf(['xs', 's', 'm', 'l']);
