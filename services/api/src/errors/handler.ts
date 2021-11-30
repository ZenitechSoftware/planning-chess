import { Request, Response } from 'express';
import { isHttpError } from './error-prototypes';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function defaultErrorHandler(
  err: Partial<Error>,
  req: Request,
  res: Response,
): void {
  console.error(err);
  isHttpError(err)
    ? res.status(err.statusCode).json({ message: err.message })
    : res.status(500).json({ message: 'Internal Server Error' });
}
