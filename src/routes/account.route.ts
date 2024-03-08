import { Router } from 'express';
import AccountController from '@controllers/account.controller';
// import { Injectable } from '@nestjs/common';

// @Injectable()
class AccountRoute {
  public path = '/account';
  public router = Router();
  public accountController = new AccountController();

  // private readonly accountController: AccountController;
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`/log-in`, this.accountController.logIn);
    this.router.post(`/log-in2`, this.accountController.longLogIn);
    // this.router.post(`${this.path}/sign-up`, this.accountController.signUp);
  }
}

export default new AccountRoute();
