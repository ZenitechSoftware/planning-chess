import logger from '../logger';

export const figureMoved = (payload: unknown): any => {
  //  TODO implement game logic
  logger.info(`Figure moved to ${payload}`);
  return {};
};
