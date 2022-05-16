import PropTypes from 'prop-types';
import playerStatuses from '../constants/playerStatuses';

export default PropTypes.shape({
  name: PropTypes.string,
  status: PropTypes.oneOf(Object.values(playerStatuses)),
  id: PropTypes.string,
});
