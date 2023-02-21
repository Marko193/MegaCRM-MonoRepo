import {ApiProperty} from '@nestjs/swagger';
import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {BaseEntity} from './base.entity';

@Entity({name: 'company'})
export class Company extends BaseEntity {
  @ApiProperty({
    example: 'uuid format',
    description: 'Company id in uuid format.',
  })
  @PrimaryGeneratedColumn('uuid')
  company_id!: string;

  @ApiProperty({
    description: 'Company status if ttue it means that company active',
  })
  @Column({type: 'boolean'})
  status!: boolean;

  @ApiProperty({
    example: 'MegaDev',
    description: 'Name of company should be unique value',
  })
  @Column({type: 'varchar', unique: true, nullable: false})
  company_name!: string;
}
