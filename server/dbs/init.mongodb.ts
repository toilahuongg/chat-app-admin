import mongoose from 'mongoose';
import appConfig from '@server/configs/app.config';

const {
  db: { host, name, pass, port, user },
  app: { isProd },
} = appConfig;

const connectString = `mongodb://${host}:${port}/${name}?authSource=admin`;
class Database {
  private static instance: Database;
  constructor() {
    this.connect();
  }
  connect() {
    if (!isProd) {
      // mongoose.set('debug', true);
      // mongoose.set('debug', { color: true });
    }
    mongoose
      .connect(connectString, {
        user,
        pass,
        maxPoolSize: 50,
      })
      .then(() => {
        console.log('Connected Mongodb Success');
      })
      .catch((err) => console.log('Connect Mongodb Error::', err));
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

const instanceMongodb = Database.getInstance();

export default instanceMongodb;
