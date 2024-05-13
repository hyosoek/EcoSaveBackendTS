import { httpLogger, logger } from '@modules/logger';
import { NextFunction, Request, Response } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
  res.on('finish', () => {
    if ('status' in res.locals) logger.error(res.locals.result);
    // else logger.http('response : ' + JSON.stringify(res.locals.result));
  });
  next();
};
