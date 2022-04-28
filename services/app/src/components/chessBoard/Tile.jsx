import React, { useCallback } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const Tile = ({
  tile: { attribute, items, filled },
  onClick,
  row,
  column,
  boardLength,
}) => {
  const isTileWithBorder = () =>
    !attribute && row !== boardLength - 1 && column !== 0;

  /* eslint-disable-next-line */
  const _onClick = useCallback(() => {
    onClick(row, column);
  }, [onClick, row, column]);

  return (
    <td
      onClick={_onClick}
      role="presentation"
      className={classNames({
        'non-border-tile': filled,
        'border-tile': isTileWithBorder(),
      })}
    >
      {attribute || items}
    </td>
  );
};

Tile.propTypes = {
  tile: PropTypes.shape({
    attribute: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.number,
    ]),
    items: PropTypes.arrayOf(PropTypes.string),
    filled: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.object,
      PropTypes.number,
    ]),
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  row: PropTypes.number.isRequired,
  column: PropTypes.number.isRequired,
  boardLength: PropTypes.number.isRequired,
};

export default Tile;
