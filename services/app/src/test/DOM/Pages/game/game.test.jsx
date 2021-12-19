import React from 'react';
import { render, screen } from '@testing-library/react';
import Game from '../../../../pages/game/Game';

test('test Game page elements', () => {
  render(<Game />);
  expect(screen.getByText('GAME')).toBeInTheDocument();
  expect(screen.getByText('http://localhost/')).toBeInTheDocument();
});
