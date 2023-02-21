import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ApiConfigModule} from './config/config.module';
import {ApiConfigService} from './config/config.service';
import {getTypeOrmConfig} from './config/typeorm.config';
import {AppController} from './app/app.controller';
import {AppService} from './app/app.service';
import {EmployeesModule} from './employees/employees.module';
import {AuthModule} from './auth/auth.module';
import {CryptoModule} from './crypto/crypto.module';
import {CandidatesModule} from './candidates/candidates.module';
import {FamilyMembersModule} from './family-members/family-members.module';
import {PositionsModule} from './positions/positions.module';
import {LanguagesModule} from './languages/languages.module';
import {LanguagesLevelModule} from './languages-levels/languages-level.module';
import {SkillsModule} from './skills/skills.module';
import {UserRolesModule} from './user-roles/user-roles.module';
import {CalendarRequestsModule} from './calendar_requests/calendar-requests.module';
import {CompanyModule} from './company/company.module';
import {TenancyModule} from './tenancy/tenancy.module';
import {WarehouseModule} from './warehouse/warehouse.module';
import {WarehouseRequestsModule} from './warehouse-requests/warehouse-requests.module';
import {companyMiddleware} from './tenancy/tenancy.middleware';
import {TokenModule} from './token/token.module';
import {MeetingRequestsModule} from './meeting_requests/meeting-requests.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ApiConfigModule],
      useFactory: (configService: ApiConfigService) => {
        return getTypeOrmConfig(configService);
      },
      inject: [ApiConfigService],
    }),
    AuthModule,
    CalendarRequestsModule,
    CandidatesModule,
    CryptoModule,
    EmployeesModule,
    FamilyMembersModule,
    PositionsModule,
    LanguagesModule,
    LanguagesLevelModule,
    MeetingRequestsModule,
    SkillsModule,
    UserRolesModule,
    CompanyModule,
    TenancyModule,
    TokenModule,
    WarehouseModule,
    WarehouseRequestsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(companyMiddleware)
      .forRoutes(
        'auth',
        'calendar-requests',
        'candidates',
        'employees',
        'family-members',
        'languages',
        'languages-levels',
        'meetings',
        'positions',
        'skills',
        'user-roles',
        'warehouse',
        'warehouse-requests'
      );
  }
}
