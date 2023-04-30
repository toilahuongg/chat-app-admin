import { BadRequest } from '@server/core/error.response';
import { detectException } from '@server/middlewares';
import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

const validate = (schema: AnyZodObject) => {
  return detectException(async (req: Request, res: Response, next: NextFunction) => {
    const result = await schema.safeParseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    if (result.success) {
      req.body = result.data.body;
      req.query = result.data.query;
      req.params = result.data.params;
      return next();
    }
    throw new BadRequest(result.error.issues[0].message);
  });
};

export default validate;
