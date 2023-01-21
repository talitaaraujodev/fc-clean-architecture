export class ValidationError extends Error {
  httpCode = 400;
  constructor(message: string) {
    super(message);
  }
}
