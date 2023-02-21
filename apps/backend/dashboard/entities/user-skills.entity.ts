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
import {SkillsEntity} from './skills.entity';

@Entity({name: 'user_skills'})
export class UserSkillsEntity extends BaseEntity {
  @ApiProperty({example: '1', description: 'Primary key.'})
  @PrimaryGeneratedColumn()
  @Column({type: 'integer'})
  id!: number;

  @ManyToOne(() => SkillsEntity)
  @ApiProperty({example: '1', description: 'Primary key - user_skills_id.'})
  @Column({type: 'integer'})
  @JoinColumn({name: 'skill_info', referencedColumnName: 'id'})
  skill_info!: number;

  @ManyToOne(() => User, {orphanedRowAction: 'delete', onDelete: 'CASCADE'})
  @ApiProperty({
    example: '1',
    description: 'User id.',
  })
  @Column({type: 'integer'})
  @JoinColumn({name: 'user_id', referencedColumnName: 'id'})
  user_id!: number;
}
