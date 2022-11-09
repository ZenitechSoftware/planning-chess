import * as gameRoomService from '../game-room.service';
import logger from '../../logger';

jest.mock('uuid', () => ({
  v4: () => 'some-short-v4-uuid-0',
}));

jest.mock('../../logger');

describe('gameRoomService', () => {
  const roomId = 'abcd-1234';
  it('should create new room', async () => {
    const room = gameRoomService.getOrCreateRoom();
    expect(room).toMatchSnapshot();
  });

  it('should get existing room', async () => {
    gameRoomService.getOrCreateRoom(roomId);
    const secondCall = gameRoomService.getOrCreateRoom(roomId);
    expect(secondCall).toMatchSnapshot();
  });

  it('should cleanup room', async () => {
    gameRoomService.getOrCreateRoom(roomId);
    gameRoomService.cleanUp(roomId);
    expect(gameRoomService.getClients(roomId)).toBeUndefined();
  });

  it.each([roomId, 'does-not-exist'])(
    'should get turns undefined',
    async (id) => {
      expect(gameRoomService.getTurns(id)).toBeUndefined();
    },
  );

  it('should print rooms', async () => {
    gameRoomService.getOrCreateRoom(roomId);
    gameRoomService.printRooms();
    expect(logger.debug).toBeCalled();
  });
});
