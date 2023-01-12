import React, { useContext } from 'react';
import './chessBoardPieces.css';
import classnames from 'classnames';
import { ChessBoardContext } from '../../contexts/ChessBoardContext';
import { PIECES } from '../../constants/board';

const ChessBoardPieces = () => {
  const { setSelectedItem, selectedItem, isCurrentPlayerSpectator } = useContext(ChessBoardContext);

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
          <p key={figure.name} className="figure-title">
            {figure.name}
          </p>
          <div className="figure-strength-container f-center">
            <p className="figure-strength">{figure.strength}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChessBoardPieces;
