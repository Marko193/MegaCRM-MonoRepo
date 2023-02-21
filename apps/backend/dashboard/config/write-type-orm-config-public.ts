import {Company} from './../entities/company.entity';
import {config} from 'dotenv';
import {ConfigService} from '@nestjs/config';
import {DataSource} from 'typeorm';
import {Init1667310121337} from '../migrations/1667310121337-Init';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get('POSTGRES_HOST'),
  port: configService.get('POSTGRES_PORT'),
  username: configService.get('POSTGRES_USER'),
  password: configService.get('POSTGRES_DATABASE_PASSWORD'),
  database: configService.get('POSTGRES_DATABASE_NAME'),
  entities: [Company],
  migrations: [Init1667310121337],
});
