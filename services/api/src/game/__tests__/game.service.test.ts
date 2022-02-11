import * as gameService from '../game.service';

describe('game.service', () => {
  it('should return new game state', async () => {
    const newState = gameService.figureMoved({});
    expect(newState).toMatchSnapshot(newState);
  });
});
