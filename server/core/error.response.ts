import { TInputError } from '@server/schema/response.schema';
import { StatusCodes, ReasonPhrases } from '@server/utils/httpStatusCode';

export default class ErrorResponse extends Error {
  protected statusCode: number;
  constructor({
    message = ReasonPhrases.INTERNAL_SERVER_ERROR,
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR,
  }: TInputError) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class BadRequest extends ErrorResponse {
  constructor(message = ReasonPhrases.BAD_REQUEST) {
    super({ message, statusCode: StatusCodes.BAD_REQUEST });
  }
}

export class ConflictError extends ErrorResponse {
  constructor(message = ReasonPhrases.CONFLICT) {
    super({ message, statusCode: StatusCodes.CONFLICT });
  }
}
export class ForbiddenError extends ErrorResponse {
  constructor(message = ReasonPhrases.FORBIDDEN) {
    super({ message, statusCode: StatusCodes.FORBIDDEN });
  }
}

export class NotFoundError extends ErrorResponse {
  constructor(message = ReasonPhrases.NOT_FOUND) {
    super({ message, statusCode: StatusCodes.NOT_FOUND });
  }
}

export class AuthFailureError extends ErrorResponse {
  constructor(message = ReasonPhrases.UNAUTHORIZED) {
    super({ message, statusCode: StatusCodes.UNAUTHORIZED });
  }
}
