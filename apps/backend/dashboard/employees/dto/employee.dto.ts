import {ApiProperty} from '@nestjs/swagger';
import {FormatOfWork, Gender} from '../../enums';
import {UserPositionEntity} from '../../entities/user.position.entity';
import {UserLanguagesEntity} from '../../entities/user-languages.entity';
import {UserSkillsEntity} from '../../entities/user-skills.entity';
import {FamilyMembers} from '../../entities/family-members.entity';

export class EmployeeDto {
  @ApiProperty({type: String, description: 'Main phone'})
  main_phone: string;

  @ApiProperty({type: String, description: 'additional phone'})
  additional_phone: string;

  @ApiProperty({
    example: 'test_email@megadevllc.com',
    description: 'Flag, which marks, does user have avatar or not',
  })
  @ApiProperty({type: String, description: 'Corporate email'})
  corporate_email: string;

  @ApiProperty({type: String, description: 'Personal email'})
  personal_email: string;

  @ApiProperty({
    description: 'Flag, which marks, does user have avatar or not',
  })
  avatar: string;

  @ApiProperty({type: String, description: 'Employee name'})
  name: string;

  @ApiProperty({type: String, description: 'Employee surname'})
  surname: string;

  @ApiProperty({description: 'INN - store encoded like a password'})
  inn: string;

  @ApiProperty({description: 'Country name'})
  country: string;

  @ApiProperty({description: 'Flag, which marks, is account active or not'})
  is_account_active: boolean;

  @ApiProperty({description: 'The amount of employee salary'})
  salary: number;

  @ApiProperty({description: 'City name'})
  city: string;

  @ApiProperty({description: 'Person age - male/surname'})
  age: number;

  @ApiProperty({description: 'Person gender - male/surname'})
  sex: Gender;

  @ApiProperty({description: 'Encoded string of password'})
  password: string;

  @ApiProperty({description: 'Employee date of birth'})
  date_of_birth: Date;

  @ApiProperty({description: 'Employee company name'})
  company_name: string;

  @ApiProperty({
    description: 'Marks, if employee is on probational period or not',
  })
  is_probation_period: boolean;

  @ApiProperty({
    example: Date.now(),
    description: 'Date, when employee start working.',
  })
  employee_start_date: Date;

  @ApiProperty({
    example: 'office',
    description: 'Type of employee form of work (office or remote).',
  })
  format_of_work: FormatOfWork;

  @ApiProperty({
    example: '0',
    description: 'Role id number.',
  })
  role_id: number;

  @ApiProperty({
    example: Date.now(),
    description: 'Date of the last login event.',
  })
  last_login: Date;

  @ApiProperty({type: Array, description: 'array with user family members'})
  family_members: FamilyMembers[];

  @ApiProperty({type: Object, description: 'object with user positions'})
  user_position: UserPositionEntity;

  @ApiProperty({type: Array, description: 'array with user languages'})
  user_languages: UserLanguagesEntity[];

  @ApiProperty({type: Array, description: 'array with user skills'})
  user_skills: UserSkillsEntity[];
}
