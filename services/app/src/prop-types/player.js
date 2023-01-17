import PropTypes from 'prop-types';
import { PlayerRoles, PlayerStatuses } from '../constants/playerConstants';


export const playerPropType = PropTypes.shape({
  name: PropTypes.string,
  status: PropTypes.oneOf(Object.values(PlayerStatuses)),
  color: PropTypes.shape({
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
  }),
  id: PropTypes.string,
  role: PropTypes.oneOf(Object.values(PlayerRoles)),
});

export const playerWithScorePropType = PropTypes.shape({
  name: PropTypes.string,
  status: PropTypes.oneOf(Object.values(PlayerStatuses)),
  color: PropTypes.shape({
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
  }),
  id: PropTypes.string,
  role: PropTypes.oneOf(Object.values(PlayerRoles)),
  score: PropTypes.number,
});
