import {Company} from './../entities/company.entity';
import {TypeOrmModuleOptions} from '@nestjs/typeorm';
import * as path from 'path';
import {ApiConfigService} from './config.service';
import {Env} from './envs';

export const getTypeOrmConfig = (
  configService: ApiConfigService
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.dbHost,
  port: +configService.dbPort,
  username: configService.dbUser,
  password: configService.dbPassword,
  database: configService.dbName,
  entities: configService.env === Env.DEV ? [Company] : ['dist/**/*.entity.js'],
  synchronize: Boolean(+configService.sync),
  migrations: [path.join(__dirname, 'src/migration/*.ts')],
  migrationsTableName: 'migration',
});
