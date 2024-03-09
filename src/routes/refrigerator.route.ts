import { Router } from 'express';
import RefrigeratorController from '@controllers/refrigerator.controller';

class RefrigeratorRoute {
  public path = '/refrigerator';
  public router = Router();
  public refrigeratorController = new RefrigeratorController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`/`, this.refrigeratorController.search);
    this.router.get(`/gist`, this.refrigeratorController.search);
  }
}

export default new RefrigeratorRoute();
