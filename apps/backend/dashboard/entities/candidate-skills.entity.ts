import {ApiProperty} from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {BaseEntity} from './base.entity';
import {SkillsEntity} from './skills.entity';
import {CandidatesEntity} from './candidates.entity';

@Entity({name: 'candidate_skills'})
export class CandidateSkillsEntity extends BaseEntity {
  @ApiProperty({example: '1', description: 'Primary key.'})
  @PrimaryGeneratedColumn()
  @Column({type: 'integer'})
  id!: number;

  @ManyToOne(() => SkillsEntity)
  @ApiProperty({example: '1', description: 'Primary key - user_skills_id.'})
  @Column({type: 'integer'})
  @JoinColumn({name: 'skill_info', referencedColumnName: 'id'})
  skill_info!: number;

  @ApiProperty({
    description: 'Candidate id.',
  })
  @ManyToOne(() => CandidatesEntity, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
  })
  @JoinColumn({name: 'candidate_id', referencedColumnName: 'id'})
  candidate_id!: number;
}
