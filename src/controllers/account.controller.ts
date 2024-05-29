import { Container } from 'typedi';
import { NextFunction, Request, Response } from 'express';
import AccountService from '@services/account.service';
import inputCheck from '@modules/inputCheck';
import { HttpStatus } from '@modules/httpStatus';

class AccountController {
  public accountService = Container.get(AccountService);

  constructor() {}

  //Error handling with validation
  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    const { mail, pw }: { mail: string; pw: string } = req.body;
    try {
      inputCheck(mail).isNotEmpty().isLength({ min: 4, max: 100 }).isMail();
      inputCheck(pw).isNotEmpty().isLength({ min: 4, max: 100 });
      res.status(HttpStatus.OK).send();
    } catch (err) {
      console.log(err);
      next(err);
    }
  };
}

export default AccountController;
