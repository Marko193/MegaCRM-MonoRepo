import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {BaseEntity} from './base.entity';
import {ApiProperty} from '@nestjs/swagger';
import {RolePermission} from './role-permission.entity';
import {Roles} from '../enums';

@Entity({name: 'user_roles'})
export class UserRoles extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Column({type: 'integer'})
  id!: number;

  @ApiProperty({
    description: 'The role title.',
  })
  @Column({type: 'enum', enum: Roles})
  role!: Roles;

  @ApiProperty({
    description: 'The description to mention the role.',
  })
  @Column({type: 'text'})
  description!: string;

  @ApiProperty({
    description: 'The flag to check whether the role is currently active.',
  })
  @Column({type: 'boolean'})
  active!: boolean;

  @ApiProperty({
    description: 'The complete details about the role.',
  })
  @Column({type: 'varchar', length: 255})
  content!: string;

  @OneToMany(() => RolePermission, (roleperm) => roleperm.roles_info)
  permissions!: RolePermission[];
}
