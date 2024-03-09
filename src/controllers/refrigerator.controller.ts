import { NextFunction, Request, Response } from 'express';
import RefrigeratorService from '@services/refrigerator.service';
import inputCheck from '@modules/inputCheck';
import { BadRequestException } from '@modules/customError';

class RefrigeratorController {
  public refrigeratorService = new RefrigeratorService();

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

      res.locals.result = await this.refrigeratorService.search(intToInt);
      next();
    } catch (err) {
      console.log(err);
      next(err);
    }
  };
}

export default RefrigeratorController;
