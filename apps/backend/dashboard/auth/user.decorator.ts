import {createParamDecorator, ExecutionContext} from '@nestjs/common';
import UserObject from './interface/user.interface';

export const UserDecorator = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<UserObject>();
    const user = req.user;

    return data ? user?.[data] : user;
  }
);
