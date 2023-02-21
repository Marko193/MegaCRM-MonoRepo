export interface CompanyDto {
  company_name: string;
}

import {ApiProperty} from '@nestjs/swagger';

export class CompanyDto {
  @ApiProperty({type: String, description: 'User password'})
  password: string;

  @ApiProperty({type: String, description: 'User Email'})
  company_name: string;
}
