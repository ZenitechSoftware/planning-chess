import React from 'react';
import '../../static/style/chess-pieces.css';
import pawn from '../../images/chessPieces/pawn.svg';
import knight from '../../images/chessPieces/knight.svg';
import bishop from '../../images/chessPieces/bishop.svg';
import rook from '../../images/chessPieces/rook.svg';
import king from '../../images/chessPieces/king.svg';
import queen from '../../images/chessPieces/queen.svg';

const ChessBoardPieces = () => {
  const pieces = ['Pawn', 'Knight', 'Bishop', 'Rook', 'King', 'Queen'];

  const piecesImg = [pawn, knight, bishop, rook, king, queen];

  const piecesStr = ['1SP', '2SP', '3SP', '5SP', '8SP', '13SP'];

  return (
    <div id="chess-pieces-container">
      {pieces.map((figure, index) => (
        <div className="piece-field">
          <img src={piecesImg[index]} alt={pieces} className="figure-img" />
          <p key={figure} className="figure-title">
            {figure}
          </p>
          <div className="figure-str-container">
            <p className="figure-str">{piecesStr[index]}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChessBoardPieces;
