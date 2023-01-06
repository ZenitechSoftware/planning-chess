import * as gameRoomService from '../game-room.service';
import logger from '../../logger';

jest.mock('uuid', () => ({
  v4: () => 'some-short-v4-uuid-0',
}));

jest.mock('../../logger');

describe('gameRoomService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const roomId = 'abcd-1234';
  const roomIdToDelete = 'abcd-5678';
  
  it('should create new room', async () => {
    const room = gameRoomService.getOrCreateRoom();
    expect(room).toMatchSnapshot();
  });

  it('should get existing room', async () => {
    gameRoomService.getOrCreateRoom(roomId);
    const secondCall = gameRoomService.getOrCreateRoom(roomId);
    expect(secondCall).toMatchSnapshot();
  });

  it('should print rooms', async () => {
    gameRoomService.getOrCreateRoom(roomId);
    gameRoomService.printRooms();
    expect(logger.debug).toBeCalled();
  });

  it('should not clean up room, because there are less than 1000', () => {
    gameRoomService.getOrCreateRoom(roomId);
    gameRoomService.cleanUp();
    expect(gameRoomService.getClients(roomId)).toBeDefined();
  });

  it('should clean up the room, because there are more than 1000', () => {
    gameRoomService.getOrCreateRoom(roomId);
    for(let i = 0; i < 1000; i++) {
      gameRoomService.getOrCreateRoom(`${i}`)
    }
    gameRoomService.cleanUp();
    expect(gameRoomService.rooms.size).toBe(1001);
  });
});
