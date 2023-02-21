import {config} from 'dotenv';
import {ConfigService} from '@nestjs/config';
import {DataSource} from 'typeorm';
import {RolePermission} from '../entities/role-permission.entity';
import {UserRoles} from '../entities/user-roles.entity';
import {User} from '../entities/user.entity';
import {Token} from '../entities/tokens.entity';
import {Permission} from '../entities/permission.entity';
import {Family} from '../entities/family.entity';
import {FamilyMembers} from '../entities/family-members.entity';
import {CandidatesEntity} from '../entities/candidates.entity';
import {CandidatePositionEntity} from '../entities/candidate-position.entity';
import {PositionsEntity} from '../entities/positions.entity';
import {CandidateLanguagesEntity} from '../entities/candidate-languages.entity';
import {CandidateSkillsEntity} from '../entities/candidate-skills.entity';
import {SkillsEntity} from '../entities/skills.entity';
import {UserPositionEntity} from '../entities/user.position.entity';
import {UserLanguagesEntity} from '../entities/user-languages.entity';
import {UserSkillsEntity} from '../entities/user-skills.entity';
import {LanguagesEntity} from '../entities/languages.entity';
import {LanguagesLevelEntity} from '../entities/languages-level.entity';
import {CalendarRequestEntity} from '../entities/calendar-request.entity';
import {WarehouseItemEntity} from '../entities/warehouse.entity';
import {UserWarehouseItemsEntity} from '../entities/user-warehouse-items.entity';
import {WarehouseRequestEntity} from '../entities/warehouse-request.entity';
import {InitActual1667395585988} from '../migrations/migrations-tenant/1667395585988-Init-actual';
import {MeetingRequestEntity} from '../entities/meeting-request.entity';
import {UserMeetingsRequestsItemsEntity} from '../entities/user-meetings-requests.entity';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  schema: 'migration_template',
  host: configService.get('POSTGRES_HOST'),
  port: configService.get('POSTGRES_PORT'),
  username: configService.get('POSTGRES_USER'),
  password: configService.get('POSTGRES_DATABASE_PASSWORD'),
  database: configService.get('POSTGRES_DATABASE_NAME'),
  entities: [
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
  ],
  migrations: [InitActual1667395585988],
});
