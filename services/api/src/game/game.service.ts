const turns: any = [];

export const figureMoved = (payload: unknown): any => {
  if (payload) {
    turns.push(payload);
  } else {
    turns.length = 0;
  }

  return turns;
};
