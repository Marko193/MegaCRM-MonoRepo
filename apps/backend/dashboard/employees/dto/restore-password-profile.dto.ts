import {ApiProperty} from '@nestjs/swagger';

export class RestorePasswordProfileDto {
  @ApiProperty({type: 'number', description: 'user_id'})
  user_id: number;

  @ApiProperty({description: 'Encoded string of password'})
  password: string;
}
