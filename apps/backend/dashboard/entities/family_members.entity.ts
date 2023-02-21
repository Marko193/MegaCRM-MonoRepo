import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {BaseEntity} from './base.entity';
import {ApiProperty} from '@nestjs/swagger';
import {User} from './user.entity';
import {FamilyMemberType, Gender} from '../enums';

@Entity({name: 'family_members'})
export class FamilyMembers extends BaseEntity {
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
    example: 'son',
    description: 'Type of family member (currently available son/daughter.',
  })
  @Column({type: 'enum', enum: FamilyMemberType})
  family_member_type!: FamilyMemberType;

  @ApiProperty({description: 'Family name'})
  @Column({type: 'varchar', length: 45})
  name!: string;

  @ApiProperty({description: 'Family member gender - male/female'})
  @Column({type: 'enum', enum: Gender})
  sex!: Gender;

  @ApiProperty({description: 'Family member date of birth'})
  @Column({type: 'date'})
  date_of_birth!: Date;
}
