export class UnauthorizedError extends Error {
    statusCode: number

    constructor(message) {
      super(message);
      this.statusCode = 401;
    }
  }
  