/* eslint-disable @typescript-eslint/no-explicit-any */
import { TInputSuccess } from '@server/schema/response.schema';
import { ReasonPhrases, StatusCodes } from '@server/utils/httpStatusCode';
import { Response } from 'express';

export class SuccessResponse<T> {
  protected message: string;
  protected statusCode: number;
  protected metadata: T;
  constructor({ message = ReasonPhrases.OK, statusCode = StatusCodes.OK, metadata }: TInputSuccess<T>) {
    this.message = message;
    this.statusCode = statusCode;
    this.metadata = metadata;
  }

  send(res: Response, headers: { [key: string]: any }[] = []) {
    headers.forEach((header) => {
      const name = Object.keys(header)[0];
      const value = header[name];
      res.setHeader(name, value);
    });
    return res.status(this.statusCode).json(this);
  }
}

export class OK<T> extends SuccessResponse<T> {
  constructor({ message, metadata }: TInputSuccess<T>) {
    super({ message, metadata });
  }
}

export class CREATED<T> extends SuccessResponse<T> {
  constructor({ message = ReasonPhrases.CREATED, statusCode = StatusCodes.CREATED, metadata }: TInputSuccess<T>) {
    super({ message, statusCode, metadata });
  }
}
