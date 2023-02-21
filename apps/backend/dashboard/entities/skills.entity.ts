import {ApiProperty} from '@nestjs/swagger';
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {BaseEntity} from './base.entity';
import {UserSkillsEntity} from './user-skills.entity';
import {CandidateSkillsEntity} from './candidate-skills.entity';

@Entity({name: 'skills'})
export class SkillsEntity extends BaseEntity {
  @ApiProperty({example: '1', description: 'Primary key.'})
  @PrimaryGeneratedColumn()
  @Column({type: 'integer'})
  id!: number;

  @ApiProperty({description: 'skill name.'})
  @Column({type: 'varchar', length: 50})
  skill_name!: string;

  @OneToMany(() => UserSkillsEntity, (userSkills) => userSkills.skill_info)
  user_skills!: UserSkillsEntity[];

  @OneToMany(
    () => CandidateSkillsEntity,
    (candidateSkills) => candidateSkills.id
  )
  candidate_skills!: UserSkillsEntity[];
}
