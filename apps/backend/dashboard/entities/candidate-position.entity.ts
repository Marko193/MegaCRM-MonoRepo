import {ApiProperty} from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {BaseEntity} from './base.entity';
import {CandidatesEntity} from './candidates.entity';
import {PositionsEntity} from './positions.entity';

@Entity({name: 'candidate_position'})
export class CandidatePositionEntity extends BaseEntity {
  @ApiProperty({example: '1', description: 'Primary key.'})
  @PrimaryGeneratedColumn()
  @Column({type: 'integer'})
  id!: number;

  @ApiProperty({
    example: '1',
    description: 'Candidate id.',
  })
  @OneToOne(() => CandidatesEntity, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
  })
  @Column({type: 'integer'})
  @JoinColumn({name: 'candidate_id', referencedColumnName: 'id'})
  candidate_id!: number;

  @ApiProperty({
    description: 'Position id.',
  })
  @ManyToOne(() => PositionsEntity)
  @JoinColumn({name: 'position_info', referencedColumnName: 'id'})
  position_info!: number;
}
