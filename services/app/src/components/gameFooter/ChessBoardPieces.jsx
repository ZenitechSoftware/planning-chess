import React, { useContext } from 'react';
import './chess-pieces.css';
import classnames from 'classnames';

import { ChessBoardContext } from '../../contexts/ChessBoardContext';
import { PIECES } from '../../constants/board';

const ChessBoardPieces = () => {
  const { setSelectedItem, selectedItem } = useContext(ChessBoardContext);

  return (
    <div id="chess-pieces-container">
      {PIECES.map((figure) => (
        <div
          key={figure.name}
          role="button"
          data-testid={`${figure.name}-piece-btn`}
          tabIndex={0}
          aria-hidden="true"
          onClick={() => setSelectedItem(figure.name)}
          className={classnames('piece-field flex-center', {
            'piece-field-selected': selectedItem === figure.name,
          })}
        >
          <img src={figure.img} alt={figure} className="figure-img" />
          <p key={figure.name} className="figure-title">
            {figure.name}
          </p>
          <div className="figure-strength-container flex-center">
            <p className="figure-strength">{figure.strength}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChessBoardPieces;
