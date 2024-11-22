import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './chess-board-pieces.css';
import { useChessBoardContext } from '../../contexts/ChessBoardContext';
import PlanningChessTooltip from '../planningChessTooltip/PlanningChessTooltip';
import { PieceName } from '../../constants/board';

const ChessBoardPiece = ({ selectFigure, figureName, figureImg, figureStrength, disabled }) => {
  const { selectedItem } = useChessBoardContext();

  const skipTooltipTxt = "Mark my move as complete, without any story points";

  const onSelect = () => {
    if (!disabled) {
      selectFigure(figureName)
    }
  }

  return (
    <PlanningChessTooltip 
      title={figureName === PieceName.SKIP ? skipTooltipTxt : null}
      placement="top"
    >
      <button
        type="button"
        data-testid={`${figureName}-piece-btn`} 
        onClick={() => onSelect()}
        className={classnames('piece-field padding-y-s padding-x-sm f-center rubik-font', {
          'piece-field-selected': selectedItem === figureName,
          // disabling with class, because antd appends unnecessary spam around the button when its disabled
          'disabled': disabled,
        })}
      >
        <img 
          src={figureImg} 
          alt={figureName} 
          className='figure-img'
        />
        <p className="figure-title font-size-s weight-400">
          {figureStrength}
        </p>
        {/* <div className="figure-strength-container border-r-20 padding-y-0 padding-x-xxs f-center">
          <p className="figure-strength font-size-xxs weight-500">{figureName}</p>
        </div> */}
      </button>
    </PlanningChessTooltip>
  );
}

ChessBoardPiece.propTypes = {
  selectFigure: PropTypes.func.isRequired,
  figureName: PropTypes.string.isRequired,
  figureImg: PropTypes.string.isRequired,
  figureStrength: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default ChessBoardPiece