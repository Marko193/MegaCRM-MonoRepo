import {ApiProperty} from '@nestjs/swagger';
import {Column} from 'typeorm';

export class PositionItemDto {
  @ApiProperty({
    example: 'qa',
    description: 'position_name value.',
  })
  @Column({type: 'string'})
  position_name: string;
}
