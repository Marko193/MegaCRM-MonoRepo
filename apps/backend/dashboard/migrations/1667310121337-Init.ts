import {MigrationInterface, QueryRunner} from 'typeorm';

export class Init1667310121337 implements MigrationInterface {
  name = 'Init1667310121337';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "company" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "company_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" boolean NOT NULL, "company_name" character varying NOT NULL, CONSTRAINT "UQ_831e30688ec18c3fe41894e6b0a" UNIQUE ("company_name"), CONSTRAINT "PK_f63c380bc65299a2edd4b7f9bcc" PRIMARY KEY ("id", "company_id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "company"`);
  }
}
