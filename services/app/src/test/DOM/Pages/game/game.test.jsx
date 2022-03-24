import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Game from '../../../../pages/game/Game';
import Player from '../../../../components/player/Player';
import ChessGameProvider from '../../../../contexts/ChessBoardContext';
import { PIECES } from '../../../../constants/board';

// my
import Pawn from '../../../../components/gameFooter/gameFooterComponents/Pawn.svg';
import Knight from '../../../../components/gameFooter/gameFooterComponents/Knight.svg';
import Bishop from '../../../../components/gameFooter/gameFooterComponents/Bishop.svg';
import Rook from '../../../../components/gameFooter/gameFooterComponents/Rook.svg';
import King from '../../../../components/gameFooter/gameFooterComponents/King.svg';
import Queen from '../../../../components/gameFooter/gameFooterComponents/Queen.svg';
// my

test('test Game page elements', () => {
  render(
    <ChessGameProvider>
      <Game />
    </ChessGameProvider>,
  );
  expect(screen.getByText('GAME')).toBeInTheDocument();
  expect(screen.getByText('http://localhost/')).toBeInTheDocument();
  fireEvent.click(screen.getByText('Copy link'));
  PIECES.forEach((p) => {
    expect(screen.getByText(p)).toBeInTheDocument();
  });
  expect([Pawn, Knight, Bishop, Rook, King, Queen]).toBet('file-loader');
});

test('test Player page elements', () => {
  render(<Player name="username" />);
  expect(screen.getByText('username')).toBeInTheDocument();
});
