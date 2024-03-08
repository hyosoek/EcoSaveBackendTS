// Declare
import express, { Express, Request, Response, NextFunction } from 'express';
import https from 'https';
import cookieParser from 'cookie-parser';
import errorHandler from 'middlewares/errorHandling';
import cors from 'cors';
import * as redis from 'redis';
import { sslOptions } from 'configs/sslOptions';
import { config } from 'dotenv';
config({ path: '.env' });
import postProcessor from 'middlewares/postProcessor';

import accountRoute from '@routes/account.route';

// import AccountRoute from '@routes/account.route';

const app = express();
const port = Number(process.env.PORT_NUM);
const httpsPort = Number(process.env.HTTPS_PORT_NUM);
const server: https.Server = https.createServer(sslOptions, app);

const redisClient: redis.RedisClientType = redis.createClient();
redisClient.connect();
app.get('*', (req: Request, res: Response, next: NextFunction) => {
  const protocol: string = req.protocol;
  if (protocol == 'https') {
    next();
  } else {
    const destination: string = `https://${req.hostname}:${httpsPort}${req.url}`;
    res.redirect(destination);
  }
});

app.use(
  cors({
    // origin: 'http://localhost:${port}',
    origin: '*',
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('../'));
app.use(cookieParser());

//API
app.use(accountRoute.path, accountRoute.router);

//MiddleWare
app.use(errorHandler);
app.use(postProcessor);

app.listen(port, () => {
  console.log(`Http server is running at port:${port}`);
});

server.listen(httpsPort, () => {
  console.log(`Https server is running at port:${httpsPort}`);
});
