import {ApiProperty} from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {BaseEntity} from './base.entity';
import {User} from './user.entity';
import {CalendarRequestStatuses} from '../enums';
import {WarehouseItemEntity} from './warehouse.entity';

@Entity({name: 'warehouse_requests'})
export class WarehouseRequestEntity extends BaseEntity {
  @ApiProperty({example: '1', description: 'Primary key.'})
  @PrimaryGeneratedColumn()
  @Column({type: 'integer'})
  id!: number;

  @ManyToOne(() => User, {orphanedRowAction: 'delete', onDelete: 'CASCADE'})
  @ApiProperty({
    example: '1',
    description: 'User id.',
  })
  @Column({type: 'integer'})
  @JoinColumn({name: 'user_id', referencedColumnName: 'id'})
  user_id!: number;

  @ManyToOne(() => WarehouseItemEntity, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
  })
  @ApiProperty({
    example: '1',
    description: 'warehouse item id.',
  })
  @Column({type: 'integer'})
  @JoinColumn({name: 'item_id', referencedColumnName: 'id'})
  item_id!: number;

  @ApiProperty({
    example: 'approved',
    description:
      'Status of warehouse calendar request (processing / approved / denied)',
  })
  @Column({type: 'enum', enum: CalendarRequestStatuses})
  status!: CalendarRequestStatuses;

  @ApiProperty({description: 'The brief comment for request'})
  @Column({type: 'text'})
  comment!: string;

  @ApiProperty({description: 'Reviewer name'})
  @Column({type: 'varchar', length: 45})
  user_name!: string;

  @ApiProperty({description: 'Reviewer surname'})
  @Column({type: 'varchar', length: 45})
  user_surname!: string;

  @ApiProperty({description: 'Reviewer position'})
  @Column({type: 'varchar', length: 45})
  user_position!: string;

  @ManyToOne(() => User, {orphanedRowAction: 'delete', onDelete: 'CASCADE'})
  @ApiProperty({
    example: '1',
    description: 'Reviewer id (HR usually).',
  })
  @Column({type: 'integer'})
  @JoinColumn({name: 'reviewer_id', referencedColumnName: 'id'})
  reviewer_id!: number;

  @ApiProperty({description: 'Reviewer name'})
  @Column({type: 'varchar', length: 45})
  reviewer_name!: string;

  @ApiProperty({description: 'Reviewer surname'})
  @Column({type: 'varchar', length: 45})
  reviewer_surname!: string;

  @ApiProperty({description: 'Reviewer position'})
  @Column({type: 'varchar', length: 45})
  reviewer_position!: string;
}
