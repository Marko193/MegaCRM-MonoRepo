import {
  UpdateDateColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {ApiProperty} from '@nestjs/swagger';

export abstract class BaseEntity {
  @ApiProperty({example: '1', description: 'Primary key.'})
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @ApiProperty({example: Date.now(), description: 'Date of creation.'})
  @CreateDateColumn({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at!: Date;

  @ApiProperty({example: Date.now(), description: 'Date of update.'})
  @UpdateDateColumn({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updated_at!: Date;
}
