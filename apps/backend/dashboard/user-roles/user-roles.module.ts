import {Module} from '@nestjs/common';
import {UserRolesController} from './user-roles.controller';
import {UserRolesService} from './user-roles.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserRoles} from '../entities/user-roles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserRoles])],
  controllers: [UserRolesController],
  providers: [UserRolesService],
  exports: [UserRolesService],
})
export class UserRolesModule {}
