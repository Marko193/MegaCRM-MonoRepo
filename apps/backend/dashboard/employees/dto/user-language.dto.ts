import {ApiProperty} from '@nestjs/swagger';
import {Column} from 'typeorm';

export class UserLanguageDto {
  @ApiProperty({
    example: '1',
    description: 'User id.',
  })
  @Column({type: 'integer'})
  user_id: number;

  @ApiProperty({
    example: '1',
    description: 'language level id.',
  })
  language_level_info: number;

  @ApiProperty({
    example: '1',
    description: 'language name id.',
  })
  language_name_id: number;
}
