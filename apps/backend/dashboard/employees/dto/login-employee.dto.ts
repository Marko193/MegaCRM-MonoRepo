import {ApiProperty} from '@nestjs/swagger';

export class LoginEmployeeDto {
  @ApiProperty({type: String, description: 'User password'})
  password: string;

  @ApiProperty({type: String, description: 'User Email'})
  corporate_email: string;
}
