import { UnauthorizedException } from '@modules/customError';
import { decodeToken } from '@modules/token';
import { NextFunction, Request, Response } from 'express';

export const authCheck = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.headers.authorization) {
      const error = new UnauthorizedException('not exist token');
      throw error;
    }
    req.decoded = await decodeToken(req.headers.authorization);
    if (!req.decoded) {
      const error = new UnauthorizedException('invalid token');
      throw error;
    }
    next();
  } catch (err) {
    if (!err.status) {
      err = new UnauthorizedException('unexpected authorization failed');
    }
    next(err);
  }
};
