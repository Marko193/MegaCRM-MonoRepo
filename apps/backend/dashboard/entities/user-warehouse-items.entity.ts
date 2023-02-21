import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {BaseEntity} from './base.entity';
import {ApiProperty} from '@nestjs/swagger';
import {User} from './user.entity';
import {WarehouseItemEntity} from './warehouse.entity';

@Entity({name: 'user_warehouse_items'})
export class UserWarehouseItemsEntity extends BaseEntity {
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

  @OneToOne(() => WarehouseItemEntity, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
  })
  @ApiProperty({
    example: '1',
    description: 'warehouse item id.',
  })
  @Column({type: 'integer'})
  @JoinColumn({name: 'warehouse_item_id', referencedColumnName: 'id'})
  warehouse_item_id!: number;
}
