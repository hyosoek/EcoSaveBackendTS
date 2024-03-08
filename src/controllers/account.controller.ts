import { NextFunction, Request, Response } from 'express';
import AccountService from '@services/account.service';
import { PostService } from '@services/post.service';
import inputCheck from '@modules/inputCheck';

// @Injectable()
class AccountController {
  public accountService = new AccountService();
  // constructor() {
  // } // private readonly postService: PostService // private readonly accountService: AccountService,

  // public logIn() {
  //   console.log('??');
  // }

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    const { mail, pw, temp }: { mail: string; pw: string; temp: number } =
      req.body;
    try {
      inputCheck(mail).isNotEmpty().isLength({ min: 4, max: 100 }).isMail();
      inputCheck(pw).isNotEmpty().isLength({ min: 4, max: 100 });
      inputCheck(temp).isNotEmpty().isFloat();
      res.locals.result = await this.accountService.logIn(req.body);
      next();
    } catch (err) {
      next(err);
    }
  };

  public longLogIn = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { mail, pw, temp }: { mail: string; pw: string; temp: number } =
      req.body;
    try {
      inputCheck(mail).isNotEmpty().isLength({ min: 4, max: 100 }).isMail();
      inputCheck(pw).isNotEmpty().isLength({ min: 4, max: 100 });
      inputCheck(temp).isNotEmpty().isFloat();
      res.locals.result = await this.accountService.longLogIn(req.body);
      next();
    } catch (err) {
      next(err);
    }
  };

  public getAccountByIdx() {}

  public getPostByUserIdx() {}
}

export default AccountController;
