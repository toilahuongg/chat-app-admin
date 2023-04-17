import { NextFunction, Request, Response } from 'express';

type TFn = (req: Request, res: Response, next: NextFunction) => Promise<any>;
export const detectException = (fn: TFn) => {
  return <TFn>((req, res, next) => {
    fn(req, res, next).catch((err) => {
      next(err);
    });
  });
};
