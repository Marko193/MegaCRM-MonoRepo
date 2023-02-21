import {ApiProperty} from '@nestjs/swagger';
import {Column, Entity} from 'typeorm';
import {BaseEntity} from './base.entity';
import {
  WarehouseItemStatuses,
  WarehouseItemConditionType,
  WarehouseItemTypes,
  currencyValues,
} from '../enums';

@Entity({name: 'warehouse'})
export class WarehouseItemEntity extends BaseEntity {
  @ApiProperty({
    example: 'free / using ',
    description: 'Is warehouse item free or using',
  })
  @Column({type: 'enum', enum: WarehouseItemStatuses})
  item_status!: WarehouseItemStatuses;

  @ApiProperty({
    description: 'Comment to warehouse item',
  })
  @Column({type: 'text', nullable: true})
  comment!: string;

  @ApiProperty({
    description: 'Item condition type - new / used',
  })
  @Column({type: 'enum', enum: WarehouseItemConditionType})
  item_condition_type!: WarehouseItemConditionType;

  @Column({type: 'varchar', length: 100})
  item_name!: string;

  @ApiProperty({
    description: 'Warehouse item type',
  })
  @Column({type: 'enum', enum: WarehouseItemTypes})
  item_type!: WarehouseItemTypes;

  @ApiProperty({
    example: '123456789',
    description: 'inventory unique item number',
  })
  @Column({type: 'varchar', unique: true})
  item_number!: string;

  @ApiProperty({
    example: '123456789',
    description: 'inventory model number',
  })
  @Column({type: 'varchar', nullable: true})
  model_number!: string;

  @ApiProperty({description: 'The item price', nullable: true})
  @Column({type: 'decimal', precision: 10, scale: 2, default: 0})
  item_price!: number;

  @ApiProperty({
    description: 'Currency item value',
  })
  @Column({type: 'enum', enum: currencyValues, nullable: true})
  item_currency_value!: currencyValues;

  @ApiProperty({
    example: '123456789',
    description: 'inventory unique model number',
  })
  @Column({type: 'varchar'})
  item_vendor_type!: string;
}
