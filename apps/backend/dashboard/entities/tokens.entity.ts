import {ApiProperty} from '@nestjs/swagger';
import {Column, Entity, JoinColumn, OneToOne} from 'typeorm';
import {BaseEntity} from './base.entity';
import {User} from './user.entity';
import {TypeToken} from '../enums';

@Entity({name: 'tokens'})
export class Token extends BaseEntity {
  @ApiProperty({
    example: '1',
    description: 'User id.',
  })
  @Column({type: 'integer'})
  user_id!: number;

  @ApiProperty({
    example: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9',
    description: 'Token',
  })
  @Column({type: 'text'})
  token!: string;

  @ApiProperty({
    example: 'refresh',
    description: 'One of type token',
  })
  @Column({type: 'enum', enum: TypeToken})
  type!: TypeToken;

  @ApiProperty({
    example: Date.now(),
    description: 'Date when token was used',
  })
  @Column({type: 'timestamp with time zone'})
  used_at!: Date;

  @ApiProperty({
    example: Date.now(),
    description: 'Date when token will be expiratin',
  })
  @Column({type: 'timestamp with time zone'})
  expiratin_at!: Date;

  @OneToOne(() => User)
  @JoinColumn([{name: 'user_id', referencedColumnName: 'id'}])
  user!: User;
}
