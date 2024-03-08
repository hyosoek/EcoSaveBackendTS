import { Request, Response, NextFunction } from 'express';
import { httpLogger, logger } from 'modules/logger';
import { HttpStatus } from 'modules/httpStatus';

export default (req: Request, res: Response, next: NextFunction) => {
  // http req logging
  httpLogger(req, res, next);

  // response or error logging
  if ('status' in res.locals) logger.error(res.locals.result);
  // else logger.http('response = ' + JSON.stringify(res.locals.result)); //this is only for dev

  //reponse to front
  res
    .status('status' in res.locals ? res.locals.status : HttpStatus.OK)
    .send(res.locals.result);
};
