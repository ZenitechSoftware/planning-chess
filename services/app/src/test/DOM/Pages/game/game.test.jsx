import React from 'react';
import { render, screen } from '@testing-library/react';
import Game from '../../../../pages/game/Game';

test('render h1 element', () => {
  render(<Game />);
  expect(screen.getByText('GAME')).toBeInTheDocument();
});
