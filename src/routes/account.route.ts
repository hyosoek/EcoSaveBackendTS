import { Router } from 'express';
import AccountController from '@controllers/account.controller';

class AccountRoute {
  public path = '/account';
  public router = Router();
  public accountController = new AccountController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`/log-in`, this.accountController.logIn);
  }
}

export default new AccountRoute();
