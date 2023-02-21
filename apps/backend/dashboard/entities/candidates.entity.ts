import {ApiProperty} from '@nestjs/swagger';
import {Column, Entity, OneToMany, OneToOne} from 'typeorm';
import {BaseEntity} from './base.entity';
import {CandidatePositionEntity} from './candidate-position.entity';
import {CandidateLanguagesEntity} from './candidate-languages.entity';
import {CandidateSkillsEntity} from './candidate-skills.entity';
import {Gender, MerchantSize, UserLevel} from '../enums';

@Entity({name: 'candidates'})
export class CandidatesEntity extends BaseEntity {
  @ApiProperty({
    example: '+38099098765',
    description: 'Main user phone',
  })
  @Column({type: 'varchar', unique: true})
  main_phone!: string;

  @ApiProperty({
    example: '+38099098765',
    description: 'Additional user phone',
  })
  @Column({type: 'varchar', unique: true, nullable: true})
  additional_phone!: string;

  @ApiProperty({
    example: 'test_email@megadevllc.com',
    description: 'Flag, which marks, does user have avatar or not',
  })
  @Column({type: 'varchar', unique: true})
  corporate_email!: string;

  @ApiProperty({
    example: 'personal_email@gmail.com',
    description: 'personal email',
  })
  @Column({type: 'varchar', unique: true, nullable: true})
  personal_email!: string;

  @ApiProperty({
    description: 'String, which contains an image name  ',
  })
  @Column({type: 'varchar', length: 500, nullable: true})
  avatar!: string;

  @Column({type: 'varchar', length: 100})
  name!: string;

  @Column({type: 'varchar', length: 100})
  surname!: string;

  @ApiProperty({description: 'Candidate adding date'})
  @Column({type: 'date'})
  adding_date!: Date;

  @ApiProperty({
    example: '0',
    description: 'Assigned HR number id.',
  })
  @Column({type: 'integer', nullable: true})
  assigned_hr_id!: number;

  @ApiProperty({description: 'The expected payment level'})
  @Column({type: 'decimal', precision: 10, scale: 2, default: 0})
  expected_payment_level!: number;

  @ApiProperty({description: 'The brief description of candidate'})
  @Column({type: 'text'})
  comment!: string;

  @ApiProperty({description: 'Country name'})
  @Column({type: 'varchar', length: 100, nullable: true})
  country!: string;

  @ApiProperty({description: 'City name'})
  @Column({type: 'varchar', length: 100, nullable: true})
  city!: string;

  @ApiProperty({description: 'Candidate age'})
  @Column({type: 'integer'})
  age!: number;

  @ApiProperty({description: 'Candidate gender - male/surname'})
  @Column({type: 'enum', enum: Gender})
  sex!: Gender;

  @ApiProperty({description: 'Candidate date of birth'})
  @Column({type: 'date'})
  date_of_birth!: Date;

  @ApiProperty({
    example: 'XXL',
    description: 'merch size',
  })
  @Column({type: 'enum', enum: MerchantSize, nullable: true})
  merchant_size!: MerchantSize;

  @ApiProperty({
    example: 'trainee',
    description:
      'employee knowledge level - intern/junior/middle/senior/team_lead,architecture',
  })
  @Column({type: 'enum', enum: UserLevel, nullable: true})
  candidate_level!: UserLevel;

  @ApiProperty({
    example: 'skype_value',
    description: 'skype_value',
  })
  @Column({type: 'varchar', unique: true, nullable: true})
  skype!: string;

  @ApiProperty({
    example: 'telegram',
    description: 'telegram',
  })
  @Column({type: 'varchar', unique: true, nullable: true})
  telegram!: string;

  @ApiProperty({
    example: 'linkedin',
    description: 'linkedin',
  })
  @Column({type: 'varchar', unique: true, nullable: true})
  linkedin!: string;

  @ApiProperty({
    example: 'instagram',
    description: 'instagram',
  })
  @Column({type: 'varchar', unique: true, nullable: true})
  instagram!: string;

  @ApiProperty({
    example: 'facebook',
    description: 'facebook',
  })
  @Column({type: 'varchar', unique: true, nullable: true})
  facebook!: string;

  @OneToOne(
    () => CandidatePositionEntity,
    (CandidatePositionEntity) => CandidatePositionEntity.candidate_id,
    {
      cascade: ['insert', 'update'],
      eager: true,
    }
  )
  candidate_position!: CandidatePositionEntity;

  @OneToMany(
    () => CandidateLanguagesEntity,
    (CandidateLanguagesEntity) => CandidateLanguagesEntity.candidate_id,
    {
      cascade: ['insert', 'update'],
      eager: true,
    }
  )
  candidate_languages!: CandidateLanguagesEntity[];

  @OneToMany(
    () => CandidateSkillsEntity,
    (CandidateSkillsEntity) => CandidateSkillsEntity.candidate_id,
    {
      cascade: ['insert', 'update'],
      eager: true,
    }
  )
  candidate_skills!: CandidateSkillsEntity[];
}
