import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Game from '../../../../pages/game/Game';
import ChessGameProvider from '../../../../contexts/ChessBoardContext';
import UserContextProvider from '../../../../contexts/UserContext';
import WebSocketsContextProvider from '../../../../contexts/WsContext';

describe('Game', () => {
  test('test Game page elements', () => {
    localStorage.setItem('user', 'TestUser');
    render(
      <Router>
        <WebSocketsContextProvider>
          <UserContextProvider>
            <ChessGameProvider>
              <Game />
            </ChessGameProvider>
          </UserContextProvider>
        </WebSocketsContextProvider>
      </Router>
    );
    expect(screen.getByText('Amount of work')).toBeInTheDocument();
    expect(screen.getByText('Uncertainty')).toBeInTheDocument();
  });
});

