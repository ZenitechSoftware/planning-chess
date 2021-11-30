export class HttpError extends Error {
  statusCode: number;

  constructor(message = 'Internal Server Error', statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
  }
}

export function isHttpError(err: Partial<Error>): err is HttpError {
  return err instanceof HttpError;
}
