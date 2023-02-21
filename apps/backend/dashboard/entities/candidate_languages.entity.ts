import {ApiProperty} from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {BaseEntity} from './base.entity';
import {CandidatesEntity} from './candidates.entity';
import {LanguagesLevelEntity} from './languages-level.entity';
import {LanguagesEntity} from './languages.entity';

@Entity({name: 'candidate_languages'})
export class CandidateLanguagesEntity extends BaseEntity {
  @ApiProperty({example: '1', description: 'Primary key.'})
  @PrimaryGeneratedColumn()
  @Column({type: 'integer'})
  id!: number;

  @ManyToOne(() => CandidatesEntity, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
  })
  @ApiProperty({
    description: 'Candidate id.',
  })
  @Column({type: 'integer'})
  @JoinColumn({name: 'candidate_id', referencedColumnName: 'id'})
  candidate_id!: number;

  @ApiProperty({
    example: '1',
    description: 'language_level_info',
  })
  @ManyToOne(() => LanguagesLevelEntity)
  @Column({type: 'integer'})
  @JoinColumn({name: 'language_level_info', referencedColumnName: 'id'})
  language_level_info!: number;

  @ApiProperty({
    example: '1',
    description: 'language name id.',
  })
  @ManyToOne(() => LanguagesEntity)
  @Column({type: 'integer'})
  @JoinColumn({name: 'language_name_id', referencedColumnName: 'id'})
  language_name_id!: number;
}
