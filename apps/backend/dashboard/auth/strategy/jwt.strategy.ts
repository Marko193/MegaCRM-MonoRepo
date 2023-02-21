import {UnauthorizedException} from '@nestjs/common';
import {ApiConfigService} from './../../config/config.service';
import {EmployeesService} from '../../employees/employees.service';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {PassportStrategy} from '@nestjs/passport';
import {Injectable} from '@nestjs/common';
import Payload from '../interface/payload.interface';
import {User} from '../../entities/user.entity';
import {ContextIdFactory, ModuleRef} from '@nestjs/core';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private moduleRef: ModuleRef, configService: ApiConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.jwtPrivateKeyAccess,
      algorithms: ['RS256'],
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: Payload): Promise<User> {
    const contextId = ContextIdFactory.getByRequest(request);
    const employeesService = await this.moduleRef.resolve(
      EmployeesService,
      contextId
    );
    const user = await employeesService.findEmployeeByIdHelper(payload.id);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
