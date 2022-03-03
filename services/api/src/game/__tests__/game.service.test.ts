import * as gameService from '../game.service';

describe('game.service', () => {
  it('should return new game state', async () => {
    const newState = gameService.figureMoved({ row: 1, tile: 1, figure: 'rock', player: 'test' });
    expect(newState).toMatchSnapshot(newState);
  });
  it('should return empty list when all players are done', async () => {
    const newState = gameService.figureMoved(null);
    expect(newState).toMatchSnapshot(newState);
  });
});
