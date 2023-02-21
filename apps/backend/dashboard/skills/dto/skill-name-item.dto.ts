import {ApiProperty} from '@nestjs/swagger';
import {Column} from 'typeorm';

export class SkillNameItemDto {
  @ApiProperty({
    example: 'English',
    description: 'specific skill name value.',
  })
  @Column({type: 'string'})
  skill_name: string;
}
