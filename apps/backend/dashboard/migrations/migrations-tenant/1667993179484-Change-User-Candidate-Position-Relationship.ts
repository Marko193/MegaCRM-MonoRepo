import {MigrationInterface, QueryRunner} from 'typeorm';

export class ChangeUserCandidatePositionRelationship1667993179484
  implements MigrationInterface
{
  name = 'ChangeUserCandidatePositionRelationship1667993179484';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "migration_template"."user_warehouse_items" DROP CONSTRAINT "FK_4dee7b9e989464da302425b1627"`
    );
    await queryRunner.query(
      `ALTER TABLE "migration_template"."user_position" DROP CONSTRAINT "FK_5cd1a632d146a983f71c3ac4b4f"`
    );
    await queryRunner.query(
      `ALTER TABLE "migration_template"."user_position" ADD CONSTRAINT "UQ_5cd1a632d146a983f71c3ac4b4f" UNIQUE ("user_id")`
    );
    await queryRunner.query(
      `ALTER TABLE "migration_template"."candidate_position" DROP CONSTRAINT "FK_5585a5d3f824ef77c9d6c6600cb"`
    );
    await queryRunner.query(
      `ALTER TABLE "migration_template"."candidate_position" ADD CONSTRAINT "UQ_5585a5d3f824ef77c9d6c6600cb" UNIQUE ("candidate_id")`
    );
    await queryRunner.query(
      `ALTER TABLE "migration_template"."calendar_requests" ALTER COLUMN "comment" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "migration_template"."user_position" ADD CONSTRAINT "FK_5cd1a632d146a983f71c3ac4b4f" FOREIGN KEY ("user_id") REFERENCES "migration_template"."user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "migration_template"."candidate_position" ADD CONSTRAINT "FK_5585a5d3f824ef77c9d6c6600cb" FOREIGN KEY ("candidate_id") REFERENCES "migration_template"."candidates"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "migration_template"."user_warehouse_items" ADD CONSTRAINT "FK_4dee7b9e989464da302425b1627" FOREIGN KEY ("warehouse_item_id") REFERENCES "migration_template"."warehouse"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "migration_template"."user_warehouse_items" DROP CONSTRAINT "FK_4dee7b9e989464da302425b1627"`
    );
    await queryRunner.query(
      `ALTER TABLE "migration_template"."candidate_position" DROP CONSTRAINT "FK_5585a5d3f824ef77c9d6c6600cb"`
    );
    await queryRunner.query(
      `ALTER TABLE "migration_template"."user_position" DROP CONSTRAINT "FK_5cd1a632d146a983f71c3ac4b4f"`
    );
    await queryRunner.query(
      `ALTER TABLE "migration_template"."calendar_requests" ALTER COLUMN "comment" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "migration_template"."candidate_position" DROP CONSTRAINT "UQ_5585a5d3f824ef77c9d6c6600cb"`
    );
    await queryRunner.query(
      `ALTER TABLE "migration_template"."candidate_position" ADD CONSTRAINT "FK_5585a5d3f824ef77c9d6c6600cb" FOREIGN KEY ("candidate_id") REFERENCES "migration_template"."candidates"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "migration_template"."user_position" DROP CONSTRAINT "UQ_5cd1a632d146a983f71c3ac4b4f"`
    );
    await queryRunner.query(
      `ALTER TABLE "migration_template"."user_position" ADD CONSTRAINT "FK_5cd1a632d146a983f71c3ac4b4f" FOREIGN KEY ("user_id") REFERENCES "migration_template"."user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "migration_template"."user_warehouse_items" ADD CONSTRAINT "FK_4dee7b9e989464da302425b1627" FOREIGN KEY ("warehouse_item_id") REFERENCES "migration_template"."warehouse"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
