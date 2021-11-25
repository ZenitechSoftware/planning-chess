import { HttpError } from './HttpError';

export class NotFoundError extends HttpError {
  constructor(message = 'Not Found') {
    super(message, 404);
  }
}
