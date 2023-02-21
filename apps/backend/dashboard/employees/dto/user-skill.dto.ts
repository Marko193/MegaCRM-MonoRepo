import {ApiProperty} from '@nestjs/swagger';
import {Column} from 'typeorm';

export class UserSkillDto {
  @ApiProperty({
    example: '1',
    description: 'User id.',
  })
  @Column({type: 'integer'})
  user_id: number;

  @ApiProperty({
    example: '1',
    description: 'skill info id.',
  })
  skill_info: number;
}
