import {Strategy} from 'passport-local';
import {PassportStrategy} from '@nestjs/passport';
import {Injectable} from '@nestjs/common';
import {AuthService} from '../auth.service';
import {User} from '../../entities/user.entity';
import {ContextIdFactory, ModuleRef} from '@nestjs/core';
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private moduleRef: ModuleRef) {
    super({
      passReqToCallback: true,
      usernameField: 'corporate_email',
    });
  }
  async validate(
    request: Request,
    corporate_email: string,
    password: string
  ): Promise<User> {
    const contextId = ContextIdFactory.getByRequest(request);
    const authService = await this.moduleRef.resolve(AuthService, contextId);
    return authService.getAuthenticatedUser(corporate_email, password);
  }
}
