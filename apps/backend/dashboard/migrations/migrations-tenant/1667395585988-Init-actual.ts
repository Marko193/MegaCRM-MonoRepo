import {MigrationInterface} from 'typeorm';
import {PostgresConnectionOptions} from 'typeorm/driver/postgres/PostgresConnectionOptions';
import {PostgresQueryRunner} from 'typeorm/driver/postgres/PostgresQueryRunner';
import sortingSchemas from '../../config/sorting-schemas';

export class InitActual1667395585988 implements MigrationInterface {
  name = 'InitActual1667395585988';

  public async up(queryRunner: PostgresQueryRunner): Promise<void> {
    const {schema} = queryRunner.connection
      .options as PostgresConnectionOptions;
    const sortedSchemas = await sortingSchemas(queryRunner, schema);

    await Promise.all(
      sortedSchemas.map(async (schema: string | undefined): Promise<void> => {
        await queryRunner.query(
          `CREATE TYPE "${schema}"."permission_title_enum" AS ENUM('create', 'update', 'delete', 'read')`
        );
        await queryRunner.query(
          `CREATE TABLE "${schema}"."permission" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "title" "${schema}"."permission_title_enum" NOT NULL, "slug" character varying(100) NOT NULL, "description" text NOT NULL, "content" character varying(255) NOT NULL, "active" boolean NOT NULL, CONSTRAINT "PK_3b8b97af9d9d8807e41e6f48362" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
          `CREATE TYPE "${schema}"."user_roles_role_enum" AS ENUM('admin', 'superadmin', 'user', 'hr')`
        );
        await queryRunner.query(
          `CREATE TABLE "${schema}"."user_roles" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "role" "${schema}"."user_roles_role_enum" NOT NULL, "description" text NOT NULL, "active" boolean NOT NULL, "content" character varying(255) NOT NULL, CONSTRAINT "PK_8acd5cf26ebd158416f477de799" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
          `CREATE TABLE "${schema}"."role_permission" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "role_id" integer NOT NULL, "permission_id" integer NOT NULL, CONSTRAINT "PK_96c8f1fd25538d3692024115b47" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
          `CREATE TYPE "${schema}"."family_status_enum" AS ENUM('married', 'divorced')`
        );
        await queryRunner.query(
          `CREATE TABLE "${schema}"."family" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "user_id" integer NOT NULL, "status" "${schema}"."family_status_enum" NOT NULL, CONSTRAINT "PK_ba386a5a59c3de8593cda4e5626" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
          `CREATE TABLE "${schema}"."user_position" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "user_id" integer NOT NULL, "position_info" integer, CONSTRAINT "PK_3939765e4030ef65f928bfa99bb" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
          `CREATE TABLE "${schema}"."positions" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "position_name" character varying(50) NOT NULL, CONSTRAINT "PK_17e4e62ccd5749b289ae3fae6f3" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
          `CREATE TABLE "${schema}"."candidate_position" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "candidate_id" integer NOT NULL, "position_info" integer, CONSTRAINT "PK_55da273db1128e6dffff269c6f0" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
          `CREATE TABLE "${schema}"."user_skills" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "skill_info" integer NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "PK_4d0a72117fbf387752dbc8506af" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
          `CREATE TABLE "${schema}"."skills" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "skill_name" character varying(50) NOT NULL, CONSTRAINT "PK_0d3212120f4ecedf90864d7e298" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
          `CREATE TABLE "${schema}"."candidate_skills" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "skill_info" integer NOT NULL, "candidate_id" integer, CONSTRAINT "PK_e1bb466425868a6a6169ee0ee8f" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
          `CREATE TYPE "${schema}"."candidates_sex_enum" AS ENUM('male', 'female')`
        );
        await queryRunner.query(
          `CREATE TYPE "${schema}"."candidates_merchant_size_enum" AS ENUM('s', 'm', 'l', 'xl', 'xxl', 'xxxl')`
        );
        await queryRunner.query(
          `CREATE TYPE "${schema}"."candidates_candidate_level_enum" AS ENUM('trainee', 'junior', 'middle', 'senior', 'teamleader', 'architecture')`
        );
        await queryRunner.query(
          `CREATE TABLE "${schema}"."candidates" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "main_phone" character varying NOT NULL, "additional_phone" character varying, "corporate_email" character varying NOT NULL, "personal_email" character varying, "avatar" character varying(500), "name" character varying(100) NOT NULL, "surname" character varying(100) NOT NULL, "adding_date" date NOT NULL, "assigned_hr_id" integer, "expected_payment_level" numeric(10,2) NOT NULL DEFAULT '0', "comment" text NOT NULL, "country" character varying(100), "city" character varying(100), "age" integer NOT NULL, "sex" "${schema}"."candidates_sex_enum" NOT NULL, "date_of_birth" date NOT NULL, "merchant_size" "${schema}"."candidates_merchant_size_enum", "candidate_level" "${schema}"."candidates_candidate_level_enum", "skype" character varying, "telegram" character varying, "linkedin" character varying, "instagram" character varying, "facebook" character varying, CONSTRAINT "UQ_b912c308121270471d9f61ceebd" UNIQUE ("main_phone"), CONSTRAINT "UQ_6dbc92ed77b8d95f9a3234af1a2" UNIQUE ("additional_phone"), CONSTRAINT "UQ_1910ed068990de89a2dd2ab9cb4" UNIQUE ("corporate_email"), CONSTRAINT "UQ_05932c452bbdfc3dc5bb0bfad21" UNIQUE ("personal_email"), CONSTRAINT "UQ_baec841c965d3b91ea9cf3c2d10" UNIQUE ("skype"), CONSTRAINT "UQ_de18e436a2ecf7922aa0702e98e" UNIQUE ("telegram"), CONSTRAINT "UQ_0f1bfb860b7d751b505f0a06d6a" UNIQUE ("linkedin"), CONSTRAINT "UQ_2c646bdd6224420346a0e5aabfe" UNIQUE ("instagram"), CONSTRAINT "UQ_eb1653d9a6b1aa546b170a00bf3" UNIQUE ("facebook"), CONSTRAINT "PK_140681296bf033ab1eb95288abb" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
          `CREATE TABLE "${schema}"."languages" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying(100) NOT NULL, CONSTRAINT "PK_b517f827ca496b29f4d549c631d" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
          `CREATE TABLE "${schema}"."candidate_languages" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "candidate_id" integer NOT NULL, "language_level_info" integer NOT NULL, "language_name_id" integer NOT NULL, CONSTRAINT "PK_34dd59c43dc6bea95a7b172a849" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
          `CREATE TABLE "${schema}"."languages_level" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "level_name" character varying(100) NOT NULL, CONSTRAINT "PK_48a544eaebb963cc34369749c95" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
          `CREATE TABLE "${schema}"."user_languages" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "user_id" integer NOT NULL, "language_name_id" integer NOT NULL, "language_level_info" integer, CONSTRAINT "PK_a98f4f961abaede9204f3b1dc7b" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
          `CREATE TYPE "${schema}"."family_members_family_member_type_enum" AS ENUM('child', 'wife', 'husband')`
        );
        await queryRunner.query(
          `CREATE TYPE "${schema}"."family_members_sex_enum" AS ENUM('male', 'female')`
        );
        await queryRunner.query(
          `CREATE TABLE "${schema}"."family_members" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "user_id" integer NOT NULL, "family_member_type" "${schema}"."family_members_family_member_type_enum" NOT NULL, "name" character varying(45) NOT NULL, "sex" "${schema}"."family_members_sex_enum" NOT NULL, "date_of_birth" date NOT NULL, CONSTRAINT "PK_186da7c7fcbf23775fdd888a747" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
          `CREATE TYPE "${schema}"."calendar_requests_type_enum" AS ENUM('vacation', 'sickness', 'dayoff', 'homeoffice', 'parental', 'business')`
        );
        await queryRunner.query(
          `CREATE TYPE "${schema}"."calendar_requests_status_enum" AS ENUM('processing', 'approved', 'denied')`
        );
        await queryRunner.query(
          `CREATE TABLE "${schema}"."calendar_requests" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "comment" text, "user_id" integer NOT NULL, "user_name" character varying(45) NOT NULL, "user_surname" character varying(45) NOT NULL, "user_position" character varying(45) NOT NULL, "type" "${schema}"."calendar_requests_type_enum" NOT NULL, "start_date" TIMESTAMP WITH TIME ZONE NOT NULL, "end_date" TIMESTAMP WITH TIME ZONE NOT NULL, "status" "${schema}"."calendar_requests_status_enum" NOT NULL, "reviewer_id" integer NOT NULL, "reviewer_name" character varying(45) NOT NULL, "reviewer_surname" character varying(45) NOT NULL, "reviewer_position" character varying(45) NOT NULL, CONSTRAINT "PK_ffd68058306f53f33eefd19f2d4" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
          `CREATE TYPE "${schema}"."user_sex_enum" AS ENUM('male', 'female')`
        );
        await queryRunner.query(
          `CREATE TYPE "${schema}"."user_format_of_work_enum" AS ENUM('office', 'remote')`
        );
        await queryRunner.query(
          `CREATE TYPE "${schema}"."user_merchant_size_enum" AS ENUM('s', 'm', 'l', 'xl', 'xxl', 'xxxl')`
        );
        await queryRunner.query(
          `CREATE TYPE "${schema}"."user_user_level_enum" AS ENUM('trainee', 'junior', 'middle', 'senior', 'teamleader', 'architecture')`
        );
        await queryRunner.query(
          `CREATE TYPE "${schema}"."user_user_status_enum" AS ENUM('parttime', 'combination', 'fulltime')`
        );
        await queryRunner.query(
          `CREATE TABLE "${schema}"."user" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "main_phone" character varying NOT NULL, "additional_phone" character varying, "corporate_email" character varying NOT NULL, "personal_email" character varying NOT NULL, "avatar" character varying(500), "name" character varying(100) NOT NULL, "surname" character varying(100) NOT NULL, "inn" character varying NOT NULL, "country" character varying(100), "is_account_active" boolean NOT NULL, "salary" numeric(10,2) NOT NULL DEFAULT '0', "city" character varying(100), "age" integer NOT NULL, "sex" "${schema}"."user_sex_enum" NOT NULL, "password" character varying(255) NOT NULL, "date_of_birth" date NOT NULL, "company_name" character varying(255) NOT NULL, "is_probation_period" boolean NOT NULL, "employee_start_date" TIMESTAMP WITH TIME ZONE NOT NULL, "format_of_work" "${schema}"."user_format_of_work_enum" NOT NULL, "role_id" integer NOT NULL, "last_login" TIMESTAMP WITH TIME ZONE, "employee_end_date" TIMESTAMP WITH TIME ZONE, "merchant_size" "${schema}"."user_merchant_size_enum", "user_level" "${schema}"."user_user_level_enum", "user_status" "${schema}"."user_user_status_enum", "probation_start_date" TIMESTAMP WITH TIME ZONE, "probation_end_date" TIMESTAMP WITH TIME ZONE, "skype" character varying, "telegram" character varying, "linkedin" character varying, "instagram" character varying, "facebook" character varying, "emergency_contact" character varying, "emergency_phone" character varying, "assigned_hr_id" integer, "assigned_pm_id" integer, "assigned_sales_id" integer, "vacation_days_balance" integer, "sickness_days_balance" integer, "day_off_days_balance" integer, "home_office_days_balance" integer, "parental_days_balance" integer, "business_days_balance" integer, CONSTRAINT "UQ_86b9dfdbc2d8bd11414c7702177" UNIQUE ("main_phone"), CONSTRAINT "UQ_a6fa0ac743223d3aa50936d583e" UNIQUE ("additional_phone"), CONSTRAINT "UQ_d681cd0d4e309d04392686f99bd" UNIQUE ("corporate_email"), CONSTRAINT "UQ_7a5d387ea5615da3ad5df2e070e" UNIQUE ("personal_email"), CONSTRAINT "UQ_f6b81d6314dc009cfb592cba07a" UNIQUE ("inn"), CONSTRAINT "UQ_bed06f6b3e708ac8320ee43f2df" UNIQUE ("skype"), CONSTRAINT "UQ_9d4ae658d6daebb3462e871ebaf" UNIQUE ("telegram"), CONSTRAINT "UQ_93eb1b666a8a45d5fa9bc7a99dc" UNIQUE ("linkedin"), CONSTRAINT "UQ_d365ffeb89be03f3dddd9707cc5" UNIQUE ("instagram"), CONSTRAINT "UQ_05a3b40417c9a0b9b268e947b66" UNIQUE ("facebook"), CONSTRAINT "UQ_7fe003434b5892ec492b639a43c" UNIQUE ("emergency_contact"), CONSTRAINT "UQ_041b6f65f11f3918dd4b4984c61" UNIQUE ("emergency_phone"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
          `CREATE TYPE "${schema}"."tokens_type_enum" AS ENUM('refresh', 'access', 'restore_password')`
        );
        await queryRunner.query(
          `CREATE TABLE "${schema}"."tokens" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "user_id" integer NOT NULL, "token" text NOT NULL, "type" "${schema}"."tokens_type_enum" NOT NULL, "used_at" TIMESTAMP WITH TIME ZONE NOT NULL, "expiratin_at" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "REL_8769073e38c365f315426554ca" UNIQUE ("user_id"), CONSTRAINT "PK_3001e89ada36263dabf1fb6210a" PRIMARY KEY ("id"))`
        );

        await queryRunner.query(
          `CREATE TYPE "${schema}"."warehouse_item_status_enum" AS ENUM('free', 'using')`
        );
        await queryRunner.query(
          `CREATE TYPE "${schema}"."warehouse_item_condition_type_enum" AS ENUM('new', 'used')`
        );
        await queryRunner.query(
          `CREATE TYPE "${schema}"."warehouse_item_type_enum" AS ENUM('laptop', 'mouse', 'keyboard', 'headphones', 'monitor', 'officechair', 'charger', 'wire')`
        );
        await queryRunner.query(
          `CREATE TYPE "${schema}"."warehouse_item_currency_value_enum" AS ENUM('usd', 'uah', 'euro', 'btc', 'usdt')`
        );
        await queryRunner.query(
          `CREATE TABLE "${schema}". "warehouse" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "item_status" "${schema}"."warehouse_item_status_enum" NOT NULL, "comment" text, "item_condition_type" "${schema}"."warehouse_item_condition_type_enum" NOT NULL, "item_name" character varying(100) NOT NULL, "item_type" "${schema}"."warehouse_item_type_enum" NOT NULL, "item_number" character varying NOT NULL, "model_number" character varying, "item_price" numeric(10,2) NOT NULL DEFAULT '0', "item_currency_value" "${schema}"."warehouse_item_currency_value_enum", "item_vendor_type" character varying NOT NULL, CONSTRAINT "UQ_7d6b7cf7923267b248f45a2e9e0" UNIQUE ("item_number"), CONSTRAINT "PK_965abf9f99ae8c5983ae74ebde8" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
          `CREATE TABLE "${schema}". "user_warehouse_items" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "user_id" integer NOT NULL, "warehouse_item_id" integer NOT NULL, CONSTRAINT "REL_4dee7b9e989464da302425b162" UNIQUE ("warehouse_item_id"), CONSTRAINT "PK_b4f8a17cd9f86ef25b8607d0a3f" PRIMARY KEY ("id"))`
        );

        await queryRunner.query(
          `ALTER TABLE "${schema}". "user_warehouse_items" ADD CONSTRAINT "FK_8d3b51a71e5dbf7218458361400" FOREIGN KEY ("user_id") REFERENCES "${schema}". "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
        );
        await queryRunner.query(
          `ALTER TABLE "${schema}". "user_warehouse_items" ADD CONSTRAINT "FK_4dee7b9e989464da302425b1627" FOREIGN KEY ("warehouse_item_id") REFERENCES "${schema}". "warehouse"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );

        await queryRunner.query(
          `CREATE TYPE "${schema}"."warehouse_requests_status_enum" AS ENUM('processing', 'approved', 'denied')`
        );
        await queryRunner.query(
          `CREATE TABLE "${schema}"."warehouse_requests" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "user_id" integer NOT NULL, "item_id" integer NOT NULL, "status" "${schema}"."warehouse_requests_status_enum" NOT NULL, "comment" text NOT NULL, "user_name" character varying(45) NOT NULL, "user_surname" character varying(45) NOT NULL, "user_position" character varying(45) NOT NULL, "reviewer_id" integer NOT NULL, "reviewer_name" character varying(45) NOT NULL, "reviewer_surname" character varying(45) NOT NULL, "reviewer_position" character varying(45) NOT NULL, CONSTRAINT "PK_ceab9bd445768a10c5e22427c4d" PRIMARY KEY ("id"))`
        );

        await queryRunner.query(
          `CREATE TYPE "${schema}"."meetings_requests_type_enum" AS ENUM('welcome', 'adaptation', 'probation', 'performance', 'onetoone', 'exit')`
        );
        await queryRunner.query(
          `CREATE TABLE "${schema}"."meetings_requests" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "organizer_id" integer NOT NULL, "organizer_name" character varying(45) NOT NULL, "organizer_surname" character varying(45) NOT NULL, "organizer_position" character varying(45) NOT NULL, "type" "${schema}"."meetings_requests_type_enum" NOT NULL, "start_date" TIMESTAMP WITH TIME ZONE NOT NULL, "end_date" TIMESTAMP WITH TIME ZONE NOT NULL, "comment" text, CONSTRAINT "PK_ace05a426d8d912790c1b7feddc" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
          `CREATE TABLE "${schema}"."user_meetings_requests_items" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "user_id" integer NOT NULL, "meeting_id" integer NOT NULL, CONSTRAINT "PK_58c760139771a7d145d14be5d4c" PRIMARY KEY ("id"))`
        );

        await queryRunner.query(
          `ALTER TABLE "${schema}". "role_permission" ADD CONSTRAINT "FK_3d0a7155eafd75ddba5a7013368" FOREIGN KEY ("role_id") REFERENCES "${schema}". "user_roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
        await queryRunner.query(
          `ALTER TABLE "${schema}". "role_permission" ADD CONSTRAINT "FK_e3a3ba47b7ca00fd23be4ebd6cf" FOREIGN KEY ("permission_id") REFERENCES "${schema}". "permission"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
        await queryRunner.query(
          `ALTER TABLE "${schema}". "family" ADD CONSTRAINT "FK_69ad03175d1b1fe4c95dfe027e7" FOREIGN KEY ("user_id") REFERENCES "${schema}". "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
        );
        await queryRunner.query(
          `ALTER TABLE "${schema}". "user_position" ADD CONSTRAINT "FK_5cd1a632d146a983f71c3ac4b4f" FOREIGN KEY ("user_id") REFERENCES "${schema}". "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
        );
        await queryRunner.query(
          `ALTER TABLE "${schema}". "user_position" ADD CONSTRAINT "FK_1a20e4731a94cdd1fa400e886aa" FOREIGN KEY ("position_info") REFERENCES "${schema}". "positions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
        await queryRunner.query(
          `ALTER TABLE "${schema}". "candidate_position" ADD CONSTRAINT "FK_5585a5d3f824ef77c9d6c6600cb" FOREIGN KEY ("candidate_id") REFERENCES "${schema}". "candidates"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
        );
        await queryRunner.query(
          `ALTER TABLE "${schema}". "candidate_position" ADD CONSTRAINT "FK_bd55940f89ed894aa8f492249af" FOREIGN KEY ("position_info") REFERENCES "${schema}". "positions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
        await queryRunner.query(
          `ALTER TABLE "${schema}". "user_skills" ADD CONSTRAINT "FK_1bbbd6ac3224af1d38ffe9b3359" FOREIGN KEY ("skill_info") REFERENCES "${schema}". "skills"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
        await queryRunner.query(
          `ALTER TABLE "${schema}". "user_skills" ADD CONSTRAINT "FK_6926002c360291df66bb2c5fdeb" FOREIGN KEY ("user_id") REFERENCES "${schema}". "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
        );
        await queryRunner.query(
          `ALTER TABLE "${schema}". "candidate_skills" ADD CONSTRAINT "FK_27b9037c38f53f60040dfffa2ed" FOREIGN KEY ("skill_info") REFERENCES "${schema}". "skills"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
        await queryRunner.query(
          `ALTER TABLE "${schema}". "candidate_skills" ADD CONSTRAINT "FK_bb3474452a29e2537ebd0ea22f8" FOREIGN KEY ("candidate_id") REFERENCES "${schema}". "candidates"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
        );
        await queryRunner.query(
          `ALTER TABLE "${schema}". "candidate_languages" ADD CONSTRAINT "FK_dbcdd48e60c72f143c42694d7a0" FOREIGN KEY ("candidate_id") REFERENCES "${schema}". "candidates"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
        );
        await queryRunner.query(
          `ALTER TABLE "${schema}". "candidate_languages" ADD CONSTRAINT "FK_7d37ee807952aab6ec26502d07f" FOREIGN KEY ("language_level_info") REFERENCES "${schema}". "languages_level"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
        await queryRunner.query(
          `ALTER TABLE "${schema}". "candidate_languages" ADD CONSTRAINT "FK_dc8020f5648ced67eca982e4154" FOREIGN KEY ("language_name_id") REFERENCES "${schema}". "languages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
        await queryRunner.query(
          `ALTER TABLE "${schema}". "user_languages" ADD CONSTRAINT "FK_1f9e6f03b56e66eee864aa6af95" FOREIGN KEY ("user_id") REFERENCES "${schema}". "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
        );
        await queryRunner.query(
          `ALTER TABLE "${schema}". "user_languages" ADD CONSTRAINT "FK_03c7e4bba937faaa458f88f1413" FOREIGN KEY ("language_level_info") REFERENCES "${schema}". "languages_level"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
        await queryRunner.query(
          `ALTER TABLE "${schema}". "user_languages" ADD CONSTRAINT "FK_5d5d8ce2a91557691fdd462c29b" FOREIGN KEY ("language_name_id") REFERENCES "${schema}". "languages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
        await queryRunner.query(
          `ALTER TABLE "${schema}". "family_members" ADD CONSTRAINT "FK_081fe336d41be74c68b81e8b6d7" FOREIGN KEY ("user_id") REFERENCES "${schema}". "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
        );
        await queryRunner.query(
          `ALTER TABLE "${schema}". "calendar_requests" ADD CONSTRAINT "FK_db64cb31d35e10ae3b8addd2cf4" FOREIGN KEY ("user_id") REFERENCES "${schema}". "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
        );
        await queryRunner.query(
          `ALTER TABLE "${schema}". "calendar_requests" ADD CONSTRAINT "FK_7fe6fbfb309af6b54bba8b2aef3" FOREIGN KEY ("reviewer_id") REFERENCES "${schema}". "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
        );
        await queryRunner.query(
          `ALTER TABLE "${schema}". "user" ADD CONSTRAINT "FK_fb2e442d14add3cefbdf33c4561" FOREIGN KEY ("role_id") REFERENCES "${schema}". "user_roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
        await queryRunner.query(
          `ALTER TABLE "${schema}". "tokens" ADD CONSTRAINT "FK_8769073e38c365f315426554ca5" FOREIGN KEY ("user_id") REFERENCES "${schema}". "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );

        await queryRunner.query(
          `ALTER TABLE "${schema}". "warehouse_requests" ADD CONSTRAINT "FK_3afe73d0bb0dd61289aa05fa8ce" FOREIGN KEY ("user_id") REFERENCES "${schema}". "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
        );
        await queryRunner.query(
          `ALTER TABLE "${schema}". "warehouse_requests" ADD CONSTRAINT "FK_0877a3a7b6c2c90056164c860f3" FOREIGN KEY ("item_id") REFERENCES "${schema}". "warehouse"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
        );
        await queryRunner.query(
          `ALTER TABLE "${schema}". "warehouse_requests" ADD CONSTRAINT "FK_9b26d0eb6ac4bd2d26090b46f0a" FOREIGN KEY ("reviewer_id") REFERENCES "${schema}". "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
        );
        await queryRunner.query(
          `ALTER TABLE "${schema}"."meetings_requests" ADD CONSTRAINT "FK_9b5f1dfb4cf93e7af70195bf320" FOREIGN KEY ("organizer_id") REFERENCES  "${schema}"."user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
        );
        await queryRunner.query(
          `ALTER TABLE "${schema}"."user_meetings_requests_items" ADD CONSTRAINT "FK_7aff0e03e660efec418f0ac6b6c" FOREIGN KEY ("user_id") REFERENCES  "${schema}"."user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
        );
        await queryRunner.query(
          `ALTER TABLE "${schema}"."user_meetings_requests_items" ADD CONSTRAINT "FK_887274aa3e6f43699402c653e30" FOREIGN KEY ("meeting_id") REFERENCES  "${schema}"."meetings_requests"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
        );
      })
    );
  }

  public async down(queryRunner: PostgresQueryRunner): Promise<void> {
    const {schema} = queryRunner.connection
      .options as PostgresConnectionOptions;
    const sortedSchemas = await sortingSchemas(queryRunner, schema);

    await Promise.all(
      sortedSchemas.map(async (schema: string | undefined): Promise<void> => {
        await queryRunner.query(
          `ALTER TABLE "${schema}". "user_warehouse_items" DROP CONSTRAINT "FK_4dee7b9e989464da302425b1627"`
        );
        await queryRunner.query(
          `ALTER TABLE "${schema}". "user_warehouse_items" DROP CONSTRAINT "FK_8d3b51a71e5dbf7218458361400"`
        );

        await queryRunner.query(
          `DROP TABLE "${schema}". "user_warehouse_items"`
        );
        await queryRunner.query(`DROP TABLE "${schema}". "warehouse"`);
        await queryRunner.query(
          `DROP TYPE "${schema}". "${schema}"."warehouse_item_currency_value_enum"`
        );
        await queryRunner.query(
          `DROP TYPE "${schema}". "${schema}"."warehouse_item_type_enum"`
        );
        await queryRunner.query(
          `DROP TYPE "${schema}". "${schema}"."warehouse_item_condition_type_enum"`
        );
        await queryRunner.query(
          `DROP TYPE "${schema}". "${schema}"."warehouse_item_status_enum"`
        );

        await queryRunner.query(
          `ALTER TABLE "${schema}". "tokens" DROP CONSTRAINT "FK_8769073e38c365f315426554ca5"`
        );
        await queryRunner.query(
          `ALTER TABLE "${schema}". "user" DROP CONSTRAINT "FK_fb2e442d14add3cefbdf33c4561"`
        );
        await queryRunner.query(
          `ALTER TABLE "${schema}". "calendar_requests" DROP CONSTRAINT "FK_7fe6fbfb309af6b54bba8b2aef3"`
        );
        await queryRunner.query(
          `ALTER TABLE "${schema}". "calendar_requests" DROP CONSTRAINT "FK_db64cb31d35e10ae3b8addd2cf4"`
        );
        await queryRunner.query(
          `ALTER TABLE "${schema}". "family_members" DROP CONSTRAINT "FK_081fe336d41be74c68b81e8b6d7"`
        );
        await queryRunner.query(
          `ALTER TABLE "${schema}". "user_languages" DROP CONSTRAINT "FK_5d5d8ce2a91557691fdd462c29b"`
        );
        await queryRunner.query(
          `ALTER TABLE "${schema}". "user_languages" DROP CONSTRAINT "FK_03c7e4bba937faaa458f88f1413"`
        );
        await queryRunner.query(
          `ALTER TABLE "${schema}". "user_languages" DROP CONSTRAINT "FK_1f9e6f03b56e66eee864aa6af95"`
        );
        await queryRunner.query(
          `ALTER TABLE "${schema}". "candidate_languages" DROP CONSTRAINT "FK_dc8020f5648ced67eca982e4154"`
        );
        await queryRunner.query(
          `ALTER TABLE "${schema}". "candidate_languages" DROP CONSTRAINT "FK_7d37ee807952aab6ec26502d07f"`
        );
        await queryRunner.query(
          `ALTER TABLE "${schema}". "candidate_languages" DROP CONSTRAINT "FK_dbcdd48e60c72f143c42694d7a0"`
        );
        await queryRunner.query(
          `ALTER TABLE "${schema}". "candidate_skills" DROP CONSTRAINT "FK_bb3474452a29e2537ebd0ea22f8"`
        );
        await queryRunner.query(
          `ALTER TABLE "${schema}". "candidate_skills" DROP CONSTRAINT "FK_27b9037c38f53f60040dfffa2ed"`
        );
        await queryRunner.query(
          `ALTER TABLE "${schema}". "user_skills" DROP CONSTRAINT "FK_6926002c360291df66bb2c5fdeb"`
        );
        await queryRunner.query(
          `ALTER TABLE "${schema}". "user_skills" DROP CONSTRAINT "FK_1bbbd6ac3224af1d38ffe9b3359"`
        );
        await queryRunner.query(
          `ALTER TABLE "${schema}". "candidate_position" DROP CONSTRAINT "FK_bd55940f89ed894aa8f492249af"`
        );
        await queryRunner.query(
          `ALTER TABLE "${schema}". "candidate_position" DROP CONSTRAINT "FK_5585a5d3f824ef77c9d6c6600cb"`
        );
        await queryRunner.query(
          `ALTER TABLE "${schema}". "user_position" DROP CONSTRAINT "FK_1a20e4731a94cdd1fa400e886aa"`
        );
        await queryRunner.query(
          `ALTER TABLE "${schema}". "user_position" DROP CONSTRAINT "FK_5cd1a632d146a983f71c3ac4b4f"`
        );
        await queryRunner.query(
          `ALTER TABLE "${schema}". "family" DROP CONSTRAINT "FK_69ad03175d1b1fe4c95dfe027e7"`
        );
        await queryRunner.query(
          `ALTER TABLE "${schema}". "role_permission" DROP CONSTRAINT "FK_e3a3ba47b7ca00fd23be4ebd6cf"`
        );
        await queryRunner.query(
          `ALTER TABLE "${schema}". "role_permission" DROP CONSTRAINT "FK_3d0a7155eafd75ddba5a7013368"`
        );
        await queryRunner.query(`DROP TABLE "${schema}"."tokens"`);
        await queryRunner.query(`DROP TYPE "${schema}"."tokens_type_enum"`);
        await queryRunner.query(`DROP TABLE "${schema}"."user"`);
        await queryRunner.query(
          `DROP TYPE "${schema}"."user_user_status_enum"`
        );
        await queryRunner.query(`DROP TYPE "${schema}"."user_user_level_enum"`);
        await queryRunner.query(
          `DROP TYPE "${schema}"."user_merchant_size_enum"`
        );
        await queryRunner.query(
          `DROP TYPE "${schema}"."user_format_of_work_enum"`
        );
        await queryRunner.query(`DROP TYPE "${schema}"."user_sex_enum"`);
        await queryRunner.query(`DROP TABLE "${schema}"."calendar_requests"`);
        await queryRunner.query(
          `DROP TYPE "${schema}"."calendar_requests_status_enum"`
        );
        await queryRunner.query(
          `DROP TYPE "${schema}"."calendar_requests_type_enum"`
        );
        await queryRunner.query(`DROP TABLE "${schema}"."family_members"`);
        await queryRunner.query(
          `DROP TYPE "${schema}"."family_members_sex_enum"`
        );
        await queryRunner.query(
          `DROP TYPE "${schema}"."family_members_family_member_type_enum"`
        );
        await queryRunner.query(`DROP TABLE "${schema}"."user_languages"`);
        await queryRunner.query(`DROP TABLE "${schema}"."languages_level"`);
        await queryRunner.query(`DROP TABLE "${schema}"."candidate_languages"`);
        await queryRunner.query(`DROP TABLE "${schema}"."languages"`);
        await queryRunner.query(`DROP TABLE "${schema}"."candidates"`);
        await queryRunner.query(
          `DROP TYPE "${schema}"."candidates_candidate_level_enum"`
        );
        await queryRunner.query(
          `DROP TYPE "${schema}"."candidates_merchant_size_enum"`
        );
        await queryRunner.query(`DROP TYPE "${schema}"."candidates_sex_enum"`);
        await queryRunner.query(`DROP TABLE "${schema}"."candidate_skills"`);
        await queryRunner.query(`DROP TABLE "${schema}"."skills"`);
        await queryRunner.query(`DROP TABLE "${schema}"."user_skills"`);
        await queryRunner.query(`DROP TABLE "${schema}"."candidate_position"`);
        await queryRunner.query(`DROP TABLE "${schema}"."positions"`);
        await queryRunner.query(`DROP TABLE "${schema}"."user_position"`);
        await queryRunner.query(`DROP TABLE "${schema}"."family"`);
        await queryRunner.query(`DROP TYPE "${schema}"."family_status_enum"`);
        await queryRunner.query(`DROP TABLE "${schema}"."role_permission"`);
        await queryRunner.query(`DROP TABLE "${schema}"."user_roles"`);
        await queryRunner.query(`DROP TYPE "${schema}"."user_roles_role_enum"`);
        await queryRunner.query(`DROP TABLE "${schema}"."permission"`);
        await queryRunner.query(
          `DROP TYPE "${schema}"."permission_title_enum"`
        );
        await queryRunner.query(
          `ALTER TABLE "${schema}". "warehouse_requests" DROP CONSTRAINT "FK_9b26d0eb6ac4bd2d26090b46f0a"`
        );
        await queryRunner.query(
          `ALTER TABLE "${schema}". "warehouse_requests" DROP CONSTRAINT "FK_0877a3a7b6c2c90056164c860f3"`
        );
        await queryRunner.query(
          `ALTER TABLE "${schema}". "warehouse_requests" DROP CONSTRAINT "FK_3afe73d0bb0dd61289aa05fa8ce"`
        );
        await queryRunner.query(
          `DROP TABLE "${schema}".  "warehouse_requests"`
        );
        await queryRunner.query(
          `DROP TYPE  "${schema}". "warehouse_requests_status_enum"`
        );

        await queryRunner.query(
          `ALTER TABLE "${schema}". "user_meetings_requests_items" DROP CONSTRAINT "FK_887274aa3e6f43699402c653e30"`
        );
        await queryRunner.query(
          `ALTER TABLE "${schema}". "user_meetings_requests_items" DROP CONSTRAINT "FK_7aff0e03e660efec418f0ac6b6c"`
        );
        await queryRunner.query(
          `ALTER TABLE "${schema}". "meetings_requests" DROP CONSTRAINT "FK_9b5f1dfb4cf93e7af70195bf320"`
        );
        await queryRunner.query(
          `DROP TABLE "${schema}". "user_meetings_requests_items"`
        );
        await queryRunner.query(`DROP TABLE "${schema}". "meetings_requests"`);
        await queryRunner.query(
          `DROP TYPE "${schema}". "meetings_requests_type_enum"`
        );
      })
    );
  }
}
