import React from 'react';
import './chessBoardPieces.css';
import classnames from 'classnames';
import { useChessBoardContext } from '../../contexts/ChessBoardContext';
import { PIECES } from '../../constants/board';

const ChessBoardPieces = () => {
  const { setSelectedItem, selectedItem, isCurrentPlayerSpectator } = useChessBoardContext();

  const handleClick = (figure) => {
    if (!isCurrentPlayerSpectator) {
      setSelectedItem(figure);
    }
  };

  return (
    <div id="chess-pieces-container" className='align-c'>
      {PIECES.map((figure) => (
        <div
          key={figure.name}
          role="button"
          data-testid={`${figure.name}-piece-btn`}
          tabIndex={0}
          aria-hidden="true"
          onClick={() => handleClick(figure.name)}
          className={classnames('piece-field padding-y-s padding-x-m f-center rubik-font', {
            'piece-field-selected': selectedItem === figure.name,
          })}
        >
          <img src={figure.img} alt={figure} className="figure-img" />
          <p key={figure.name} className="figure-title font-size-m">
            {figure.name}
          </p>
          <div className="figure-strength-container padding-y-0 padding-x-xxs f-center">
            <p className="figure-strength font-size-xxs weight-700">{figure.strength}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChessBoardPieces;
