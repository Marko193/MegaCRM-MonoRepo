import {ApiProperty} from '@nestjs/swagger';
import {Column, Entity, OneToMany} from 'typeorm';
import {BaseEntity} from './base.entity';
import {CandidateLanguagesEntity} from './candidate-languages.entity';
import {UserLanguagesEntity} from './user-languages.entity';

@Entity({name: 'languages_level'})
export class LanguagesLevelEntity extends BaseEntity {
  @ApiProperty({
    description: 'language lever knowledge name.',
  })
  @Column({type: 'varchar', length: 100})
  level_name!: string;

  @OneToMany(
    () => CandidateLanguagesEntity,
    (CandidateLanguagesEntity) => CandidateLanguagesEntity.id
  )
  candidate_languages_level!: CandidateLanguagesEntity[];

  @OneToMany(() => UserLanguagesEntity, (userLanguages) => userLanguages.id)
  user_languages_level!: UserLanguagesEntity[];
}
