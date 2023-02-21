import {RolePermission} from './role-permission.entity';
import {Entity, Column, PrimaryColumn, OneToMany} from 'typeorm';
import {BaseEntity} from './base.entity';
import {ApiProperty} from '@nestjs/swagger';

enum Permissions {
  create = 'create',
  update = 'update',
  delete = 'delete',
  read = 'read',
}
@Entity({name: 'permission'})
export class Permission extends BaseEntity {
  @ApiProperty({example: '1', description: 'Primary key.'})
  @PrimaryColumn()
  id!: number;

  @ApiProperty({
    description: 'The permission title.',
  })
  @Column({type: 'enum', enum: Permissions})
  title!: Permissions;

  @ApiProperty({
    description: 'The unique slug to search the permission.',
  })
  @Column({type: 'varchar', length: 100})
  slug!: string;

  @ApiProperty({
    description: 'The description to mention the permission.',
  })
  @Column({type: 'text'})
  description!: string;

  @ApiProperty({
    description: 'The complete details about the permission.',
  })
  @Column({type: 'varchar', length: 255})
  content!: string;

  @ApiProperty({
    description:
      'The flag to check whether the permission is currently active.',
  })
  @Column({type: 'boolean'})
  active!: boolean;

  @OneToMany(() => RolePermission, (roleperm) => roleperm.permission_info)
  permission!: RolePermission[];
}
