import { Router } from 'express';
import RefrigeratorController from '@controllers/refrigerator.controller';
import { authCheck } from '@middlewares/authorization';

class RefrigeratorRoute {
  public path = '/refrigerator';
  public router = Router();
  public refrigeratorController = new RefrigeratorController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`/`, authCheck, this.refrigeratorController.search);
    this.router.get(`/gist`, authCheck, this.refrigeratorController.search);
  }
}

export default new RefrigeratorRoute();
