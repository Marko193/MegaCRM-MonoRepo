import {ApiProperty} from '@nestjs/swagger';
import {Column} from 'typeorm';

export class LanguageItemDto {
  @ApiProperty({
    example: 'English',
    description: 'language name value.',
  })
  @Column({type: 'string'})
  name: string;
}
