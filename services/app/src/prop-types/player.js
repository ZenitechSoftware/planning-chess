import PropTypes from 'prop-types';
import { PLAYER_ROLES, PlayerStatuses } from '../constants/playerConstants';


export default PropTypes.shape({
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
  role: PropTypes.oneOf(Object.values(PLAYER_ROLES)),
});
