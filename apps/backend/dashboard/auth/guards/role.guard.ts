import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import UserObject from '../interface/user.interface';
import {UserRolesService} from '../../user-roles/user-roles.service';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userRolesService: UserRolesService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest<UserObject>();
    const databaseUserRoleInfo =
      await this.userRolesService.getUserRoleItemById(request.user.role_id);
    return roles.includes(databaseUserRoleInfo?.role);
  }
}
