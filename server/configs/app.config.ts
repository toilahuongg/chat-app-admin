import dotenv from 'dotenv';

dotenv.config();

const isProd = process.env.NODE_ENV === 'production';

const COMMON_APP = {
  isProd,
  secretKey: process.env.SECRET_KEY || 'toilahuong',
  maxLengthRefreshToken: process.env.MAX_REFRESH_TOKEN || 10,
  tokenExpiresIn: process.env.TOKEN_EXPIRESIN || '1h',
  refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRESIN || '7d',
};

const DEV = {
  app: {
    port: process.env.DEV_APP_PORT || 3006,
    ...COMMON_APP,
  },
  db: {
    host: process.env.DEV_DB_HOST || 'localhost',
    port: process.env.DEV_DB_PORT || 27017,
    name: process.env.DEV_DB_NAME || 'portfolio',
    user: process.env.DEV_DB_USER || 'root',
    pass: process.env.DEV_DB_PASS || '',
  },
};

const PROD = {
  app: {
    port: process.env.PROD_APP_PORT || 3006,
    ...COMMON_APP,
  },
  db: {
    host: process.env.PROD_DB_HOST || 'localhost',
    port: process.env.PROD_DB_PORT || 27017,
    name: process.env.PROD_DB_NAME || 'portfolio',
    user: process.env.PROD_DB_USER || 'root',
    pass: process.env.PROD_DB_PASS || '',
  },
};

const config = { DEV, PROD };

export default config[isProd ? 'PROD' : 'DEV'];
