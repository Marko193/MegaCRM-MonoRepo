import {Column, Entity, JoinColumn, ManyToOne, PrimaryColumn} from 'typeorm';
import {BaseEntity} from './base.entity';
import {ApiProperty} from '@nestjs/swagger';
import {User} from './user.entity';
import {MarriedStatus} from '../enums';

@Entity({name: 'family'})
export class Family extends BaseEntity {
  @ApiProperty({example: '1', description: 'Primary key.'})
  @PrimaryColumn()
  id!: number;

  @ManyToOne(() => User, {orphanedRowAction: 'delete', onDelete: 'CASCADE'})
  @ApiProperty({
    example: '1',
    description: 'User id.',
  })
  @Column({type: 'integer'})
  @JoinColumn({name: 'user_id', referencedColumnName: 'id'})
  user_id!: number;

  @ApiProperty({description: 'Family member status - married/divorced'})
  @Column({type: 'enum', enum: MarriedStatus})
  status!: MarriedStatus;
}
