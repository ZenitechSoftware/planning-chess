import { Request, Response, NextFunction, RequestHandler } from 'express';

type AsyncRequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void>;

export function wrap(fn: AsyncRequestHandler): RequestHandler {
  return function handled(req, res, next) {
    fn(req, res, next).catch(next);
  };
}
