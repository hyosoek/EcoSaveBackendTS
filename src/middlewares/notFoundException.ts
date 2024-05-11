import { BadRequestException, NotFoundException } from '@modules/customError';
import { NextFunction, Request, Response } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
  const err = new NotFoundException();
  next(err);
};
