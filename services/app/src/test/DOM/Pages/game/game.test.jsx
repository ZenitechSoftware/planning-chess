import React from 'react';
import { render, screen } from '@testing-library/react';
import Game from '../../../../pages/game/Game';
import Player from '../../../../components/player/Player';
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

  test('test Player page elements', () => {
    render(
      <Player
        player={{
          name: 'username',
          id: '1',
          status: 'ActionNotTaken',
          color: { background: {
              r: 1,
              g: 1,
              b: 1,
            },
            text: {
              r: 1,
              g: 1,
              b: 1,
            }
          }
      }}
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
});

