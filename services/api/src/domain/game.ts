import { PlayerStatus } from './player';

export interface Turn {
  row?: number;
  tile?: number;
  figure?: string;
  player?: string;
  id: string;
  score?: number;
  turnType: PlayerStatus;
}
