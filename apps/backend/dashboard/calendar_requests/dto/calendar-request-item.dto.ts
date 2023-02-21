import {ApiProperty} from '@nestjs/swagger';
import {Column} from 'typeorm';
import {CalendarRequestStatuses, CalendarRequestTypes} from '../../enums';

export class CalendarRequestItemDto {
  @ApiProperty({
    example: '1',
    description: 'calendar request id.',
  })
  @Column({type: 'integer'})
  id: number;

  @ApiProperty({
    example: '1',
    description: 'User id.',
  })
  @Column({type: 'integer'})
  user_id: number;

  @ApiProperty({
    example: 'vacation',
    description:
      'Type of calendar request (vacation / sickness / dayoff /homeoffice / parental / business)',
  })
  @Column({type: 'enum', enum: CalendarRequestTypes})
  type: CalendarRequestTypes;

  @ApiProperty({description: 'calendar request start date'})
  @Column({type: 'date'})
  start_date: Date;

  @ApiProperty({description: 'calendar request end date'})
  @Column({type: 'date'})
  end_date: Date;

  @ApiProperty({
    example: 'approved',
    description: 'Status of calendar request (processing / approved / denied)',
  })
  @Column({type: 'enum', enum: CalendarRequestStatuses})
  status: CalendarRequestStatuses;

  @ApiProperty({
    example: '1',
    description: 'Reviewer id.',
  })
  @Column({type: 'integer', nullable: false})
  reviewer_id: number;

  @ApiProperty({description: 'Reviewer name'})
  @Column({type: 'varchar', length: 45})
  reviewer_name: string;

  @ApiProperty({description: 'Reviewer surname'})
  @Column({type: 'varchar', length: 45})
  reviewer_surname: string;

  @ApiProperty({description: 'Reviewer position'})
  @Column({type: 'varchar', length: 45})
  reviewer_position: string;
}
