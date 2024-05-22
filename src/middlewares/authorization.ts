import { UnauthorizedException } from '@modules/customError';
import { decodeToken } from '@modules/token';
import { NextFunction, Request, Response } from 'express';

export const authCheck = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    req.decoded = await decodeToken(req.headers.authorization);
    if (!req.decoded) {
      const error = new UnauthorizedException();
      throw error;
    }
    next();
  } catch (err) {
    next(err);
  }
};
