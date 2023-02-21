import {ApiProperty} from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {BaseEntity} from './base.entity';
import {PositionsEntity} from './positions.entity';
import {User} from './user.entity';

@Entity({name: 'user_position'})
export class UserPositionEntity extends BaseEntity {
  @ApiProperty({example: '1', description: 'Primary key.'})
  @PrimaryGeneratedColumn()
  @Column({type: 'integer'})
  id!: number;

  @ApiProperty({
    example: '1',
    description: 'User id.',
  })
  @OneToOne(() => User, {orphanedRowAction: 'delete', onDelete: 'CASCADE'})
  @Column({type: 'integer'})
  @JoinColumn({name: 'user_id', referencedColumnName: 'id'})
  user_id!: number;

  @ApiProperty({
    description: 'Position id.',
  })
  @ManyToOne(() => PositionsEntity)
  @JoinColumn({name: 'position_info', referencedColumnName: 'id'})
  position_info!: number;
}
