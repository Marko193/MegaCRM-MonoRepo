import {ApiProperty} from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {BaseEntity} from './base.entity';
import {User} from './user.entity';
import {MeetingsRequestTypes} from '../enums';
import {UserMeetingsRequestsItemsEntity} from './user-meetings-requests.entity';

@Entity({name: 'meetings_requests'})
export class MeetingRequestEntity extends BaseEntity {
  @ApiProperty({example: '1', description: 'Primary key.'})
  @PrimaryGeneratedColumn()
  @Column({type: 'integer'})
  id!: number;

  @ManyToOne(() => User, {orphanedRowAction: 'delete', onDelete: 'CASCADE'})
  @ApiProperty({
    example: '1',
    description: 'Organizer id (HR usually).',
  })
  @Column({type: 'integer'})
  @JoinColumn({name: 'organizer_id', referencedColumnName: 'id'})
  organizer_id!: number;

  @ApiProperty({description: 'Organizer name'})
  @Column({type: 'varchar', length: 45})
  organizer_name!: string;

  @ApiProperty({description: 'Organizer surname'})
  @Column({type: 'varchar', length: 45})
  organizer_surname!: string;

  @ApiProperty({description: 'Organizer position'})
  @Column({type: 'varchar', length: 45})
  organizer_position!: string;

  @ApiProperty({
    example: 'adaptation',
    description:
      'Type of calendar meeting request (welcome / adaptation / probation /performance / onetoone / exit)',
  })
  @Column({type: 'enum', enum: MeetingsRequestTypes})
  type!: MeetingsRequestTypes;

  @ApiProperty({description: 'calendar meeting request start date'})
  @Column({type: 'timestamp with time zone'})
  start_date!: Date;

  @ApiProperty({description: 'calendar meeting request end date'})
  @Column({type: 'timestamp with time zone'})
  end_date!: Date;

  @ApiProperty({description: 'The brief comment for request'})
  @Column({type: 'text', nullable: true})
  comment!: string;

  @OneToMany(
    () => UserMeetingsRequestsItemsEntity,
    (meetingItem) => meetingItem.meeting_id,
    {
      cascade: ['insert', 'update'],
      eager: true,
    }
  )
  meetings_requests_items!: UserMeetingsRequestsItemsEntity[];
}
