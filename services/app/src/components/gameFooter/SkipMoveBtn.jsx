import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './chessBoardPieces.css';
import { useChessBoardContext } from '../../contexts/ChessBoardContext';
import { SKIP } from '../../constants/board';
import ExplanatoryTooltip from '../tooltip/ExplanatoryTooltip';

const SkipMoveBtn = ({ handleClick }) => {
  const { selectedItem } = useChessBoardContext();

  return (
    <ExplanatoryTooltip title="Mark my move as complete, without any story point" placement="top">
      <div
        role="button"
        data-testid={`${SKIP.name}-piece-btn`}
        tabIndex={0}
        aria-hidden="true"
        onClick={() => handleClick(SKIP.name)}
        className={classnames('piece-field padding-y-s padding-x-m f-center rubik-font', {
          'piece-field-selected border-r-4': selectedItem === SKIP.name,
        })}
      >
        <img 
          src={SKIP.img} 
          alt={SKIP.name} 
          className={classnames('figure-img', {
            'skip-icon-style': SKIP.name === 'skip'
          })}
        />
        <p className="figure-title font-size-m">
          {SKIP.name}
        </p>
        <div className="figure-strength-container border-r-20 padding-y-0 padding-x-xxs f-center">
          <p className="figure-strength font-size-xxs weight-700">{SKIP.strength}</p>
        </div>
      </div>
    </ExplanatoryTooltip>
  );
}

SkipMoveBtn.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default SkipMoveBtn