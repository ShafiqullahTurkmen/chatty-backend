import mongoose from 'mongoose';
import Logger from 'bunyan';
import { config } from '@root/config';

const log: Logger = config.createLoggter('setupDatabase');

export default () => {
  const connect = () => {
    mongoose
      .connect(`${config.DATABASE_URL}`)
      .then(() => log.info('Successfully Connectted To DB'))
      .catch((e) => {
        log.error(`Error connecting to database ${e}`);
        return process.exit(1);
      });
  };
  connect();

  mongoose.connection.on('disconnect', connect);
};
