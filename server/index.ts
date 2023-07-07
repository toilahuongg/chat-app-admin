import express from 'express';
import path from 'path';
import fs from 'fs';
import https from 'https';
import compression from 'compression';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';

import rootRouter from '@server/routes';
import appConfig from '@server/configs/app.config';
import next from 'next';
import { Server } from 'socket.io';
import { createClient } from 'redis';
import { createAdapter } from '@socket.io/redis-adapter';
import RedisServer from './services/redis.service';

const dev = !appConfig.app.isProd;
function resolve(p: string) {
  return path.resolve(__dirname, p);
}
const app = next({ dev });
const handle = app.getRequestHandler();

const httpsOptions = {
  key: fs.readFileSync('./certification/cert.key'),
  cert: fs.readFileSync('./certification/cert.pem'),
};

app.prepare().then(async () => {
  const server = express();
  const httpsServer = https.createServer(httpsOptions, server);
  const io = new Server(httpsServer);
  const pubClient = createClient({ url: 'redis://localhost:6379' });
  const subClient = pubClient.duplicate();
  await Promise.all([pubClient.connect(), subClient.connect()]).then(() => {
    io.adapter(createAdapter(pubClient, subClient));
  });

  io.on('connection', (socket) => {
    console.log('Client id connected ' + socket.id);
    socket.on('message', (msg) => {
      io.send(socket.id + ': ' + msg);
    });
  });
  if (dev) {
    server.use(morgan('dev'));
  } else {
    server.use(morgan('tiny'));
    server.use(helmet());
    server.use(compression());
    server.use(express.static(resolve('src')));
  }
  server.use(cors());
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));

  // init db

  import('@server/dbs/init.mongodb');
  // routes

  server.use(express.static(path.join(__dirname, 'public')));

  server.use('/api/v1', rootRouter);

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  RedisServer.getInstance();

  httpsServer.listen(appConfig.app.port, () => {
    console.log(`Server is started: https://localhost:${appConfig.app.port}`);
  });
});
