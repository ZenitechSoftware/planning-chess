import * as gameService from '../game.service';
import { clearBoard, findMoveByPlayerName } from '../game.service';
import { PlaceFigureMessage } from '../../domain/messages';
import * as gameRoomService from '../game-room.service';
import Mock = jest.Mock;

jest.mock('../game-room.service');

const newTurn: PlaceFigureMessage = {
  row: 1,
  tile: 1,
  figure: 'rock',
  player: 'test',
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
    });
    expect(newState).toMatchSnapshot(newState);
  });
  it('should clear the board', function () {
    const emptyArr: PlaceFigureMessage[] = [];
    clearBoard(roomId);
    expect(turns).toMatchSnapshot(emptyArr);
  });
  it('should find player move by player name', function () {
    (gameRoomService.getTurns as Mock).mockReturnValue([newTurn]);
    const move = findMoveByPlayerName(roomId, newTurn.player);
    expect(move).toEqual(newTurn);
  });
});
