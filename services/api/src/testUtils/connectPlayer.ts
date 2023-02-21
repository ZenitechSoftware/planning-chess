import * as playerService from '../messaging/players.service';
import {
  ReceivedMessage,
  MessageType,
  PlayerConnectedMessage,
} from '../domain/messages';
import { PlayerRole } from '../domain';
import { Player } from '../domain/player';
import { ws } from './wsConnection';

jest.mock('ws');

const playerTestId = 'some-short-v4-uuid-1';
const spectatorTestId = 'some-short-v4-uuid-2';
const roomId = 'abcd-1234';

export const voterConnect = (
  playerConfig: Partial<PlayerConnectedMessage> = {},
): Player => {
  const payload = {
    playerName: playerConfig.playerName ?? 'player1',
    id: playerConfig.id ?? playerTestId,
    role: playerConfig.role ?? PlayerRole.Voter,
    avatar: playerConfig.avatar ?? undefined,
  };

  const message: ReceivedMessage<MessageType.PlayerConnected> = {
    type: MessageType.PlayerConnected,
    payload,
  };

  playerService.newMessageReceived(ws, message);
  const [, voterPlayer] = playerService.findPlayerById(roomId, payload.id);
  return voterPlayer;
};

export const spectatorConnect = (): void => {
  const message: ReceivedMessage<MessageType.PlayerConnected> = {
    type: MessageType.PlayerConnected,
    payload: {
      playerName: 'spectator1',
      id: spectatorTestId,
      role: PlayerRole.Spectator,
      avatar: undefined,
    },
  };
  playerService.newMessageReceived(ws, message);
};
