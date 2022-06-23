import * as gameService from '../game.service';
import { clearBoard, findMoveByPlayerName, turns } from '../game.service';
import { PlaceFigureMessage } from '../../domain/messages';

const newTurn: PlaceFigureMessage = {
  row: 1,
  tile: 1,
  figure: 'rock',
  player: 'test',
  score: 1,
};

describe('game.service', () => {
  it('should return new game state', async () => {
    const newState = gameService.figureMoved({
      row: 1,
      tile: 1,
      figure: 'rock',
      player: 'test',
    });
    expect(newState).toMatchSnapshot(newState);
  });
  it('should return empty list when all players are done', async () => {
    const newState = gameService.figureMoved(null);
    expect(newState).toMatchSnapshot([]);
  });
  it('should clear the board', function () {
    const emptyArr: PlaceFigureMessage[] = [];
    turns.push(newTurn);
    clearBoard();
    expect(emptyArr).toMatchSnapshot(turns);
  });
  it('should find player move by player name', function () {
    turns.push(newTurn);
    const move = findMoveByPlayerName(newTurn.player);
    expect(move).toMatchSnapshot(newTurn);
  });
});
