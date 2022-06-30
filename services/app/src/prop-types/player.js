import PropTypes from 'prop-types';
import playerStatuses from '../constants/playerStatuses';

export default PropTypes.shape({
  name: PropTypes.string,
  status: PropTypes.oneOf(Object.values(playerStatuses)),
  // eslint-disable-next-line react/forbid-prop-types
  color: PropTypes.object,
  id: PropTypes.string,
});
