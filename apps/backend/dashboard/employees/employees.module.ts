import {Token} from './../entities/tokens.entity';
import {forwardRef, Module} from '@nestjs/common';
import {EmployeesService} from './employees.service';
import {EmployeesController} from './employees.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from '../entities/user.entity';
import {CryptoModule} from '../crypto/crypto.module';
import {Family} from '../entities/family.entity';
import {FamilyMembers} from '../entities/family-members.entity';
import {UserRoles} from '../entities/user-roles.entity';
import {NodemailerModule} from '../nodemailer/nodemailer.module';
import {UserRolesModule} from '../user-roles/user-roles.module';
import {UserRolesService} from '../user-roles/user-roles.service';
import {AuthModule} from '../auth/auth.module';
import {ApiConfigModule} from '../config/config.module';
import {HelperFunctions} from '../constants';
import {TokenModule} from '../token/token.module';
import {PageOptionsDto} from '../pagination';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    UserRolesModule,
    CryptoModule,
    TokenModule,
    NodemailerModule,
    ApiConfigModule,
    TypeOrmModule.forFeature([User, Token, Family, FamilyMembers, UserRoles]),
  ],
  controllers: [EmployeesController],
  providers: [
    EmployeesService,
    UserRolesService,
    HelperFunctions,
    PageOptionsDto,
  ],
  exports: [
    EmployeesService,
    UserRolesService,
    HelperFunctions,
    PageOptionsDto,
  ],
})
export class EmployeesModule {}
