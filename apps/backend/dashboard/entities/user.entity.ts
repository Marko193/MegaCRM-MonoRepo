import {
  Entity,
  Column,
  JoinColumn,
  OneToMany,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import {BaseEntity} from './base.entity';
import {ApiProperty} from '@nestjs/swagger';
import {UserRoles} from './user-roles.entity';
import {Family} from './family.entity';
import {UserLanguagesEntity} from './user-languages.entity';
import {UserSkillsEntity} from './user-skills.entity';
import {UserPositionEntity} from './user.position.entity';
import {FamilyMembers} from './family-members.entity';
import {
  Gender,
  MerchantSize,
  UserLevel,
  FormatOfWork,
  UserStatus,
} from '../enums';
import {CalendarRequestEntity} from './calendar-request.entity';
import {UserWarehouseItemsEntity} from './user-warehouse-items.entity';
import {WarehouseRequestEntity} from './warehouse-request.entity';
import {MeetingRequestEntity} from './meeting-request.entity';

@Entity({name: 'user'})
export class User extends BaseEntity {
  @ApiProperty({
    example: '+38099098765',
    description: 'Main user phone',
  })
  @Column({type: 'varchar', unique: true, nullable: false})
  main_phone!: string;

  @ApiProperty({
    example: '+38099098765',
    description: 'Additional user phone',
  })
  @Column({type: 'varchar', unique: true, nullable: true})
  additional_phone!: string;

  @ApiProperty({
    example: 'test_email@megadevllc.com',
    description: 'Corporate email',
  })
  @Column({type: 'varchar', unique: true, nullable: false})
  corporate_email!: string;

  @ApiProperty({
    example: 'personal_email@gmail.com',
    description: 'personal email',
  })
  @Column({type: 'varchar', unique: true, nullable: false})
  personal_email!: string;

  @ApiProperty({
    description: 'String, which contains an image name  ',
  })
  @Column({type: 'varchar', length: 500, nullable: true})
  avatar!: string;

  @Column({type: 'varchar', length: 100})
  name!: string;

  @Column({type: 'varchar', length: 100})
  surname!: string;

  @ApiProperty({description: 'INN - store encoded like a password'})
  @Column({type: 'varchar', unique: true, nullable: false})
  inn!: string;

  @ApiProperty({description: 'Country name'})
  @Column({type: 'varchar', length: 100, nullable: true})
  country!: string;

  @ApiProperty({description: 'Flag, which marks, is account active or not'})
  @Column({type: 'boolean'})
  is_account_active!: boolean;

  @ApiProperty({description: 'The amount of employee salary'})
  @Column({type: 'decimal', precision: 10, scale: 2, default: 0})
  salary!: number;

  @ApiProperty({description: 'City name'})
  @Column({type: 'varchar', length: 100, nullable: true})
  city!: string;

  @ApiProperty({description: 'Person age'})
  @Column({type: 'integer'})
  age!: number;

  @ApiProperty({description: 'Person gender - male/surname'})
  @Column({type: 'enum', enum: Gender})
  sex!: Gender;

  @ApiProperty({description: 'Encoded string of password'})
  @Column({type: 'varchar', length: 255})
  password!: string;

  @ApiProperty({description: 'Employee date of birth'})
  @Column({type: 'date'})
  date_of_birth!: Date;

  @ApiProperty({description: 'Employee company name'})
  @Column({type: 'varchar', length: 255})
  company_name!: string;

  @ApiProperty({
    description: 'Marks, if employee is on probational period or not',
  })
  @Column({type: 'boolean'})
  is_probation_period!: boolean;

  @ApiProperty({
    example: Date.now(),
    description: 'Date, when employee start working.',
  })
  @Column({type: 'timestamp with time zone'})
  employee_start_date!: Date;

  @ApiProperty({
    example: 'office',
    description: 'Type of employee form of work (office or remote).',
  })
  @Column({type: 'enum', enum: FormatOfWork})
  format_of_work!: FormatOfWork;

  @ApiProperty({
    example: '0',
    description: 'Role id number.',
  })
  @Column({type: 'integer'})
  role_id!: number;

  @ApiProperty({example: Date.now(), description: 'Last user login'})
  @Column({type: 'timestamp with time zone', nullable: true})
  last_login!: Date;

  @ApiProperty({
    example: Date.now(),
    description: 'Last working day in company',
  })
  @Column({type: 'timestamp with time zone', nullable: true})
  employee_end_date!: Date;

  @ApiProperty({
    example: 'XXL',
    description: 'merch size',
  })
  @Column({type: 'enum', enum: MerchantSize, nullable: true})
  merchant_size!: MerchantSize;

  @ApiProperty({
    example: 'trainee',
    description:
      'employee knowledge level - intern/junior/middle/senior/team_lead,architecture',
  })
  @Column({type: 'enum', enum: UserLevel, nullable: true})
  user_level!: UserLevel;

  @ApiProperty({
    example: 'status',
    description: 'employee status',
  })
  @Column({type: 'enum', enum: UserStatus, nullable: true})
  user_status!: UserStatus;

  @ApiProperty({
    example: Date.now(),
    description: 'Probation start date',
  })
  @Column({type: 'timestamp with time zone', nullable: true})
  probation_start_date!: Date;

  @ApiProperty({
    example: Date.now(),
    description: 'Probation end date',
  })
  @Column({type: 'timestamp with time zone', nullable: true})
  probation_end_date!: Date;

  @ApiProperty({
    example: 'skype_value',
    description: 'skype_value',
  })
  @Column({type: 'varchar', unique: true, nullable: true})
  skype!: string;

  @ApiProperty({
    example: 'telegram',
    description: 'telegram',
  })
  @Column({type: 'varchar', unique: true, nullable: true})
  telegram!: string;

  @ApiProperty({
    example: 'linkedin',
    description: 'linkedin',
  })
  @Column({type: 'varchar', unique: true, nullable: true})
  linkedin!: string;

  @ApiProperty({
    example: 'instagram',
    description: 'instagram',
  })
  @Column({type: 'varchar', unique: true, nullable: true})
  instagram!: string;

  @ApiProperty({
    example: 'facebook',
    description: 'facebook',
  })
  @Column({type: 'varchar', unique: true, nullable: true})
  facebook!: string;

  @ApiProperty({
    example: 'contact_value',
    description: 'Emergency contact',
  })
  @Column({type: 'varchar', unique: true, nullable: true})
  emergency_contact!: string;

  @ApiProperty({
    example: '+38099098765',
    description: 'Emergency phone',
  })
  @Column({type: 'varchar', unique: true, nullable: true})
  emergency_phone!: string;

  @ManyToOne(() => UserRoles)
  @JoinColumn({name: 'role_id', referencedColumnName: 'id'})
  role_info!: UserRoles;

  @ApiProperty({
    example: '0',
    description: 'Assigned HR number id.',
  })
  @Column({type: 'integer', nullable: true})
  assigned_hr_id!: number;

  @ApiProperty({
    example: '0',
    description: 'Assigned HR number id.',
  })
  @Column({type: 'integer', nullable: true})
  assigned_pm_id!: number;

  @ApiProperty({
    example: '0',
    description: 'Assigned HR number id.',
  })
  @Column({type: 'integer', nullable: true})
  assigned_sales_id!: number;

  @ApiProperty({
    example: '10',
    description: 'Number of available vacation days.',
  })
  @Column({type: 'integer', nullable: true})
  vacation_days_balance!: number;

  @ApiProperty({
    example: '10',
    description: 'Number of available sickness days.',
  })
  @Column({type: 'integer', nullable: true})
  sickness_days_balance!: number;

  @ApiProperty({
    example: '10',
    description: 'Number of available day_off days.',
  })
  @Column({type: 'integer', nullable: true})
  day_off_days_balance!: number;

  @ApiProperty({
    example: '10',
    description: 'Number of available home_office days.',
  })
  @Column({type: 'integer', nullable: true})
  home_office_days_balance!: number;

  @ApiProperty({
    example: '10',
    description: 'Number of available parental days.',
  })
  @Column({type: 'integer', nullable: true})
  parental_days_balance!: number;

  @ApiProperty({
    example: '10',
    description: 'Number of available parental days.',
  })
  @Column({type: 'integer', nullable: true})
  business_days_balance!: number;

  @OneToMany(() => Family, (family) => family.user_id, {
    cascade: ['insert', 'update'],
    eager: true,
  })
  @JoinColumn()
  family!: Family[];

  @OneToMany(() => FamilyMembers, (familyMembers) => familyMembers.user_id, {
    cascade: ['insert', 'update'],
    eager: true,
  })
  family_members!: FamilyMembers[];

  @OneToMany(
    () => UserLanguagesEntity,
    (userLanguages) => userLanguages.user_id,
    {
      cascade: ['insert', 'update'],
      eager: true,
    }
  )
  user_languages!: UserLanguagesEntity[];

  @OneToMany(() => UserSkillsEntity, (userSkills) => userSkills.user_id, {
    cascade: ['insert', 'update'],
    eager: true,
  })
  user_skills!: UserSkillsEntity[];

  @OneToOne(
    () => UserPositionEntity,
    (UserPositionEntity) => UserPositionEntity.user_id,
    {
      cascade: ['insert', 'update'],
      eager: true,
    }
  )
  user_position!: UserPositionEntity;

  @OneToMany(
    () => CalendarRequestEntity,
    (CalendarRequestEntity) => CalendarRequestEntity.user_id
  )
  user_calendar_requests!: CalendarRequestEntity[];

  @OneToMany(
    () => UserWarehouseItemsEntity,
    (UserWarehouseItemsEntity) => UserWarehouseItemsEntity.user_id,
    {
      cascade: ['insert', 'update'],
      eager: true,
    }
  )
  user_warehouse_items!: UserWarehouseItemsEntity[];

  @OneToMany(
    () => WarehouseRequestEntity,
    (WarehouseRequestEntity) => WarehouseRequestEntity.user_id,
    {
      cascade: ['insert', 'update'],
      eager: true,
    }
  )
  user_warehouse_requests!: WarehouseRequestEntity[];

  @OneToMany(
    () => MeetingRequestEntity,
    (meetingRequest) => meetingRequest.organizer_id,
    {
      cascade: ['insert', 'update'],
      eager: true,
    }
  )
  meeting_requests!: MeetingRequestEntity[];
}
