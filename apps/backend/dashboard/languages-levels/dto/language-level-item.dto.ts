import {ApiProperty} from '@nestjs/swagger';
import {Column} from 'typeorm';

export class LanguageLevelItemDto {
  @ApiProperty({
    example: 'English',
    description: 'language name value.',
  })
  @Column({type: 'string'})
  level_name: string;
}
