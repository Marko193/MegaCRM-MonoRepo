import {HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import {DataSource, Repository} from 'typeorm';
import {UserRoles} from '../entities/user-roles.entity';
import {CONNECTION} from '../tenancy/tenancy.symbols';
@Injectable()
export class UserRolesService {
  private readonly userRolesEntity: Repository<UserRoles>;
  constructor(@Inject(CONNECTION) connection: DataSource) {
    this.userRolesEntity = connection.getRepository(UserRoles);
  }

  public async getUsersRolesList(): Promise<UserRoles[]> {
    const userRolesList = await this.userRolesEntity.find();
    if (!userRolesList) {
      throw new HttpException(
        'No userRole items were found!',
        HttpStatus.NOT_FOUND
      );
    }

    try {
      return userRolesList;
    } catch (err) {
      throw new HttpException(
        `${err.detail}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async getUserRoleItemById(id: number): Promise<UserRoles> {
    const userRoleItem = await this.userRolesEntity.findOne({
      where: {
        id,
      },
    });
    if (!userRoleItem) {
      throw new HttpException(
        `UserRole item with such id was not found!`,
        HttpStatus.NOT_FOUND
      );
    }
    return userRoleItem;
  }
}
