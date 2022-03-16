import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Game from '../../../../pages/game/Game';
import Player from '../../../../components/player/Player';
import ChessGameProvider from '../../../../contexts/ChessBoardContext';
import { PIECES } from '../../../../constants/board';

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
});

test('test Player page elements', () => {
  render(
    <Player
      user={{ name: 'username', id: '1', status: 'ActionNotTaken' }}
      skipMove={() => {}}
    />,
  );
  expect(screen.getByText('username')).toBeInTheDocument();
});
