import React from 'react';
import { render, screen } from '@testing-library/react';
import Game from '../../../../pages/game/Game';
import ChessGameProvider from '../../../../contexts/ChessBoardContext';

describe('Game', () => {
  test('test Game page elements', () => {
    localStorage.setItem('user', 'TestUser')
    render(
      <ChessGameProvider>
        <Game />
      </ChessGameProvider>,
    );
    expect(screen.getByText('Amount of work')).toBeInTheDocument();
    expect(screen.getByText('Uncertainty')).toBeInTheDocument();
  });
});

