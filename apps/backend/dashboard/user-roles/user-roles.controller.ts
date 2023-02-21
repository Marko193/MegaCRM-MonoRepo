import {Controller, Get, Param, UseGuards} from '@nestjs/common';
import {ApiOperation, ApiResponse} from '@nestjs/swagger';
import JwtAuthenticationGuard from '../auth/guards/auth.guard';
import {UserRolesService} from './user-roles.service';
import {UserRoles} from '../entities/user-roles.entity';

@UseGuards(JwtAuthenticationGuard)
@Controller('user-roles')
export class UserRolesController {
  constructor(private readonly userRolesService: UserRolesService) {}

  @Get()
  @ApiOperation({summary: 'Get full users roles list'})
  @ApiResponse({
    status: 200,
    description: 'All users roles list',
    type: [UserRoles],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  public async getUsersRolesList() {
    return this.userRolesService.getUsersRolesList();
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Get userRole by id',
  })
  @ApiResponse({
    status: 200,
    description: 'UserRole object',
    type: UserRoles,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  public async getUserRoleItemById(@Param('id') id: number) {
    return this.userRolesService.getUserRoleItemById(id);
  }
}
