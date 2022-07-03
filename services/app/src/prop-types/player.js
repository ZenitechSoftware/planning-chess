import PropTypes from 'prop-types';
import playerStatuses from '../constants/playerStatuses';

export default PropTypes.shape({
  name: PropTypes.string,
  status: PropTypes.oneOf(Object.values(playerStatuses)),
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
});
