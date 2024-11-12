import { Sequelize } from 'sequelize-typescript';
import Env from './constants';
import { databaseConfig } from './database.config';

export const databaseProviders = [
  {
    provide: Env.SEQUELIZE,
    useFactory: async () => {
      let config;
      switch (process.env.NODE_ENV) {
        case Env.DEVELOPMENT:
          config = databaseConfig.development;
          break;
        // case Env.TEST:
        //   config = databaseConfig.test;
        //   break;
        case Env.PRODUCTION:
          config = databaseConfig.production;
          break;
        default:
          config = databaseConfig.development;
      }
      const sequelize = new Sequelize(config);
      sequelize.addModels(['models goes here']);
      await sequelize.sync();
      return sequelize;
    },
  },
];
