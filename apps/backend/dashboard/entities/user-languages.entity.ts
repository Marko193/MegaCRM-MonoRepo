import {ApiProperty} from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {BaseEntity} from './base.entity';
import {User} from './user.entity';
import {LanguagesLevelEntity} from './languages-level.entity';
import {LanguagesEntity} from './languages.entity';

@Entity({name: 'user_languages'})
export class UserLanguagesEntity extends BaseEntity {
  @ApiProperty({example: '1', description: 'Primary key.'})
  @PrimaryGeneratedColumn()
  @Column({type: 'integer'})
  id!: number;

  @ManyToOne(() => User, {orphanedRowAction: 'delete', onDelete: 'CASCADE'})
  @ApiProperty({
    example: '1',
    description: 'User id.',
  })
  @Column({type: 'integer'})
  @JoinColumn({name: 'user_id', referencedColumnName: 'id'})
  user_id!: number;

  @ApiProperty({
    example: '1',
    description: 'language_level_info',
  })
  @ManyToOne(() => LanguagesLevelEntity)
  @JoinColumn({name: 'language_level_info', referencedColumnName: 'id'})
  language_level_info!: number;

  @ManyToOne(() => LanguagesEntity)
  @ApiProperty({
    example: '1',
    description: 'language name id.',
  })
  @Column({type: 'integer'})
  @JoinColumn({name: 'language_name_id', referencedColumnName: 'id'})
  language_name_id!: number;
}
