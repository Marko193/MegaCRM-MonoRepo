import {Column, Entity, OneToMany} from 'typeorm';
import {BaseEntity} from './base.entity';
import {ApiProperty} from '@nestjs/swagger';
import {CandidateLanguagesEntity} from './candidate-languages.entity';
import {UserLanguagesEntity} from './user-languages.entity';

@Entity({name: 'languages'})
export class LanguagesEntity extends BaseEntity {
  @ApiProperty({
    description: 'language name.',
  })
  @Column({type: 'varchar', length: 100})
  name!: string;

  @OneToMany(
    () => UserLanguagesEntity,
    (UserLanguagesEntity) => UserLanguagesEntity.id
  )
  user_languages_names!: UserLanguagesEntity[];

  @OneToMany(
    () => CandidateLanguagesEntity,
    (CandidateLanguagesEntity) => CandidateLanguagesEntity.id
  )
  candidate_languages_name!: CandidateLanguagesEntity[];
}
