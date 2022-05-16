import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Game from '../../../../pages/game/Game';
import Player from '../../../../components/player/Player';
import ChessGameProvider from '../../../../contexts/ChessBoardContext';

test('test Game page elements', () => {
  render(
    <ChessGameProvider>
      <Game />
    </ChessGameProvider>,
  );
  expect(screen.getByText('GAME')).toBeInTheDocument();
  expect(screen.getByText('http://localhost/')).toBeInTheDocument();
  fireEvent.click(screen.getByText('Copy link'));
});

test('test Player page elements', () => {
  render(
    <Player
      player={{ name: 'username', id: '1', status: 'ActionNotTaken' }}
      skipMove={() => {}}
      score={0}
    />,
  );
  expect(screen.getByText('username (you)')).toBeInTheDocument();
});
