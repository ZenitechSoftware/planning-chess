import PropTypes from 'prop-types';
import { PieceName } from '../constants/board';

export const squareItemPropType = PropTypes.shape({
  tile: PropTypes.number,
  row: PropTypes.number,
  figure: PropTypes.oneOf(Object.values(PieceName)),
  player: PropTypes.string,
  playerId: PropTypes.string,
});