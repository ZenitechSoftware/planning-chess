import {
  MessageType,
  PlaceFigureMessage,
  ReceivedMessage,
} from '../domain/messages';

export const getFigureMovedMessage = (
  turn: PlaceFigureMessage,
): ReceivedMessage<MessageType.FigureMoved> => ({
  type: MessageType.FigureMoved,
  payload: turn,
});

export const getMoveSkippedMessage = (
  playerId: string,
): ReceivedMessage<MessageType.MoveSkipped> => ({
  type: MessageType.MoveSkipped,
  payload: { playerId: playerId },
});
