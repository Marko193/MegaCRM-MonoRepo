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
import {MeetingRequestEntity} from './meeting-request.entity';

@Entity({name: 'user_meetings_requests_items'})
export class UserMeetingsRequestsItemsEntity extends BaseEntity {
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

  @ManyToOne(() => MeetingRequestEntity, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
  })
  @ApiProperty({
    example: '1',
    description: 'meeting item id.',
  })
  @Column({type: 'integer'})
  @JoinColumn({name: 'meeting_id', referencedColumnName: 'id'})
  meeting_id!: number;
}
