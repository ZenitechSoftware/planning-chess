import React, { useCallback } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Attribute from './Attribute';
import Square from './Square';

const Tile = ({
  tile: { attribute, items = [], filled, points },
  onClick,
  row,
  column,
  boardLength,
}) => {
  const isTileWithBorder = () =>
    !attribute && row !== boardLength - 1 && column !== 0;

  /* eslint-disable-next-line */
  const _onClick = useCallback(() => {
    if (!attribute && (row !== 6 && column !== 0)) {
      onClick(row, column);
    }
  }, [onClick, row, column]);

  return (
    <td
      onClick={_onClick}
      role="presentation"
      className={classNames('chess-board-tile',{
        'non-border-tile': filled,
        'border-tile': isTileWithBorder()
      })}
    >
      { 
        attribute 
          ? <Attribute tile={{ attribute, points }} /> 
          : <Square filled={!!filled} row={row} column={column} items={items} />
      }
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
    points: PropTypes.number,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        figure: PropTypes.string,
        score: PropTypes.number,
        player: PropTypes.string
      })
    ),
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
