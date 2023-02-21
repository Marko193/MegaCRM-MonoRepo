import {CryptoModule} from './../crypto/crypto.module';
import {Module} from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';
import {PassportModule} from '@nestjs/passport';
import {AuthService} from './auth.service';
import {ApiConfigModule} from '../config/config.module';
import {AuthController} from './auth.controller';
import {LocalStrategy} from './strategy/local-strategy';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Token} from '../entities/tokens.entity';
import {JwtStrategy} from './strategy/jwt.strategy';
import {JwtRefreshTokenStrategy} from './strategy/refresh.strategy';
import {HelperFunctions} from '../constants';
import {NodemailerModule} from '../nodemailer/nodemailer.module';
import {User} from '../entities/user.entity';
import {EmployeesService} from './../employees/employees.service';
import {TokenModule} from '../token/token.module';
import {TokenService} from '../token/token.service';
import {PageOptionsDto} from '../pagination';
@Module({
  imports: [
    NodemailerModule,
    ApiConfigModule,
    PassportModule,
    CryptoModule,
    TokenModule,
    TypeOrmModule.forFeature([Token, User]),
    JwtModule.register({}),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    JwtRefreshTokenStrategy,
    HelperFunctions,
    EmployeesService,
    TokenService,
    PageOptionsDto,
  ],
  exports: [
    AuthService,
    JwtModule,
    EmployeesService,
    HelperFunctions,
    TokenService,
    PageOptionsDto,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
