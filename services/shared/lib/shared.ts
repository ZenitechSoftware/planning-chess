export type GameState<PlayerId> = {
  players: PlayerId[];
};

export function createInitialState() {
  console.info('initial state');
  return 123;
}

export function reduce() {
  console.info('reduce');
}
