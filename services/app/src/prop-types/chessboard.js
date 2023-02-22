import PropTypes from 'prop-types';

export const squareItemsPropType = PropTypes.arrayOf(
  PropTypes.shape({
    tile: PropTypes.number,
    row: PropTypes.number,
    figure: PropTypes.string,
    player: PropTypes.string,
    playerId: PropTypes.string,
  })
);