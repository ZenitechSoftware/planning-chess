import * as gameService from '../game.service';
import { clearBoard, findMoveByPlayerId } from '../game.service';
import { PlaceFigureMessage } from '../../domain/messages';
import * as gameRoomService from '../game-room.service';
import Mock = jest.Mock;

jest.mock('../game-room.service');

const newTurn: PlaceFigureMessage = {
  row: 1,
  tile: 1,
  figure: 'rock',
  player: 'test',
  id: 'testId',
  score: 1,
};

describe('game.service', () => {
  const roomId = 'abcd-1234';
  const turns: PlaceFigureMessage[] = [];

  beforeEach(() => {
    (gameRoomService.getTurns as Mock).mockReturnValue(turns);
  });

  afterEach(jest.clearAllMocks);

  it('should return new game state', async () => {
    const newState = gameService.figureMoved(roomId, {
      row: 1,
      tile: 1,
      figure: 'rock',
      player: 'test',
      id: 'testId',
    });
    expect(newState).toMatchSnapshot();
  });
  it('should clear the board', function () {
    const emptyArr: PlaceFigureMessage[] = [];
    clearBoard(roomId);
    expect(turns).toMatchSnapshot(emptyArr);
  });
  it('should find player move by player name', function () {
    (gameRoomService.getTurns as Mock).mockReturnValue([newTurn]);
    const move = findMoveByPlayerId(roomId, newTurn.id);
    expect(move).toEqual(newTurn);
  });
});
