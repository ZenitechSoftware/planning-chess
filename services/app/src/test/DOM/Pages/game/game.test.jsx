import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Game from '../../../../pages/game/Game';
import Player from '../../../../components/player/Player';

test('test Game page elements', () => {
  render(<Game />);
  expect(screen.getByText('GAME')).toBeInTheDocument();
  expect(screen.getByText('http://localhost/')).toBeInTheDocument();
  fireEvent.click(screen.getByText('Copy link'));
  const pieces = ['pawn', 'knight', 'bishop', 'rook', 'king', 'queen'];
  pieces.forEach((p) => {
    expect(screen.getByText(p)).toBeInTheDocument();
  });
});

test('test Player page elements', () => {
  render(<Player name="username" />);
  expect(screen.getByText('username')).toBeInTheDocument();

});
