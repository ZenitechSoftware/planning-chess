import React from 'react';
import { render, screen } from '@testing-library/react';
import Game from '../../../../pages/game/Game';

test('render Game page', () => {
  render(<Game />);
  expect(screen.getByText('GAME')).toBeInTheDocument();
});
