import {ApiProperty} from '@nestjs/swagger';
import {Column, Entity, OneToMany} from 'typeorm';
import {BaseEntity} from './base.entity';
import {CandidatePositionEntity} from './candidate-position.entity';
import {UserPositionEntity} from './user.position.entity';

@Entity({name: 'positions'})
export class PositionsEntity extends BaseEntity {
  @ApiProperty({example: '1', description: 'Position name'})
  @Column({type: 'varchar', length: 50})
  position_name!: string;

  @OneToMany(
    () => CandidatePositionEntity,
    (CandidatePositionEntity) => CandidatePositionEntity.id
  )
  candidate_positions!: CandidatePositionEntity[];

  @OneToMany(
    () => UserPositionEntity,
    (UserPositionEntity) => UserPositionEntity.id
  )
  user_positions!: UserPositionEntity;
}
