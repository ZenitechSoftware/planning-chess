export class HttpError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export function isHttpError(err: Partial<Error>): err is HttpError {
  return err instanceof HttpError;
}
