import {ApiProperty} from '@nestjs/swagger';
import {FamilyMemberType, Gender} from '../../enums';
import {Column} from 'typeorm';

export class FamilyMemberDto {
  @ApiProperty({
    example: '1',
    description: 'User id.',
  })
  @Column({type: 'integer'})
  user_id: number;

  @ApiProperty({
    description: 'family member type - wife/husband/child',
    example: 'wife',
  })
  family_member_type: FamilyMemberType;

  @ApiProperty({type: String, description: 'Employee name'})
  name: string;

  @ApiProperty({description: 'Person gender - male/surname'})
  sex: Gender;

  @ApiProperty({example: Date.now(), description: 'Employee date of birth'})
  date_of_birth: Date;
}
