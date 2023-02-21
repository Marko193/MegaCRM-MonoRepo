import {EmployeesService} from '../../employees/employees.service';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {PassportStrategy} from '@nestjs/passport';
import {Injectable, UnauthorizedException} from '@nestjs/common';
import {Request} from 'express';
import Payload from '../interface/payload.interface';
import {ApiConfigService} from '../../config/config.service';
import {ContextIdFactory, ModuleRef} from '@nestjs/core';
@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token'
) {
  constructor(private moduleRef: ModuleRef, configService: ApiConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.jwtPublicKeyRefresh,
      algorithms: ['RS256'],
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: Payload) {
    const refreshToken = request.headers?.authorization
      .replace('Bearer', '')
      .trim();

    const contextId = ContextIdFactory.getByRequest(request);
    const employeesService = await this.moduleRef.resolve(
      EmployeesService,
      contextId
    );
    const authuser = await employeesService.getUserIfRefreshTokenMatches(
      refreshToken,
      payload.id
    );
    if (!authuser) {
      throw new UnauthorizedException();
    }
    return authuser;
  }
}
