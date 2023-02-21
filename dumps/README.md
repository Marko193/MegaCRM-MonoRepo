# IMPORT DB DUMPS MANUAL

This manual is telling in which way dumps should be import in DB (PGAdmin 4)

## Activate migrations

After each merge of backend functionality run
`yarn run typeorm:run-migrations` to execute new migrations.<br />

If there is no errors in console and log looks like smth like this: `Migration "123MigrationName" was executed successfully` - just be happy, everything has gone well!

If there is an error of any incompatibility new db schemas with old one, a new DB with updated tables and data structure should be created.<br />

For this, just delete you current Docker-container with old DB
and restart the new one with `docker compose up`.
After this repeated the command `yarn run typeorm:run-migrations`.<br/>

**During this way implementation all data from DB will be dropped forever! Create dump if it needs!**

## Tables dumps importing

After successful running migrations, check, if empty tables with actual structure were recreated in DB.<br/>

If everything is fine, import actual DB dumps from this folder in the tables, **STRICTLY IN THE CURRENT ORDER**.<br/>

The `SQL_tables_names` and `dumps_names.csv` names are equal.

- `user_roles.csv`
- `permission.csv`
- `role_permission.csv`
- `user.csv`
- `family_members.csv`
- `family.csv`
- `skills.csv`
- `user_skills.csv`
- `languages.csv`
- `languages_level.csv`
- `user_languages.csv`
- `positions.csv`
- `user_position.csv`

> This manual will be updated during the future development.
