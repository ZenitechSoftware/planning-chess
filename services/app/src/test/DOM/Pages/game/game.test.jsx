import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Game from '../../../../pages/game/Game';
import Player from '../../../../components/player/Player';
import ChessGameProvider from '../../../../contexts/ChessBoardContext';

test('test Game page elements', () => {
  localStorage.setItem('user', 'TestUser')
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
      user={{ name: 'username', id: '1', status: 'ActionNotTaken' }}
      skipMove={() => {}}
      score={0}
    />,
  );
  expect(screen.getByText('U', {
    selector: ".team-list-item-avatar-text"
  })).toBeInTheDocument();
  expect(screen.getByText('username', {
    selector: ".team-list-item-name"
  })).toBeInTheDocument();
  expect(screen.getByText('(you)', {
    selector: ".team-list-item-name > span"
  })).toBeInTheDocument();
});
