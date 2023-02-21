import {PostgresQueryRunner} from 'typeorm/driver/postgres/PostgresQueryRunner';

interface schemaInterface {
  name: string;
}

const sortingSchemas = async (
  queryRunner: PostgresQueryRunner,
  schema: string | undefined
): Promise<Array<string | undefined>> => {
  if (schema === 'migration_template') {
    const companysSchemas = await queryRunner.query(
      'SELECT schema_name AS name FROM information_schema.schemata;'
    );
    return companysSchemas
      .map((el: schemaInterface) => el.name)
      .filter((word: string) => word.startsWith('company_') || word === schema);
  }
  return [schema];
};

export default sortingSchemas;
