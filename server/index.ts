import express from 'express';
import path from 'path';
import compression from 'compression';
import helmet from 'helmet';
import morgan from 'morgan';

import rootRouter from '@server/routes';
import appConfig from '@server/configs/app.config';
import next from 'next';

const dev = !appConfig.app.isProd;
function resolve(p: string) {
  return path.resolve(__dirname, p);
}
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  if (dev) {
    server.use(morgan('dev'));
  } else {
    server.use(morgan('tiny'));
    server.use(helmet());
    server.use(compression());
    server.use(express.static(resolve('src')));
  }
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));

  // init db

  import('@server/dbs/init.mongodb');
  // routes

  server.use('/api/v1', rootRouter);

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(appConfig.app.port, () => {
    console.log(`Server is started: http://localhost:${appConfig.app.port}`);
  });
});
