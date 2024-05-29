import { NextFunction, Request, Response } from 'express';
import RefrigeratorService from '@services/refrigerator.service';
import inputCheck from '@modules/inputCheck';
import { BadRequestException } from '@modules/customError';
import regexPatterns from '@modules/regex';
import { HttpStatus } from '@modules/httpStatus';
import Container from 'typedi';

class RefrigeratorController {
  public refrigeratorService: RefrigeratorService =
    Container.get(RefrigeratorService);

  constructor() {}

  //Error handling with validation
  public search = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.query;
    try {
      inputCheck(id).isNotEmpty();
      let intToInt = parseInt(id as string);
      if (Number.isNaN(intToInt)) {
        throw new BadRequestException('id should be integer');
      }
      const temp = req.originalUrl;

      if (temp.match(regexPatterns.pathParser)[1] == '/refrigerator')
        res.locals.result = await this.refrigeratorService.search(intToInt);
      else
        res.locals.result = await this.refrigeratorService.gistSearch(intToInt);

      res.status(HttpStatus.OK).send(res.locals.result);
    } catch (err) {
      console.log(err);
      next(err);
    }
  };
}

export default RefrigeratorController;
