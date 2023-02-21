import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {BaseEntity} from './base.entity';
import {Permission} from './permission.entity';
import {UserRoles} from './user-roles.entity';
import {ApiProperty} from '@nestjs/swagger';

@Entity({name: 'role_permission'})
export class RolePermission extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Column({type: 'integer'})
  id!: number;

  @ApiProperty({
    description: 'The role id to identify the role.',
  })
  @Column({type: 'integer'})
  role_id!: number;

  @ApiProperty({
    description: 'The permission id to identify the permission.',
  })
  @Column({type: 'integer'})
  permission_id!: number;

  @ManyToOne(() => UserRoles)
  @JoinColumn({name: 'role_id', referencedColumnName: 'id'})
  roles_info!: UserRoles;

  @ManyToOne(() => Permission)
  @JoinColumn({name: 'permission_id', referencedColumnName: 'id'})
  permission_info!: Permission;
}
