import {MigrationInterface, QueryRunner} from 'typeorm';
import {PostgresConnectionOptions} from 'typeorm/driver/postgres/PostgresConnectionOptions';
import {PostgresQueryRunner} from 'typeorm/driver/postgres/PostgresQueryRunner';

export class migrations1667830139602 implements MigrationInterface {
  public async up(queryRunner: PostgresQueryRunner): Promise<void> {
    const {schema} = queryRunner.connection
      .options as PostgresConnectionOptions;
    await queryRunner.query(
      `INSERT INTO "${schema}"."user_roles" (role, description, active, content) VALUES ('admin', 'admin', 'true', 'admin'), ('superadmin', 'superadmin', 'true', 'superadmin'), ('user', 'user', 'true', 'user'), ('hr', 'hr', 'true', 'hr');`
    );
    await queryRunner.query(
      `INSERT INTO "${schema}"."skills" (skill_name) VALUES ('css'), ('html'), ('java'), ('javascript'), ('php'), ('react'), ('vue'), ('angular'), ('node.js'), ('jest');`
    );
    await queryRunner.query(
      `INSERT INTO "${schema}"."positions" (position_name) VALUES ('software_engineer'), ('qa'), ('dba'), ('html_coder'), ('security_specialist'), ('site_reliability_engineer'), ('sys_admin'), ('product_manager'), ('dev_ops'), ('recruiter'), ('project_manager'), ('ceo'), ('ui_ux_designer'), ('web_designer'), ('hr_manager');`
    );
    await queryRunner.query(
      `INSERT INTO "${schema}"."languages" (name) VALUES ('Russian'), ('Ukraine'), ('English');`
    );
    await queryRunner.query(
      `INSERT INTO "${schema}"."languages_level" (level_name) VALUES ('A1'), ('A2'), ('B1'), ('B2'), ('C1'), ('C2');`
    );
    await queryRunner.query(
      `INSERT INTO "${schema}"."permission" (title, slug, content, description, active) VALUES ('create', 'slug-value', 'test_content', 'test_description', true);`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const {schema} = queryRunner.connection
      .options as PostgresConnectionOptions;
    await queryRunner.query(`DELETE FROM "${schema}"."user_roles"`);
    await queryRunner.query(`DELETE FROM "${schema}"."skills"`);
    await queryRunner.query(`DELETE FROM "${schema}"."positions"`);
    await queryRunner.query(`DELETE FROM "${schema}"."languages"`);
    await queryRunner.query(`DELETE FROM "${schema}"."languages_level"`);
    await queryRunner.query(`DELETE FROM "${schema}"."permission"`);
  }
}
