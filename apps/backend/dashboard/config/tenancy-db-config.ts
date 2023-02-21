import {Company} from './../entities/company.entity';
import {ConfigService} from '@nestjs/config/dist/config.service';
import {DataSourceOptions} from 'typeorm';
import {Family} from '../entities/family.entity';
import {FamilyMembers} from '../entities/family-members.entity';
import {Permission} from '../entities/permission.entity';
import {RolePermission} from '../entities/role-permission.entity';
import {Token} from '../entities/tokens.entity';
import {UserRoles} from '../entities/user-roles.entity';
import {User} from '../entities/user.entity';
import {SnakeNamingStrategy} from './snake-naming.strategy';
import {CandidatesEntity} from '../entities/candidates.entity';
import {CandidateLanguagesEntity} from '../entities/candidate-languages.entity';
import {CandidatePositionEntity} from '../entities/candidate-position.entity';
import {CandidateSkillsEntity} from '../entities/candidate-skills.entity';
import {LanguagesEntity} from '../entities/languages.entity';
import {LanguagesLevelEntity} from '../entities/languages-level.entity';
import {PositionsEntity} from '../entities/positions.entity';
import {SkillsEntity} from '../entities/skills.entity';
import {UserPositionEntity} from '../entities/user.position.entity';
import {UserLanguagesEntity} from '../entities/user-languages.entity';
import {UserSkillsEntity} from '../entities/user-skills.entity';
import {CalendarRequestEntity} from '../entities/calendar-request.entity';
import {WarehouseItemEntity} from '../entities/warehouse.entity';
import {UserWarehouseItemsEntity} from '../entities/user-warehouse-items.entity';
import {WarehouseRequestEntity} from '../entities/warehouse-request.entity';
import {InitActual1667395585988} from '../migrations/migrations-tenant/1667395585988-Init-actual';
import {migrations1667830139602} from '../migrations/migrations-tenant/1667830139602-metadata';
import {ChangeUserCandidatePositionRelationship1667993179484} from '../migrations/migrations-tenant/1667993179484-Change-User-Candidate-Position-Relationship';
import {MeetingRequestEntity} from '../entities/meeting-request.entity';
import {UserMeetingsRequestsItemsEntity} from '../entities/user-meetings-requests.entity';

const configService = new ConfigService();

const companysEntity = [
  CalendarRequestEntity,
  CandidateLanguagesEntity,
  CandidatePositionEntity,
  CandidateSkillsEntity,
  CandidatesEntity,
  Family,
  FamilyMembers,
  LanguagesEntity,
  LanguagesLevelEntity,
  Permission,
  PositionsEntity,
  RolePermission,
  SkillsEntity,
  Token,
  User,
  UserPositionEntity,
  UserRoles,
  UserLanguagesEntity,
  UserSkillsEntity,
  WarehouseItemEntity,
  UserWarehouseItemsEntity,
  WarehouseRequestEntity,
  MeetingRequestEntity,
  UserMeetingsRequestsItemsEntity,
];

const publicEntity = [Company];

export const connectionOptions = (schema: string): DataSourceOptions => ({
  type: 'postgres',
  schema: schema,
  name: schema,
  namingStrategy: new SnakeNamingStrategy(),
  host: configService.get('POSTGRES_HOST'),
  port: configService.get('POSTGRES_PORT'),
  username: configService.get('POSTGRES_USER'),
  password: configService.get('POSTGRES_DATABASE_PASSWORD'),
  database: configService.get('POSTGRES_DATABASE_NAME'),
  entities: schema === 'public' ? publicEntity : companysEntity,
  migrations: [
    InitActual1667395585988,
    migrations1667830139602,
    ChangeUserCandidatePositionRelationship1667993179484,
  ],
  synchronize: false,
  logging: true,
});
